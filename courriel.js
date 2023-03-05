
var message_envoye = document.querySelector("#liste_me");
var message_recu = document.querySelector("#liste_mr");
var liste_contact = document.querySelector("#liste_contact");
var div_list_message = document.querySelector(".Message");
var div_form_newMessage = document.querySelector(".Ecrire_un_Message");
var div_form_newContact = document.querySelector(".creer_contact");

function chargement(){
    setManyDisplayNOne([liste_contact, message_envoye, div_form_newMessage, div_form_newContact]);
    setManyDisplayBlock([message_recu, div_list_message])
    
}

function appearNewMessage(){
    setManyDisplayNOne([div_list_message, div_form_newContact]);
    setDisplayblock(div_form_newMessage);
}

function setDisplaynone(element){
    element.setAttribute("style", "display: none;");
}

function setDisplayblock(element){
    element.setAttribute("style", "display: block;");
}

function setManyDisplayBlock(tabOfElement){
    for(var i = 0; i < tabOfElement.length; i++){
        setDisplayblock(tabOfElement[i]);
    }
}

function setManyDisplayNOne(tabOfElement){
    for(var i = 0; i < tabOfElement.length; i++){
        setDisplaynone(tabOfElement[i]);
    }
}

function click_Me(){
    setManyDisplayNOne([message_recu, liste_contact, div_form_newMessage, div_form_newContact]);
    setManyDisplayBlock([message_envoye, div_list_message]);
}

function click_Lc(){
    setManyDisplayNOne([message_envoye, message_recu, div_form_newMessage, div_list_message]);
    setManyDisplayBlock([liste_contact, div_form_newContact]);
}

function rechercher(){
    var recherche = document.getElementById("recherche").value; //valeur à rechercher
    var grande_div = document.getElementsByClassName("liste_contact")[0].children; 
    for(var i = 0; i < grande_div.length; i++){
        if (grande_div[i].getAttribute("style").search("block") != -1){
            var idName = grande_div[i].id;
            var paragraphes = document.querySelectorAll("#" + idName + " p");
            console.log(paragraphes)
            for(var i = 0; i < paragraphes.length; i++){
                if(paragraphes[i].innerHTML.search(recherche) == -1){
                    var parentN = paragraphes[i].parentNode.parentNode;
                    parentN.setAttribute("style", "display: none;")
                }
        
            }
        }
    }
    document.getElementById("recherche").value = "";
    /*var paragraphes = document.querySelectorAll("#liste_mr p");
    for(var i = 0; i < paragraphes.length; i++){
        if(paragraphes[i].innerHTML.search(recherche) == -1){
            var parentN = paragraphes[i].parentNode.parentNode;
            parentN.setAttribute("style", "display: none;")
        }

    }*/
}

function newContact(){
    nomContact = document.getElementById("name_contact").value;
    //generer la clé publique
    crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048, // can be 1024, 2048 or 4096
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: {name: "SHA-256"} // or SHA-512
        },
        true,
        ["encrypt", "decrypt"]
    ).then( function(keyPair) {
        /* now when the key pair is generated we are going
           to export it from the keypair object in pkcs8
        */
        window.crypto.subtle.exportKey(
            "pkcs8",
            keyPair.publicKey
        ).then(function(exportedPublicKey) {
            // converting exported private key to PEM format
            var pem = addNewLines(arrayBufferToBase64(exportedPublicKey));
            console.log(pem);
        }).catch(function(err) {
            console.log(err);
        }); 
    });
    div_contact = document.createElement("div");
    div_contact.setAttribute("class", "contact");
    lien = document.createElement("a");
    lien.setAttribute("href", "#");
    lien.setAttribute("class", "lien");
    div_contact.appendChild(lien);
    icone = document.createElement("i");
    icone.setAttribute("class", "fa fa-user");
    icone.setAttribute("aria-hidden", "true");
    lien.appendChild(icone);
    paragraphe = document.createElement("p");
    paragraphe.innerHTML = nomContact;
    lien.appendChild(paragraphe);
    document.getElementById("liste_contact").appendChild(div_contact);
    console.log(div_contact.innerHTML);
    document.getElementById("name_contact").value = "";
}

function newMessage(){

}

function clickDiv(id_DIv){
    document.querySelector(".Message h1").innerHTML = document.querySelector("#" + id_DIv + " h4").innerHTML;
    document.querySelector(".Message p").innerHTML = document.querySelector("#" + id_DIv + " p").innerHTML;
}

function arrayBufferToBase64(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var byteString = '';
    for(var i=0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }
    var b64 = window.btoa(byteString);

    return b64;
}

function addNewLines(str) {
    var finalString = '';
    while(str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }

    return finalString;
}



