"use strict";

function btnCalcola_Click() {
  let CostoBase;
  let SeScontoDonna;
  let 

  let txtCostoBase = document.getElementById("txtCostoBase");
  let txtSecondi = document.getElementById("txtSecondi");
  let chkSalaRiservata = document.getElementById("chkSalaRiservata");
  let lblTotale = document.getElementById("lblTotale");

  if (checkData(txtPrimi, txtSecondi) == true) {
    // calcolo totale
    CostoBase = Number(txtPrimi.value);
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
function checkData(txtCostoBase) {
  let valido;

  if (txtCostoBAse.vale == "") {
    valido = false;
  } else {
    valido = true;
  }
  return valido;
}

function validateNumberField(txtNumberTextBox) {
  let errorClass = "error";

  let isValida = txtNumberTextBox.checkValidity(); //controllo la validità
  if (!isValida) {
    txtNumberTextBox.classList.add(errorClass); //se non valida agg error
  } else {
    txtNumberTextBox.classList.remove(errorClass); //se valida rimuovo error
  }
}
