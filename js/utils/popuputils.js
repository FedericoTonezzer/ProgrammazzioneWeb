// Whole-script strict mode syntax
"use strict";

/**
 * Popup
 */
class Popup {
	#container;
	#content;
	#title;

	// Costruttore per la classe Popup, le variabili private sono create implicitamente se prefissate con this
	constructor() {}

	get container() {
		return this.#container;
	}

	set container(element) {
		if (!this.isNullOrEmpty(element) && element instanceof HTMLElement) {
			this.#container = element;
		}
	}

	get content() {
		return this.#content;
	}

	set content(element) {
		if (!this.isNullOrEmpty(element) && element instanceof HTMLElement) {
			this.#content = element;
		}
	}

	get title() {
		return this.#title;
	}

	set title(element) {
		if (!this.isNullOrEmpty(element) && element instanceof HTMLElement) {
			this.#title = element;
		}
	}

	/**
	 * Pulisce la struttura del popup precedente
	 */
	init() {}

	/**
	 * Crea la struttura DOM del popup e la appende al documento. Se già presente riutilizza quella disponibile
	 */
	create() {
		try {
			// riutilizzo dello stesso elemento DOM per la creazione del popup
			if (this.container == null) {
				this.container = document.createElement("div");
				this.container.setAttribute("id", "popup");
				this.container.classList.add("popup");

				let popup = document.createElement("div");

				// Header
				let header = document.createElement("div");
				this.title = document.createElement("h3");
				header.appendChild(this.title);

				// Content
				this.content = document.createElement("div");

				// Footer
				let footer = document.createElement("div");
				footer.classList.add("footer");
				footer.classList.add("right");

				let btn = document.createElement("button");
				btn.setAttribute("type", "button");
				btn.setAttribute("icon", "check");
				btn.onclick = () => {
					this.hidePopup();
				};

				let iconDiv = document.createElement("div");
				let labelDiv = document.createElement("div");
				labelDiv.innerText = "Ok";

				btn.appendChild(iconDiv);
				btn.appendChild(labelDiv);

				footer.appendChild(btn);

				this.container.appendChild(popup);
				popup.appendChild(header);
				popup.appendChild(this.content);
				popup.appendChild(footer);

				document.body.appendChild(this.container);
			}
		} catch (e) {
			console.error("Errore nella creazione del popup");
			return false;
		}

		return true;
	}

	/**
	 * Mostra il popup con uno specifico messaggio
	 */
	showPopup(message, title) {
		if (this.create()) {
			if (this.container == null) return;

			this.content.innerText = message;
			this.title.innerText = this.isNullOrEmpty(title) ? "Messaggio" : title;
			this.container.classList.add("visible");
		}
	}

	/**
	 * Nasconde il popup e invia un evento
	 */
	hidePopup() {
		if (this.container == null) return;

		this.container.classList.remove("visible");

		let hidePopupEvt = new CustomEvent("popup-closed");
		document.dispatchEvent(hidePopupEvt);
	}

	/**
	 * Funzione C#-Like per controllare che una stringa sia null o vuota
	 */
	isNullOrEmpty(stringa) {
		return stringa == null || stringa.length == 0;
	}
}
