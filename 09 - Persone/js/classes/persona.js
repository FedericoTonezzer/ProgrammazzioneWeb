"use strict";

class Persona {
  #codice_fiscale;
  #nome;
  #cognome;

  constructor(valCodiceFiscale, valNome, valCognome) {
    this.codice_fiscale = valCodiceFiscale;
    this.nome = valNome;
    this.cognome = valCognome;
  }

  get codice_fiscale() {
    return this.#codice_fiscale;
  }

  set codice_fiscale(valore) {
    if (this.validateCodiceFiscale(valore)) {
      this.#codice_fiscale = valore;
    } else {
      throw new Error("Il codice fisclae non è valido");
    }
  }

  get nome_cognome() {
    return this.nome + " " + this.cognome;
  }

  get nome() {
    return this.#nome;
  }

  set nome(valore) {
    if (!this.isNullOrEmpty(valore)) {
      this.#nome = valore;
    } else {
      throw new Error("Il nome è obbligatorio");
    }
  }

  get cognome() {
    return this.#cognome;
  }

  set cognome(valore) {
    if (!this.isNullOrEmpty(valore)) {
      this.#cognome = valore;
    } else {
      throw new Error("Il cognome è obbligatorio");
    }
  }

  validateCodiceFiscale(codice_fiscale) {
    let valido = codice_fiscale != null && codice_fiscale.lenght == 16;
    return valido;
  }
}
