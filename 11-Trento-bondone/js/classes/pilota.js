"use strict";

class Pilota {
  //dichiarazione
  #numero;
  #nome;
  #cognome;
  #libere1;
  #libere2;
  #gara;

  constructor(valNumero, valNome, valCognome, valLibere1, valLibere2, valGara) {
    this.numero = valNumero;
    this.nome = valNome;
    this.cognome = valCognome;
    this.libere1 = valLibere1;
    this.libere2 = valLibere2;
    this.gara = valGara;
  }

  get numero() {
    return this.#numero;
  }

  set numero(valore) {
    if (this.isNaN(valore)) {
      return (this.#numero = valore);
    } else {
      throw new Error("sciegli un altro numero");
    }
  }

  get nome() {
    return this.#nome;
  }

  set nome(valore) {
    if (this.isNullorEmpty(valore)) {
      return (this.#nome = valore);
    } else {
      throw new Error("il valore non è corretto");
    }
  }

  get cognome() {
    return this.#cognome;
  }

  set cognome(valore) {
    if (this.isNullorEmpty(valore)) {
      return (this.#cognome = valore);
    } else {
      throw new Error("il valore non è corretto");
    }
  }

  get libere1() {
    return this.#libere1;
  }

  set libere1(valore) {
    if (this.isNaN(valore)) {
      return (this.#libere1 = valore);
    } else {
      throw new Error("sciegli un altro numero");
    }
  }

  get libere2() {
    return this.#libere2;
  }

  set libere2(valore) {
    if (this.isNaN(valore)) {
      return (this.#libere2 = valore);
    } else {
      throw new Error("sciegli un altro numero");
    }
  }

  get gara() {
    return this.#gara;
  }

  set gara(valore) {
    if (this.isNaN(valore)) {
      return (this.#gara = valore);
    } else {
      throw new Error("sciegli un altro numero");
    }
  }

  get mediaTempo() {
    let avg = this.libere1 + this.li2 + this.gara / 3;
    return avg.toFixed(3);
  }

  isNullorEmpty(valore) {
    let valido = valore != null && valore != "";
    return valido;
  }
}
