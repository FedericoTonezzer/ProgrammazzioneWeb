"use strict";

class Prodotto {
  #idProdotto;
  #nomeProdotto;
  #prezzoUnitario;
  #quantita;

  constructor(ValidProdotto, valnomeProdotto, valprezzoUnitario, valquantita) {
    this.idProdotto = ValidProdotto;
    (this.nomeProdotto = valnomeProdotto), (this.prezzoUnitario = valprezzoUnitario);
    this.quantita = valquantita;
  }
  //#region get e set delle variabili
  //get id prodotto
  get idProdotto() {
    return this.#idProdotto;
  }

  //set id prodotto
  set idProdotto(valore) {
    if (this.ValidateText(valore)) {
      this.#idProdotto = valore;
    } else {
      throw new Error("il codice del prodotto non e valido");
    }
  }

  //get nome prodotto
  get nomeProdotto() {
    return this.#nomeProdotto;
  }

  //set nome prodotto
  set nomeProdotto(valore) {
    if (this.ValidateText(valore)) {
      this.#nomeProdotto = valore;
    } else {
      throw new Error("il nome del prodotto non è corretto");
    }
  }

  //get prezzo unitario
  get prezzoUnitario() {
    return this.#prezzoUnitario;
  }

  //set prezzo unitario
  set prezzoUnitario(valore) {
    if (this.ValidateText(valore)) {
      this.#prezzoUnitario = valore;
    } else {
      throw new Error("il prezzo del prodotto non è valido");
    }
  }

  //get quantita del prodotto
  get quantita() {
    return this.#quantita;
  }

  //set quantita del prodotto
  set quantita(nuova_quantita) {
    if (this.isNullOrEmpty(nuova_quantita) || nuova_quantita >= 0) {
      this.#quantita = nuova_quantita;
    } else {
      throw new Error("la quantita del prodotto non è valida");
    }
  }

  //il metodo per il sub-totale basta solo il get, perché è un campo calcolato
  get sub_totale() {
    return this.quantita * this.prezzoUnitario;
  }
  //#endregion

  //funzione ValidateText
  ValidateText(stringa) {
    let valido = stringa != null;
    return valido;
  }

  //Funzione isNullOrEmpty
  isNullOrEmpty(stringa) {
    let valido = stringa == null || stringa.lenght == 0;
    return valido;
  }
}
