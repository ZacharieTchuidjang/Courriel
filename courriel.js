
var message_envoye = document.querySelector("#liste_me");
var message_recu = document.querySelector("#liste_mr");
var liste_contact = document.querySelector("#liste_contact");
var div_list_message = document.querySelector(".Message");
var div_form_newMessage = document.querySelector(".Ecrire_un_Message");
var div_form_newContact = document.querySelector(".creer_contact");

var contacts = JSON.parse(localStorage.getItem("contacts"));
var messages = JSON.parse(localStorage.getItem("messages"));

if (contacts === null){
    localStorage.setItem("contacts", JSON.stringify([]));
}

if(messages === null){

    localStorage.setItem("messages", JSON.stringify([]));
}

function chargement(){
    setManyDisplayNOne([liste_contact, message_envoye, div_form_newMessage, div_form_newContact]);
    setManyDisplayBlock([message_recu, div_list_message])
    setManyDisplayBlock(message_recu.children)

    // chargement des contacts
    for(var i = 0; i < contacts.length; i++){
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
        paragraphe.innerHTML = contacts[i].nom;
        lien.appendChild(paragraphe);
        document.getElementById("liste_contact").appendChild(div_contact);
    }

    // chargement des messages

    for(var i = 0; i < messages.length; i++){
        div_contact = document.createElement("div");
        div_contact.setAttribute("class", "contact");
        lien = document.createElement("a");
        lien.setAttribute("href", "#");
        lien.setAttribute("class", "lien");
        lien.setAttribute("onclick", "clickDiv(id)");
        icone = document.createElement("i");
        icone.setAttribute("class", "fa fa-user");
        icone.setAttribute("aria-hidden", "true");
        lien.appendChild(icone);
        sous_div = document.createElement("div");
        titre = document.createElement("h4");
        titre.innerHTML = messages[i].nom;
        sous_div.appendChild(titre);
        lien.appendChild(sous_div);
        div_contact.appendChild(lien);
        paragraphe = document.createElement("p");
        paragraphe.innerHTML = messages[i].text;
        lien.appendChild(paragraphe);
        document.getElementById("liste_me").appendChild(div_contact);
    }
    
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
    setManyDisplayBlock(message_envoye.children)
}

function click_Lc(){
    setManyDisplayNOne([message_envoye, message_recu, div_form_newMessage, div_list_message]);
    setManyDisplayBlock([liste_contact, div_form_newContact]);
    setManyDisplayBlock(liste_contact.children)
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
            "spki",
            keyPair.publicKey
        ).then(function(exportedPublicKey) {
            // converting exported private key to PEM format
            var pem = addNewLines(arrayBufferToBase64(exportedPublicKey));
            console.log(pem);
            contacts.push({"nom": nomContact, "publicKey": pem});
            console.log(contacts);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            exemple = JSON.parse(localStorage.getItem("contacts"));
            console.log(exemple)
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
    document.getElementById("name_contact").value = "";

    return false;
}

function newMessage(){
    nom_dest = document.getElementById("name_dest").value;
    story = document.getElementById("story").value;
    div_contact = document.createElement("div");
    div_contact.setAttribute("class", "contact");
    lien = document.createElement("a");
    lien.setAttribute("href", "#");
    lien.setAttribute("class", "lien");
    lien.setAttribute("onclick", "clickDiv(id)");
    icone = document.createElement("i");
    icone.setAttribute("class", "fa fa-user");
    icone.setAttribute("aria-hidden", "true");
    lien.appendChild(icone);
    sous_div = document.createElement("div");
    titre = document.createElement("h4");
    titre.innerHTML = nom_dest;
    sous_div.appendChild(titre);
    lien.appendChild(sous_div);
    div_contact.appendChild(lien);
    paragraphe = document.createElement("p");
    paragraphe.innerHTML = story;
    lien.appendChild(paragraphe);
    document.getElementById("liste_me").appendChild(div_contact);
    document.getElementById("name_dest").value = "";

    messages.push({"nom": nom_dest, "text": story});
    console.log(messages);
    localStorage.setItem("messages", JSON.stringify(messages));
    exemple = JSON.parse(localStorage.getItem("messages"));
    console.log(exemple)


    return false;

}

function clickDiv(id_DIv){
    document.querySelector(".Message h1").innerHTML = document.querySelector("#" + id_DIv + " h4").innerHTML;
    document.querySelector(".Message p").innerHTML = document.querySelector("#" + id_DIv + " p").innerHTML;
}

function arrayBufferToBase64(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    console.log(byteArray);
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

function toString(objet){
    return "nom : " + objet.nom + "publicKey :" + objet.publicKey;
}

