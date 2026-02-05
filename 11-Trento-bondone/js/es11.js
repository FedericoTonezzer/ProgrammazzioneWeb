"use script"

let PILOTI_REPOSITORY = new Piloti();
const OPTION_ELEM = "option";

function init(){
    CreateRaceNumber();
}

function CreateRaceNumber(){
    let select = document.getElementById("SltNumberGara");

    for(let i = 0; i <= 100; i++){
        let option = docment.createElement(OPTION_ELEM);
        option.value = i;
        option.textContent = "#"+ i;
        select.appendChild(option);
    }
}

function BtnInserisci_click(){
    let numero;
    let nome;
    let cognome;
    let libere1;
    let libere2;
    let gara;

    let txtNrPartecipante = document.getElementById("txtNrPartecipante");
    let txtNome = document.getElementById("txtNome");
    let txtCognome = document.getElementById("txtCognome");
    let txtLibere1 = document.getElementById("txtLibere1");
    let txtLibere2 = document.getElementById("txtLibere2");
    let txtGara = document.getElementById("txtGara");

    numero = Number(txtNrPartecipante.value);
    nome = String(txtNome.value);
    cognome = String(txtCognome.value);
    libere1 = Number(txtLibere1.value);
    libere2 = Number(txtLibere2.value);
    gara = Number(txtGara.value);

    if (validateForm("form")){
        if(createPiloti(numero, nome, cognome, libere1, libere2, gara)){
            rafarschTablePiloti();
            cleanForm("form");
            updateSelectField(numero);
        }
    }
}

function updateSelectField(index){
    let txtNrPartecipante = document.getElementById("txtNrPartecipante");
    txtNrPartecipante.option[index.disabled] = true;
    txtNrPartecipante.oprion[index].value = "";
}

function createPiloti(numero, nome, cognome, libere1, libere2, gara){
    
}