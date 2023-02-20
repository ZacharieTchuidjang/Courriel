function chargement(){
    var message_envoye = document.querySelector("#liste_me");
    var message_recu = document.querySelector("#liste_mr");
    var liste_contact = document.querySelector("#liste_contact");
    message_envoye.setAttribute("style", "display: none;");
    message_recu.setAttribute("style", "display: block;");
    liste_contact.setAttribute("style", "display: none;");
}

function click_Me(){
    var message_envoye = document.querySelector("#liste_me");
    var message_recu = document.querySelector("#liste_mr");
    var liste_contact = document.querySelector("#liste_contact");
    message_envoye.setAttribute("style", "display: block;");
    message_recu.setAttribute("style", "display: none;");
    liste_contact.setAttribute("style", "display: none;");
}

function click_Lc(){
    var message_envoye = document.querySelector("#liste_me");
    var message_recu = document.querySelector("#liste_mr");
    var liste_contact = document.querySelector("#liste_contact");
    message_envoye.setAttribute("style", "display: none;");
    message_recu.setAttribute("style", "display: none;");
    liste_contact.setAttribute("style", "display: block;");
}