// Whole-script strict mode syntax
"use strict";

let PERSONE_REPOSITORY = new Persone();

/**
 * Effettua il refresh della tabella delle persone
 */
function refreshTablePersona() {
	let tblPersone = document.getElementById("tblPersone");
	let tbody = tblPersone.getElementsByTagName("tbody")[0];

	// Cancello il tbody da tutti i suoi figli così faccio il refresh completo della tabella solo se ci sono dati
	if (PERSONE_REPOSITORY.size() > 0) {
		while (tbody.hasChildNodes()) {
			tbody.removeChild(tbody.firstChild);
		}
	}

	for (let i = 0; i < PERSONE_REPOSITORY.size(); i++) {
		let persona = PERSONE_REPOSITORY.get(i);
		let newRow = tbody.insertRow();

		let codiceFiscaleCell = newRow.insertCell(0);
		let nomeCell = newRow.insertCell(1);
		let cognomeCell = newRow.insertCell(2);

		// Add some text to the new cells:
		codiceFiscaleCell.textContent = toText(persona.codice_fiscale);
		nomeCell.textContent = toText(persona.nome);
		cognomeCell.textContent = toText(persona.cognome);
	}
}
