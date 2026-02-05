// Whole-script strict mode syntax
"use strict";

/**
 * Classe Persona, contiene le informazioni sulla singola persona
 */
class Persona {
	// Variabili private
	#codice_fiscale; // obbligatorio
	#nome; // obbligatorio
	#cognome; // obbligatorio
	#sesso; // obbligatorio
	#reddito; // obbligatorio

	// Costruttore per la classe Persona
	constructor(codice_fiscale, nome, cognome, sesso, reddito) {
		this.codice_fiscale = codice_fiscale;
		this.nome = nome;
		this.cognome = cognome;
		this.sesso = sesso;
		this.reddito = reddito;
	}

	// getter e setter delle proprietà
	get codice_fiscale() {
		return this.#codice_fiscale;
	}

	set codice_fiscale(nuovoCodiceFiscale) {
		if (this.validaCodiceFiscale(nuovoCodiceFiscale)) {
			this.#codice_fiscale = nuovoCodiceFiscale;
		} else throw new Error("Il codice fiscale non è corretto");
	}

	get nome() {
		return this.#nome;
	}

	set nome(nuovoNome) {
		if (!this.isNullOrEmpty(nuovoNome)) {
			this.#nome = nuovoNome;
		} else throw new Error("Il nome non è corretto");
	}

	get cognome() {
		return this.#cognome;
	}

	set cognome(nuovoCognome) {
		if (!this.isNullOrEmpty(nuovoCognome)) {
			this.#cognome = nuovoCognome;
		} else throw new Error("Il cognome non è corretto");
	}

	get sesso() {
		return this.#sesso;
	}

	set sesso(nuovoSesso) {
		if (!this.isNullOrEmpty(nuovoSesso)) {
			this.#sesso = nuovoSesso;
		} else throw new Error("Il sesso non è corretto");
	}

	get reddito() {
		return this.#reddito;
	}

	set reddito(nuovoReddito) {
		nuovoReddito = Number(nuovoReddito);
		if (!isNaN(nuovoReddito)) {
			if (nuovoReddito < 0) {
				throw new Error("Il reddito non può essere negativo");
			} else this.#reddito = nuovoReddito;
		} else throw new Error("Il reddito non è numerico");
	}

	/**
	 * Valida il codice fiscale.
	 * Qui possono essere inclusi check molto complessi ma noi per ora ci limitiamo ad una validazione
	 * sul numero di caratteri che deve essere 16
	 */
	validaCodiceFiscale(codice_fiscale) {
		return !this.isNullOrEmpty(codice_fiscale) && codice_fiscale.length == 16;
	}

	/**
	 * Funzione C#-Like per controllare che una stringa sia null o vuota
	 */
	isNullOrEmpty(stringa) {
		return stringa == null || stringa.length == 0;
	}
}
