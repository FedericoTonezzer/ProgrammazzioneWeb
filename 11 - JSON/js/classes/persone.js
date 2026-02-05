// Whole-script strict mode syntax
"use strict";

/**
 * Classe Persone, Repository di oggetti Persona
 * Basato su design patter Repository https://www.umlboard.com/design-patterns/repository.html
 * (e.g. QT QAbstractItemModel)
 */
class Persone {
	// Variabile privata
	#persone;

	#RESOURCEURL = "./data/personedata.json"; // Path relativo a partire dalla posizione di index.html

	// Costruttore per la classe Persona, le variabili private sono create implicitamente se prefissate con this
	constructor() {
		this.#persone = [];
	}

	// creiamo solo il get così non possiamo riscrivere per intero l'array di Persone
	get persone() {
		return this.#persone;
	}

	// Aggiunge una persona, restituisce true se è stata aggiunta, false altrimenti
	add(persona) {
		if (persona != null && persona instanceof Persona) {
			if (!this.has(persona)) {
				this.persone.push(persona);
				return true;
			}
		}

		return false;
	}

	// Crea una persona. Anche la creazione dell'oggetto passa sempre dal relativo Repository
	create(codice_fiscale, nome, cognome, sesso, reddito) {
		try {
			let persona = new Persona(codice_fiscale, nome, cognome, sesso, reddito);
			return persona;
		} catch (e) {
			throw new Error("Errore nella creazione della persona");
		}
	}

	// Restituisce una persona ad uno specifico indice
	get(index) {
		if (Number.isInteger(index) && index < this.size()) {
			return this.persone[index];
		}
		return null;
	}

	// Restituisce il numero di elementi
	size() {
		return this.persone.length;
	}

	// Restituisce una persona a partire dal suo codice fiscale
	findByID(codice_fiscale) {
		return this.persone.find((persona) => persona.codice_fiscale == codice_fiscale);

		/** EQUIVALENTE A
		for (let i = 0; i < this.size(); i++) {
			let persona = this.get(i);
			if (persona.codice_fiscale == codice_fiscale) {
				return persona;
			}
		}
		return null;
		 */
	}

	// Restituisce l'indice di una persona. Se non esiste restituisce -1
	findIndex(persona) {
		return this.persone.findIndex((p) => p.codice_fiscale == persona.codice_fiscale);

		/** EQUIVALENTE A
		for (let i = 0; i < this.size(); i++) {
			let p = this.get(i);
			if (persona.codice_fiscale == p.codice_fiscale) {
				return i;
			}
		}
		return -1;
		*/
	}

	// Verifica se una persona esiste nella lista persone
	has(persona) {
		return this.findIndex(persona) != -1;
	}
}
