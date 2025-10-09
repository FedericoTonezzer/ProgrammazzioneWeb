// Whole-script strict mode syntax
"use strict";

/**
 * Classe PropertyBag : si tratta di una classe basata sul PropertyBag  design pattern, dove viene creato questo PropertyBag
 * composto semplicemente da un JS Object in grado i collezionare qualsiasi elemento chiave-valore e viene utilizzato per creare
 * le extendedprops per ogni classe. Le extendedprops contengono valori derivati che non sono specifici del modello di dati
 */
class PropertyBag {
	// Variabili private
	#properties;

	constructor() {
		this.#properties = {};
	}

	set(key, value) {
		if (value == null) {
			this.delete(key);
			return;
		}

		this.#properties[key] = value;
	}

	get(key) {
		return this.#properties[key];
	}

	has(key) {
		return key in this.#properties;
	}

	delete(key) {
		delete this.#properties[key];
	}
}
