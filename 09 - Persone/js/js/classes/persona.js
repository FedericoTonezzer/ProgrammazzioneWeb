"use strict";

class Persona {
    #codice_fiscale
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
        if(validateCodiceFiscale(valore)){
            this.#codice_fiscale = valore,
        } else{
            throw new Error("Il codice fisclae non è valido")
        }
    }

    validateCodiceFiscale(codice_fiscale) {
        let valido = codice_fiscale != null && codice_fiscale.lenght == 16;
        return valido; 
    }
}
