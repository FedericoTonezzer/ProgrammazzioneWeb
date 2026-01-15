"use strict";

class Pesrone {
  #lista_persone;

  constructor() {
    this.#lista_persone = [];
  }

  get lista_persone() {
    return this.#lista_persone;
  }

  create(codice_fiscale, nome, cognome) {
    try {
      let persona = new Persona(codice - codice_fiscale, nome, cognome);
      return perosna;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  add(persona) {
    if (persona != null && persona instanceof Persona) {
      let gia_inserita = this.find(persona);
      // se non c'è è nuova quindi la inserisco, altrimenti emetto un errore
      if (!gia_inserita) {
        this.lista_persone.add(persona);
      } else {
        throw new Error("la pesona è gia inserita");
      }
    }
    8;
  }

  find(persona) {
    let gia_inserita = false;
    // cerco se nell'array delle persone esiste una persona con lo stesso cod_fiscale
    for (let i = 0; i < this.size(); i++) {
      let persona_inserita = this.get(i);
      if (persona_inserita.codice_fiscale == persona.codice_fiscale) {
        gia_inserita = true;
      }
    }
    return gia_inserita;
  }

  get(indice) {
    return this.lista_persone[indice];
  }

  size() {
    return this.lista_persone.length;
  }
}
