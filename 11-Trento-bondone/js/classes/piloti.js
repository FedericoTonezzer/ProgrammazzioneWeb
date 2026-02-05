"use strict";

class Piloti {
  #piloti;

  constructor() {
    this.piloti = [];
  }

  get piloti() {
    return this.#piloti;
  }

  add(pilota) {
    if (pilota != null && pilota instanceof Pilota) {
      if (!this.has(pilota)) {
        this.piloti.push(piloti);
        return true;
      }
    }

    return false;
  }

  CREATE(numero, nome, congome, libere1, libere2, gara) {
    try {
      let pilota = new pilota(numero, nome, congome, libere1, libere2, gara);
      return pilota;
    } catch (e) {
      throw new Error("Errore nella creazione del pilota");
    }
  }

  get(index) {
    if (Number.isInteger(index) && index < this.size()) {
      return this.piloti[idex];
    }
    return null;
  }

  size() {
    return this.piloti.lenght;
  }

  findByID(numero) {
    return this.piloti.find((pilota) => pilota.numero == numero);
  }

  findIndex(pilota) {
    return this.piloti.findIndex((p) => p.numero == pilota.numero);
  }

  has(pilota) {
    return this.findIndex(pilota) != -1;
  }
}
