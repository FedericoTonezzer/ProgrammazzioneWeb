// Whole-script strict mode syntax
"use strict";

/**
 * Classe WebApiManager : classe generica per il consumo di servizi esposti tramite REST API.
 * Consente di definire un endpoint sulle quale vengono effettuate le CRUD operations:
 * GET - Richiede tutti gli elementi o il dettaglio di un elemento via ID
 * POST - Crea un nuovo elemento
 * PUT - Aggiorna un elemento esistente via ID
 * DELETE - Cancella un elemento esistente via ID
 * Contiene anche un metodo getView per la restituzione di una View (elementi in sola lettura frutto di query di aggregazione) come JsonArray
 */
class WebApiManager {
	// Variabili private
	#controller; // Nome del controller
	#service_url; // Path completo al servizio
	#type; // Tipo oggetto per operazioni CRUD
	#isauth; // Abilita autenticazione sul controller, default false;

	#unAuthorizedEvt;

	constructor(controller, type) {
		this.controller = controller;
		this.type = type;

		this.#unAuthorizedEvt = new CustomEvent("unauthorized");
	}

	set service_url(nuovoService_url) {
		if (this.isValidURL(nuovoService_url)) {
			if (this.isNullOrEmpty(this.service_url)) {
				this.#service_url = nuovoService_url;
			} else throw new Error("Il service URL non può essere cambiato");
		} else throw new Error("Il service URL non è valido");
	}

	get service_url() {
		return this.#service_url;
	}

	set controller(nuovoController) {
		if (!this.isNullOrEmpty(nuovoController)) {
			if (this.isNullOrEmpty(this.controller)) {
				this.#controller = nuovoController;
			} else throw new Error("Il controller non può essere cambiato");
		} else throw new Error("Il controller è vuoto");
	}

	get controller() {
		return this.#controller;
	}

	set type(nuovoType) {
		this.#type = nuovoType;
	}

	get type() {
		return this.#type;
	}

	set isauth(nuovoIsAuth) {
		this.#isauth = Boolean(nuovoIsAuth);
	}

	get isauth() {
		return this.#isauth;
	}

