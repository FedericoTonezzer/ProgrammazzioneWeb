// Whole-script strict mode syntax
"use strict";

/**
 * Raccolta di funzioni di utilità per la gestione delle stringhe
 */

/**
 * Funzione C#-Like per controllare che una stringa sia null o vuota
 */
function isNullOrEmpty(stringa) {
	return stringa == null || stringa.length == 0;
}

/**
 * Funzione C#-Like per controllare che una data stringa sia valida
 */
function isDateValid(date) {
	if (isNullOrEmpty(date)) return false;
	return !isNaN(new Date(date));
}

/**
 * Evita la stampa a video di stringhe null o undefined, sostituendole con una stringa vuota
 */
function toText(value) {
	return isNullOrEmpty(value) ? "" : value;
}

/**
 * Evita la stampa a video di numeri null o undefined, sostituendole con 0
 */
function toNumber(value) {
	return isNaN(value) ? 0 : value;
}

/**
 * Stampa un numero in formato valuta, arrotondando alle due cifre decimali e aggiungendo il simbolo €
 */
function toCurrency(value) {
	if (isNaN(value)) {
		return "0€";
	}

	return value.toFixed(2) + "€";
}

/**
 * Stampa un numero in formato percentuale
 */
function toPercent(value) {
	if (isNaN(value)) {
		return "0%";
	}

	return value.toFixed(2) + "%";
}

/**
 * Stampa una data in formato ISO senza però applicare il fuso in automatico.
 * Devo manipolare la stringa in quanto se uso toISOString mi applica automaticamente il fuso orario
 * e non c'è possibilità di applicare la time-zone
 *
 * ATTENZIONE:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 * When the time zone offset is absent, date-only forms are interpreted as a UTC time and date-time forms are interpreted as a local time
 *
 */
function toUTCDateTime(date) {
	if (!isDateValid(date)) return null;

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// Non servirebbe in quando le date e basta sono già UTC (vedi sopra)
function toUTCDate(date) {
	if (!isDateValid(date)) return null;
	return toUTCDateTime(date).split("T")[0];
}

/**
 * Stampa una data in formato locale italiano dd/mm/aaaa
 */
function toLocaleDate(date) {
	if (!isDateValid(date)) return "";

	let locale = date.toLocaleString("it-IT", {
		timeZone: "UTC",
	});

	return locale.split(",")[0];
}

/**
 * Stampa una ora in formato locale italiano hh:mm:ss
 */
function toLocaleTime(date) {
	if (!isDateValid(date)) return "";

	let locale = date.toLocaleString("it-IT", {
		timeZone: "UTC",
	});

	return locale.split(",")[1];
}

/**
 * Stampa una data e ora in formato locale italiano dd/mm/aaaa hh:mm:ss
 */
function toLocaleDateTime(date) {
	return toLocaleDate(date) + " " + toLocaleTime(date);
}
