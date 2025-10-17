"use strict";

function btnCalcola_Click() {
  let qPrimi;
  let qSecondi;
  let totPrimi;
  let totSecondi;
  let seSalaRiservata;
  let importoSalaRiservata;
  let iva;
  let imponibile;
  let totale;

  let txtPrimi = document.getElementById("txtPrimi");
  let txtSecondi = document.getElementById("txtSecondi");
  let chkSalaRiservata = document.getElementById("chkSalaRiservata");
  let lblTotale = document.getElementById("lblTotale");

  if (checkData(txtPrimi, txtSecondi) == true) {
    // calcolo totale
    qPrimi = Number(txtPrimi.value);
    qSecondi = Number(txtSecondi.value);

    totPrimi = qPrimi * 9;
    totSecondi = qSecondi * 12;

    seSalaRiservata = chkSalaRiservata.checked;

    if (seSalaRiservata == true) {
      importoSalaRiservata = 10;
    } else {
      importoSalaRiservata = 0;
    }

    imponibile = totPrimi + totSecondi + importoSalaRiservata;

    iva = calcolaPercentuale(imponibile, 22);

    totale = imponibile + iva;

    lblTotale.textContent = totale.toFixed(2) + "EUR";
  } else {
    //qualcosa di sbagliato
    alert("I dati in input non sono corretti");
  }
}

function calcolaPercentuale(value, perc) {
  return (value * perc) / 100;
}

// controllo dati obbligatori
function checkData(txtPrimi, txtSecondi) {
  //valido i primi
  let primiValidi = txtPrimi.checkValidity();
  //valido i secondi
  let secondiValidi = txtSecondi.checkValidity();
  //se i primi e i secondi sono validi la form è valida
  let valido = primiValidi && secondiValidi;

  return valido;
}

function validateNumberField(txtNumberTextBox) {
  //se la txt non ha valore ristabilisco quello di default
  if (txtNumberTextBox.value == "") {
    if (txtNumberTextBox.hasAttribute("min")) {
      txtNumberTextBox.value = txtNumberTextBox.min;
    }
  }

  let errorClass = "error";

  let isValida = txtNumberTextBox.checkValidity(); //controllo la validità
  if (!isValida) {
    txtNumberTextBox.classList.add(errorClass); //se non valida agg error
  } else {
    txtNumberTextBox.classList.remove(errorClass); //se valida rimuovo error
  }
}
