// Whole-script strict mode syntax
"use strict";

/**
 * Raccolta di funzioni di utilità per la validazione visuale delle form
 */

/**
 * Valida il contenuto di una TextBox colorando la textbox in caso di errore applicando la classe "error"
 */
function validateTextField(textBox) {
	const errorClass = "error";
	let value = textBox.value;
	if (value == null || value.length == 0) {
		textBox.classList.add(errorClass);
	} else {
		textBox.classList.remove(errorClass);
	}
}

/**
 * Valida il contenuto di una TextBox sostituendo testi vuoti con 0 e colorando la textbox in caso di errore applicando la classe "error"
 */
function validateNumberField(textBox) {
	if (textBox.value == "") textBox.value = 0;

	const errorClass = "error";
	let value = Number(textBox.value);

	let min = textBox.hasAttribute("min") ? Number(textBox.min) : null;
	let max = textBox.hasAttribute("max") ? Number(textBox.max) : null;

	if (min != null && value < min) {
		textBox.classList.add(errorClass);
	} else if (max != null && value > max) {
		textBox.classList.add(errorClass);
	} else {
		textBox.classList.remove(errorClass);
	}
}

/**
 * Valida il contenuto di una TextBox di tipo Data colorando la textbox in caso di errore applicando la classe "error"
 */
function validateDateField(textBox) {
	const errorClass = "error";
	let value = new Date(textBox.value);
	if (isNaN(value)) {
		textBox.classList.add(errorClass);
	} else {
		textBox.classList.remove(errorClass);
	}
}

/**
 * Valida il contenuto di una TextBox di tipo Data colorando la textbox in caso di errore applicando la classe "error"
 *
 * ^: Inizia a controllare dall'inizio della stringa.
 * [^\s@]+: Una o più lettere, numeri o simboli che non includono spazi (\s) o il simbolo @.
 * @: Deve contenere il simbolo @.
 * [^\s@]+: Altre lettere, numeri o simboli dopo il @.
 * \.: Deve contenere un punto (.).
 * [^\s@]+: Almeno una sequenza di caratteri dopo il punto.
 * $: Termina il controllo alla fine della stringa.
 */
function validateEmailField(textBox) {
	const errorClass = "error";
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!regex.test(textBox.value)) {
		textBox.classList.add(errorClass);
	} else {
		textBox.classList.remove(errorClass);
	}
}

/**
 * Valida il contenuto di un Select colorando la textbox in caso di errore applicando la classe "error".
 * Se l'option selezionata è disabled vuol dire che è ancora impostata al valore di default
 */
function validateSelectField(selectField) {
	let option = selectField.options[selectField.selectedIndex];

	const errorClass = "error";
	if (option.disabled) {
		selectField.classList.add(errorClass);
	} else {
		selectField.classList.remove(errorClass);
	}
}

/**
 * Controlla se tutti i field marchiati come required sono stati riempiti
 * in quanto l'evento predefinito onBlur viene innescato solo se prima si
 * è entrati nel field stesso
 */
function validateForm(formID) {
	if (isNullOrEmpty(formID)) return;

	const form = document.getElementById(formID);

	const invalidFields = Array.from(form.elements).filter((field) => {
		return field.required && !field.checkValidity();
	});

	const validFields = Array.from(form.elements).filter((field) => {
		return field.required && field.checkValidity();
	});

	const errorClass = "error";

	if (invalidFields.length > 0) {
		invalidFields.forEach((field) => {
			field.classList.add(errorClass);
		});
	}

	if (validFields.length > 0) {
		validFields.forEach((field) => {
			field.classList.remove(errorClass);
		});
	}

	return invalidFields.length == 0;
}

/**
 * Pulisce il form
 */
function cleanForm(formID) {
	if (isNullOrEmpty(formID)) return;

	let form = document.getElementById(formID);
	form.reset();
}

/**
 * Crea un bottone, con o senza background color
 */
function createButton(icon, label, nobg = false, small = false) {
	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("icon", icon);

	if (nobg) btn.classList.add("nobg");
	if (small) {
		btn.classList.add("small");
		btn.setAttribute("hint", label);
	}
	btn.innerText = label && !small ? label : "";

	return btn;
}

/**
 * Crea un bottone piccolo senza background
 */
function createSmallButton(icon, label, nobg = false, small = true) {
	return createButton(icon, label, nobg, small);
}

/**
 * Disabilita o abilita un componente
 */
function disableEnableComponent(name, value) {
	if (isNullOrEmpty(name)) return;

	let element = document.getElementById(name);
	element.disabled = value;
}

/**
 * Funzione di utilità che, dato IL NOME STRINGA di radio che fanno parte dello stesso gruppo (hanno quindi lo stesso nome)
 * ne restituisce il valore di quello selezionato
 */
function getRadioValue(name) {
	if (isNullOrEmpty(name)) return;

	let i;

	/* RADIO VIA NOME VISTO CHE HANNO LO STESSO NOME --> ARRAY */
	let radioElements = document.getElementsByName(name);

	for (i = 0; i < radioElements.length; i++) {
		if (radioElements[i].checked) {
			return Number(radioElements[i].value);
		}
	}
}

/**
 * Funzione di utilità che, dato L'ID STRINGA di una checkbox ne restituisce il valore numerico se checkato, 0 altrimenti
 */
function getCheckboxValue(checkboxID) {
	if (isNullOrEmpty(checkboxID)) return;

	let checkbox = document.getElementById(checkboxID);

	return checkbox.checked ? Number(checkbox.value) : 0;
}
