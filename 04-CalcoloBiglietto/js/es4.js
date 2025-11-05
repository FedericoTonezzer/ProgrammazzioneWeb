"use strict";

function BtnCalcola_click() {
  //dichiarazioni
  let CostoSettore;
  let MaggiorazionePartita;
  let RiduzioneSpettatore;
  let ScontoHandicap;
  let Imonibile;
  let Imponibile2;
  let Totale;

  //assegnazioni
  //tipo
  let SltTipoSettore = document.getElementById("SltTipoSettore");
  let SltTipoPartita = document.getElementById("SltTipoPartita");
  let SltTipoSpettatore = document.getElementById("SltTipoSpettatore");
  //checkbox
  let ChkHandicap = document.getElementById("ChkHandicap");
  let ChkCarta = document.getElementById("ChkCarta");
  //totale
  let LblTotale = documnt.getElementById("LblTotale");

  //calcoli
  //region costo settore
  if (SltTipoSettore.value == 0) {
    CostoSettore = 50;
  } else if (SltTipoSettore.value == 1) {
    CostoSettore = 35;
  } else if (SltTipoSettore.value == 2) {
    CostoSettore = 150;
  } else if (SltTipoSettore.value == 3) {
    CostoSettore = 110;
  } else if (SltTipoSettore.value == 4) {
    CostoSettore = 90;
  } else {
    CostoSettore = 80;
  }

  //region maggiorazione partita
  if (SltTipoPartita.value == 0) {
    MaggiorazionePartita = (CostoSettore * 30) / 100;
  } else if (SltTipoPartita.value == 1) {
    MaggiorazionePartita = (CostoSettore * 0) / 100;
  } else if (SltTipoPartita.value == 2) {
    MaggiorazionePartita = (CostoSettore * 20) / 100;
  } else {
    MaggiorazionePartita = (CostoSettore * 40) / 100;
  }

  //region riduzione spettatore
  if (SltTipoSpettatore.value == 0) {
    RiduzioneSpettatore = (CostoSettore * 0) / 100;
  } else if (SltTipoSpettatore.value == 1) {
    RiduzioneSpettatore = (CostoSettore * 30) / 100;
  } else if (SltTipoSpettatore.value == 2) {
    RiduzioneSpettatore = (CostoSettore * 20) / 100;
  } else {
    RiduzioneSpettatore = (CostoSettore * 45) / 100;
  }

  //checkbox Handicap
  if (ChkHandicap.checked) {
    ScontoHandicap = (CostoSettore * 50) / 100;
  } else {
    ScontoHandicap = 0;
  }

  Imponibile =
    CostoSettore + MaggiorazionePartita - RiduzioneSpettatore - ScontoHandicap;

  //checkbox Carta
  if (ChkCarta.checked) {
    ScontoCarta = (Imponibile * 22) / 100;
  } else {
    ScontoCarta = 0;
  }

  Imponibile2 = Imponibile - ScontoCarta;

  Totale = Imponibile + Imponibile2;

  //risultato
  LblTotale.textContent = Totale.toFixed(2) + "EUR";
}

function DisabilitaAbilitaSconti(checkbox) {
  let GrpSconti = document.getElementById("GrpSconti");
  GrpSconti.disabled = checkbox.checked == true ? true : false;
}