	// fetch API usata per accedere ad una risorsa locale o remota. Parameri opzionali
	async fetchAll(params = "") {
		let list = [];

		// Attende il caricamento della configurazione endpoint
		await this.loadConfig();

		// Donwload asincrono della risorsa
		const response = await fetch(this.service_url + "?" + params, {
			credentials: this.isauth ? "include" : "same-origin", // Include le credenziali nella richiesta [su deploy in cloud non serve ma per lo sviluppo in locale si]
		});

		// Controlla se la risposta è OK
		if (!response.ok) {
			switch (response.status) {
				case 401:
					document.dispatchEvent(this.#unAuthorizedEvt); // se non autorizzato invio evento
					throw new Error("Errore autenticazione");
				default:
					throw new Error("Errore nel recupero del file JSON");
			}
		}

		// Il processing della risposta è asincrono quindi bisogna aspettare prima di procedere
		const data = await response.json();

		for (let i = 0; i < data.length; i++) {
			let json = data[i];
			try {
				const item = this.getItem(json);
				list.push(item);
			} catch (e) {
				throw new Error(e.message);
			}
		}

		return list;
	}

	// fetch API usata per accedere al dettaglio di un elemento
	async fetch(itemPK) {
		// Attende il caricamento della configurazione endpoint
		await this.loadConfig();

		if (itemPK == null) {
			throw new Error("Errore nell'identificativo da scaricare");
		}

		// Donwload asincrono della risorsa
		const response = await fetch(this.service_url + "/" + itemPK, {
			credentials: this.isauth ? "include" : "same-origin", // Include le credenziali nella richiesta [su deploy in cloud non serve ma per lo sviluppo in locale si]
		});

		// Controlla se la risposta è OK
		if (!response.ok) {
			switch (response.status) {
				case 401:
					document.dispatchEvent(this.#unAuthorizedEvt); // se non autorizzato invio evento
					throw new Error("Errore autenticazione");
				default:
					throw new Error("Errore nel recupero del file JSON");
			}
		}

		// Il processing della risposta è asincrono quindi bisogna aspettare prima di procedere
		const json = await response.json();
		if (Object.keys(json).length != 0) {
			let item = this.getItem(json);
			return item;
		}

		return null;
	}

	// fetch API usata per inserire un nuovo elemento
	async insert(item) {
		// Attende il caricamento della configurazione endpoint
		await this.loadConfig();

		if (item == null || !(item instanceof this.type)) {
			throw new Error("Errore nell'item da inserire");
		}

		// Upload asincrono della risorsa
		const response = await fetch(this.service_url, {
			method: "POST", // Metodo HTTP
			credentials: this.isauth ? "include" : "same-origin", // Include le credenziali nella richiesta [su deploy in cloud non serve ma per lo sviluppo in locale si]
			headers: {
				"Content-Type": "application/json", // Specifica che invii JSON
			},
			body: JSON.stringify(item), // Converte l'oggetto in una stringa JSON
		});

		// Controlla se la risposta è OK
		if (!response.ok) {
			switch (response.status) {
				case 401:
					document.dispatchEvent(this.#unAuthorizedEvt); // se non autorizzato invio evento
					throw new Error("Errore autenticazione");
				default:
					throw new Error("Errore nell'inserimento");
			}
		}

		// Il processing della risposta è asincrono quindi bisogna aspettare prima di procedere
		const json = await response.json();
		if (Object.keys(json).length != 0) {
			let item = this.getItem(json);
			return item;
		}

		return null;
	}

	// Aggiorna il valore remoto di uno specifico elemento
	async update(item, itemPK) {
		// Attende il caricamento della configurazione endpoint
		await this.loadConfig();

		if (item == null || itemPK == null || !(item instanceof this.type)) {
			throw new Error("Errore nell'item da aggiornare");
		}

		// Upload asincrono della risorsa
		const response = await fetch(this.service_url + "/" + itemPK, {
			method: "PUT", // Metodo HTTP
			credentials: this.isauth ? "include" : "same-origin", // Include le credenziali nella richiesta [su deploy in cloud non serve ma per lo sviluppo in locale si]
			headers: {
				"Content-Type": "application/json", // Specifica che invii JSON
			},
			body: JSON.stringify(item), // Converte l'oggetto in una stringa JSON
		});

		// Controlla se la risposta è OK
		if (!response.ok) {
			switch (response.status) {
				case 401:
					document.dispatchEvent(this.#unAuthorizedEvt); // se non autorizzato invio evento
					throw new Error("Errore autenticazione");
				default:
					throw new Error("Errore nell'aggiornamento");
			}
		}

		// Il processing della risposta è asincrono quindi bisogna aspettare prima di procedere
		const json = await response.json();
		if (Object.keys(json).length != 0) {
			let item = this.getItem(json);
			return item;
		}

		return null;
	}

	// Elimina un elemento
	async delete(itemPK) {
		// Attende il caricamento della configurazione endpoint
		await this.loadConfig();

		if (itemPK == null) {
			throw new Error("Errore nell'identificativo da eliminare");
		}

		// Delete asincrono della risorsa
		const response = await fetch(this.service_url + "/" + itemPK, {
			method: "DELETE", // Metodo HTTP
			credentials: this.isauth ? "include" : "same-origin", // Include le credenziali nella richiesta [su deploy in cloud non serve ma per lo sviluppo in locale si]
		});

		// Controlla se la risposta è OK
		if (!response.ok) {
			switch (response.status) {
				case 401:
					document.dispatchEvent(this.#unAuthorizedEvt); // se non autorizzato invio evento
					throw new Error("Errore autenticazione");
				default:
					throw new Error("Errore nella eliminazione");
			}
		}
	}

	/**
	 * Funzione C#-Like per la creazione di un oggetto di tipo type ed eventuale impostazione delle extended_props per gli attributi extra.
	 *
	 * Importante: controllare sempre check su nr arguments nel costruttore delle classi singolari
	 */
	getItem(json) {
		const instance = new this.type();

		for (const key in json) {
			if (key in instance) {
				instance[key] = json[key];
			} else if (instance.extended_props) {
				instance.extended_props[key] = json[key];
			}
		}

		return instance;
	}

	/**
	 * Funzione C#-Like per controllare che una stringa sia null o vuota
	 */
	isNullOrEmpty(stringa) {
		return stringa == null || stringa.length == 0;
	}

	/**
	 * Funzione C#-Like per la verifica che sia un URL valido
	 */
	isValidURL(stringa) {
		try {
			new URL(stringa);
			return true;
		} catch (e) {
			return false;
		}
	}

	// Utilizza la fetch API per caricare la configurazione degli endpoint
	async loadConfig() {
		if (this.isValidURL(this.service_url)) return;

		const response = await fetch("./config.json");
		const config = await response.json();
		const activeConnection = config.ConnectionSettings.ActiveConnection;
		const url = config.ConnectionStrings[activeConnection];

		this.isauth = !this.isNullOrEmpty(config.Authentication) ? config.Authentication.toLowerCase() === "true" : false;
		this.service_url = encodeURI(url + "/" + this.controller); // loadConfig restituisce una Promise quindi questo assegnamento bisogna farlo qui
	}
}
