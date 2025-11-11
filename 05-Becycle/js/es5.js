"use strict";

function BtnCalcola_Click() {
  //dichiarazioni
  let Prezzobase;
  let MaggiorazioneTipoVersione;
  let MaggiorazioneTipoSella;
  let ScontoIlluminazione;
  let ScontoCarta;
  let Imponibile;
  let Totale;

  //assegnazioni
  //textbox
  let TxtPrezzoBase = document.getElementById("TxtPrezzoBase");
  //tipo
  let SelectTipoVerisone = document.getElementById("SelectTipoVerisone");
  let SelectTipoSella = document.getElementById("SelectTipoSella");
  //checkbox
  let ChkIlluminazione = document.getElementById("ChkIlluminazione");
  let ChkCarta = document.getElementById("ChkCarta");
  //totale
  let LblTotale = document.getElementById("LblTotale");

  //calcoli
  MaggiorazioneTipoVersione = CalcoloMaggiorazioneVersione(SelectTipoVersione);
  MaggiorazioneTipoSella = CalcoloMaggiorazioneSella(SelectTipoSella);

  //checkbox illuminazione
  if (ChkIlluminazione.checked) {
    ChkIlluminazione = (Prezzobase * 7) / 100;
  } else {
    ScontoIlluminazione = 0;
  }

  Imponibile =
    PrezzoBase +
    MaggiorazioneTipoVersione +
    MaggiorazioneTipoSella -
    ScontoIlluminazione;

  //checkbox Carta
  if (ChkCarta.checked) {
    ScontoCarta = CalcolaPercentuale(Imponibile, 3);
  } else {
    ScontoCarta = 0;
  }

  Imponibile = Imponibile - ScontoCarta;

  Totale = Imponibile + CalcolaPercentuale(Imponibile, 22);

  //risultato
  LblTotale.textContent = Totale.toFixed(2) + "EUR";
}

function CalcoloMaggiorazioneVersione(SelectTipoVerisone) {
  //region MaggiorazioneTipoVersione
  let MaggiorazioneTipoVersione;
  let PrezzoBase;

  if (SelectTipoVerisone.value == 0) {
    MaggiorazioneTipoVersione = 0;
  } else if (SelectTipoVerisone.value == 1) {
    MaggiorazioneTipoVersione = CalcolaPercentuale(PrezzoBase, -5); // è una riduzione perchè c'è il -
  } else if (SelectTipoVerisone.value == 2) {
    MaggiorazioneTipoVersione = CalcolaPercentuale(PrezzoBase, 10);
  } else if (SelectTipoVerisone.value == 3) {
    MaggiorazioneTipoVersione = CalcolaPercentuale(PrezzoBase, 15);
  } else {
    MaggiorazioneTipoVersione = CalcolaPercentuale(PrezzoBase, 25);
  }

  return MaggiorazioneTipoVersione;
}

function CalcoloMaggiorazioneSella(SelectTipoSella) {
  //region MaggiorazioneTipoSella
  let MaggiorazioneTipoSella;
  let PrezzoBase;

  if (SelectTipoSella.value == 0) {
    MaggiorazioneTipoSella = 0;
  } else if (SelectTipoSella.value == 1) {
    MaggiorazioneTipoSella = CalcolaPercentuale(PrezzoBase, -5); // è una riduzione perchè c'è il -
  } else if (SelectTipoSella.value == 2) {
    MaggiorazioneTipoSella = CalcolaPercentuale(PrezzoBase, 20);
  } else {
    MaggiorazioneTipoSella = CalcolaPercentuale(PrezzoBase, 30);
  }

  return MaggiorazioneTipoSella;
}

function CalcolaPercentuale(valore, perc) {
  return (valore * perc) / 100;
}

function DisabilitaAbilitaSconti(checkbox) {
  let GrpSconti = document.getElementById("GrpSconti");
  GrpSconti.disabled = checkbox.checked;
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
