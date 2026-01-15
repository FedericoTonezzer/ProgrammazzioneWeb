"use strict";

let PERSONE_REPOSITORY = new Pesrone();

function btnInserisci_click() {
  let codice_fiscale;
  let nome;
  let cognome;

  let txtCodiceFiscale = document.getElementById("txtCodiceFiscale");
  let txtNome = document.getElementById("txtNome");
  let txtCognome = document.getElementById("txtCognome");

  if (validateForm("form")) {
    codice_fiscale = txtCodiceFiscale.value;
    nome = txtNome.value;
    cognome = txtCognome.value;
    creaEinserisci(codice_fiscale, nome, cognome);
    refreshTablepersona();
  }
}

function creaEinserisci(codice_fiscale, nome, cognome) {
  try {
    let nuova_persona = PERRSONE_REPOSITORY.create(codice_fiscale, nome, cognome);
    PERRSONE_REPOSITORY.add(nuova_persona);
  } catch (error) {
    alert(error.message);
  }
}

function refreshTablepersona() {
  let tblPersone = document.getElementById("tblPersone");
  let tbody = tblPersone.getElementsByTagName("tbody")[0];

  tbody.innerHTML = "";

  for (let i = 0; i < PERSONE_REPOSITORY.size(); i++) {
    let persona = PERSONE_REPOSITORY.get(i);

    let riga = tbody.insertRow();
    let codiceFiscaleCell = riga.insertCell(0);
    let nomeCell = riga.insertCell(0);
    let cognomeCell = riga.insertCell(0);

    codiceFiscaleCell.textContent = persona.codice_fiscale;
    nomeCell.textContent = persona.nome;
    cognomeCell.textContent = persona.cognome;
  }
}
