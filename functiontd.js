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

// Tableau et fonction qui écoute si une touche est pressée ou pas (Up down)
// Le tableau contient la valeur ascii de la touche pressées Le tableau nous permet de gérer les diagonales mais aussi de réduire le delais
// lors d'une touche pressée
var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

// Variable d'angle et de calcul de la positin de la souris sur l'écran
var posCX;
var posCY;
var posCanonX;
var posCanonY;
var angleRadians;
var angleDeg;

// Fonction pour traquer la position du curseur de la souris sur la page
function positionSouris(event) {
    var canvas = document.getElementById("Canvas");
    if(canvas != null) {
        posCX = event.clientX;
        posCY = event.clientY;

        posCX -= canvas.offsetLeft;
        posCY -= canvas.offsetTop;

        // console.log('Coordonnées de la souris : X = ' + posCX + ' Y = ' + posCY);
        // angle en radians
        angleRadians = Math.atan2(posCY - posy  ,  posCX- posx) - 0.7;
        // angle  en degrees
        angleDeg = Math.atan2(posCY - posy, posCX- posx) * 180 / Math.PI;
        // console.log("Radian : " + angleRadians + '     degrees : '+ angleDeg);
    }
}




// _____________________________________________________________________________________________________________________________
// Fonction Main la fonction principlae de l'application
function Main() {
    CloseAllAffichage();
    drawCanvas();
    createPlayer();
    setInterval(Gameloop, 10);
}

// Fonction Gameloop est le jeu en lui même c'est tune fonction executer en boucle toute les 10 milième de secondes
function Gameloop(){

    // console.log(keyState);

    // La ligne ci dessous permet de clear tous le Canevas pour ne pas afficher les positions précédente de notre Player
    ctx.clearRect(0, 0, canevas.width, canevas.height);
    ctx.save();
    createPlayer();

    // Conditions qui lise la possiton en cours du PLayer et qui ne lui permette pas de ce déplacer hors du cadre de jeu
    if(posx + depx < rayonPlayer || posx + depx < rayonPlayer) {
        posx = (rayonPlayer);
    }
    if(posx + depx > canevas.width-rayonPlayer || posx + depx < rayonPlayer) {
        posx = canevas.width-rayonPlayer;;
    }
    if(posy + depy < rayonPlayer || posy + depy < rayonPlayer) {
        posy = (rayonPlayer);
    }
    if(posy + depy > canevas.height-rayonPlayer || posy + depy < rayonPlayer) {
        posy = canevas.height-rayonPlayer;
    }

    // Fonction de déplacement lié aux fonction d écoute des touches plus haut
    // Ici on fait des ajout et des soustractions de pixels dans le canvas
    if (keyState[37]){
        posx -= depx;
    }
    if (keyState[38]){
        posy -= depy;
    }
    if (keyState[39]){
        posx += depx;
    }
    if (keyState[40]){
        posy += depy;
    }
}


// _________________________________________________________________________________________________________________________________
// Librairie de fonctions Dessin
function drawCanvas(){
    var map = document.createElement('canvas');

    map.id = "Canvas";
    map.width = 1124;
    map.height = 668;
    map.style.zIndex = 8;
    map.style.position = "absolute";
    map.style.border = "1px solid";
    map.style.background="#F5F5F5";


    var body = document.getElementsByTagName("body")[0];
    body.appendChild(map);
}

// PAS TOUCHE A CES VARIABLE GLOBALE LES FRRS MERCI
// Variable de déplacement / position / carctéristique
var posx = 562;
var posy = 334;
var depx = 3;
var depy = 3;
var rayonPlayer = 10;

function createPlayer() {

    // Création du Player
    canevas = document.getElementById('Canvas');
    if (canevas.getContext) {
        ctx = canevas.getContext('2d');
        cercle = new Path2D();
        ctx.beginPath();
        cercle.arc(posx, posy, rayonPlayer, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle="#5C6BC0";
        ctx.fill(cercle);

        ctx.translate(posx, posy);
        ctx.rotate(angleRadians) ;
        ctx.translate(-posx, -posy);
        ctx.beginPath();
        ctx.moveTo(posx,posy);
        ctx.lineWidth=8;
        ctx.lineCap='round';
        ctx.lineTo(posx + rayonPlayer +2  , posy+ rayonPlayer +2 );
        ctx.strokeStyle = '#5C6BC0';
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}









// _____________________________________________________________________________________________________________________________________
// Librairie de fonctions qui gère les transitions et affichages de la page
function CloseAllAffichage(){
    closeAffichageAlert();
    closeAffichageButton();
    afficherButtonRetour();
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
        setTimeout(function(){ close.style.display = "none"; }, 100);
}
function afficherButtonRetour(){
    document.getElementById('start')
        .insertAdjacentHTML('beforebegin',
            '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ' +
            'id="buttonRetour" style="position: relative; float: left;">RETOUR</button>');

   // Une autre méthode avec plus de contrainte de crée ce button

    // var button = document.createElement('button');
    // button.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent";
    // button.innerHTML = "RETOUR";
    // button.id = "buttonRetour"
    // button.style.position = "relative";
    // button.style.float = "left";
    // document.getElementsByTagName('body')[0].appendChild(button);

    document.getElementById('buttonRetour').addEventListener('click', function() {
        location.reload();
    }, false);
}