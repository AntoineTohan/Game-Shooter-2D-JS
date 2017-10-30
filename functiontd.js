// Fonction d'affichage Javascript : Gère la bouton close des alertes en CSS
// LAISSER EN DEHORS DES FONCTIONCS PAS TOUCHE LES MECS MERCI
var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
}





// Fonction Main la fonction principlae de l'application
function Main() {
    CloseAllAffichage();
    draw();
    createcircle();
}


// Librairie de fonctions Dessin affichage etc ...
function draw(){
    var map = document.createElement('canvas');

    map.id = "Canvas";
    map.width = 1124;
    map.height = 668;
    map.style.zIndex = 8;
    map.style.position = "absolute";
    map.style.border = "1px solid";


    var body = document.getElementsByTagName("body")[0];
    body.appendChild(map);
}

function createcircle() {
    var canevas = document.getElementById('Canvas');
    if (canevas.getContext) {
        var ctx = canevas.getContext('2d');
        var cercle = new Path2D();
        cercle.arc(100, 35, 5, 0, 2 * Math.PI);
        ctx.fill(cercle);
    }
}






// Librairie de fonctions qui gère les transitions et affichages de la page
function CloseAllAffichage(){
    closeAffichageAlert();
    closeAffichageButton();
}
function closeAffichageAlert(){
    let close = document.getElementsByClassName("closebtn");
    let i;

    for (i = 0; i < close.length; i++) {
            var div =  close[i].parentElement;
            div.style.opacity = "0";
            setTimeout(function(){ div.style.display = "none"; }, 600);
        }
}

function closeAffichageButton(){
        let close = document.getElementById("start");
        setTimeout(function(){ close.style.display = "none"; }, 400);
}
function afficherButtonRetour(){

}

