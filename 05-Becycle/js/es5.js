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
  //tipo
  let SelectTipoVerisone = document.getElementById("SelectTipoVerisone");
  let SelectTipoSella = document.getElementById("SelectTipoSella");
  //checkbox
  let ChkHandicap = document.getElementById("ChkHandicap");
  let ChkCarta = document.getElementById("ChkCarta");
  //totale
  let LblTotale = document.getElementById("LblTotale");

  //calcoli
  CostoSettore = CalcoloCostoSettore(SelectTipoSettore);
  MaggiorazionePartita = CalcoloMaggiorazionePartita(SelectTipoPartita);
  RiduzioneSpettatore = CalcoloRiduzioneSpettatore(SelectTipoSpettatore);

  //checkbox Handicap
  if (ChkHandicap.checked) {
    ScontoHandicap = (CostoSettore * 50) / 100;
  } else {
    ScontoHandicap = 0;
  }

  Imponibile = CostoSettore + MaggiorazionePartita - RiduzioneSpettatore - ScontoHandicap;

  //checkbox Carta
  if (ChkCarta.checked) {
    ScontoCarta = CalcolaPercentuale(Imponibile, 5);
  } else {
    ScontoCarta = 0;
  }

  Imponibile = Imponibile - ScontoCarta;

  Totale = Imponibile + CalcolaPercentuale(Imponibile, 22);

  //risultato
  LblTotale.textContent = Totale.toFixed(2) + "EUR";
}

function CalcoloCostoSettore(SelectTipoSettore) {
  //region costo settore
  let CostoSettore;

  if (SelectTipoSettore.value == 0) {
    CostoSettore = 50;
  } else if (SelectTipoSettore.value == 1) {
    CostoSettore = 35;
  } else if (SelectTipoSettore.value == 2) {
    CostoSettore = 150;
  } else if (SelectTipoSettore.value == 3) {
    CostoSettore = 110;
  } else if (SelectTipoSettore.value == 4) {
    CostoSettore = 90;
  } else {
    CostoSettore = 80;
  }

  return CostoSettore;
}

function CalcoloMaggiorazionePartita(SelectTipoPartita) {
  //region maggiorazione partita
  let MaggiorazionePartita;
  let CostoSettore;

  if (SelectTipoPartita.value == 0) {
    MaggiorazionePartita = CalcolaPercentuale(CostoSettore, 30);
  } else if (SelectTipoPartita.value == 1) {
    MaggiorazionePartita = 0;
  } else if (SelectTipoPartita.value == 2) {
    MaggiorazionePartita = CalcolaPercentuale(CostoSettore, -20); // è una riduzione perchè c'è il -
  } else {
    MaggiorazionePartita = CalcolaPercentuale(CostoSettore, 40);
  }

  return MaggiorazionePartita;
}

function CalcoloRiduzioneSpettatore(SelectTipoSpettatore) {
  //region riduzione spettatore
  let RiduzioneSpettatore;
  let CostoSettore;

  if (SelectTipoSpettatore.value == 0) {
    RiduzioneSpettatore = 0;
  } else if (SelectTipoSpettatore.value == 1) {
    RiduzioneSpettatore = CalcolaPercentuale(CostoSettore, 30);
  } else if (SelectTipoSpettatore.value == 2) {
    RiduzioneSpettatore = CalcolaPercentuale(CostoSettore, 20);
  } else {
    RiduzioneSpettatore = CalcolaPercentuale(CostoSettore, 45);
  }

  return RiduzioneSpettatore;
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
