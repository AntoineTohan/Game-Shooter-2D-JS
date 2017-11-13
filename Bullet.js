//Fichier qui gère les tirs du Player
//Variable qui sont utile pour les tirs (positionnenement etc ... )
function getVariable() {
    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var bb = canvas.getBoundingClientRect();
    var offsetX = bb.left;
    var offsetY = bb.top;

    // Fonction d'écoute pour le lancement de la function de tir Si TRUE on tir en continu si FALSE on arrête de tirer
    canvas.onmousedown = function (e) {
        started = true;
        //SetTimeOut pour gérer une séquance prédéfini de tir (tir de 100ms environs 7-8 projectiles)
        setTimeout(function(){ started = false; }, 100);
        setFirePosition(e);
    }
    canvas.onmouseup = function (e) {
        started = false;
    }
}

// vars related to firing position and Shot(s)
var started, mouseX, mouseY, dx, dy;
//Tableau des tirs
var shots = []

//Object qui contient les positions des tirs
function Shot(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}
Shot.prototype.display = function () {
    // Dessiner le tir sur le Canvas
    ctx.fillRect(this.x, this.y, 3, 3);
    ctx.fillStyle = "black";
}


// On défini la positions du prochains tirs départ et direction
function setFirePosition(e) {

    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var bb = canvas.getBoundingClientRect();
    var offsetX = bb.left;
    var offsetY = bb.top;
    ctx.fillStyle = "blue";

    //Position de départ des tir et trajectoire des tirs ( Vitesse de projectile dépend de la position du curseur + le curseur est loin du player plus le tir est précis
    //  et puissant plus il est proche plus il est approximatif et lent
    mouseX = posx;
    mouseY = posy;
    dx =  ((posCX - posx)/45)*1.1;
    // console.log(dx);
    dy =  ((posCY - posy)/45)*1.1;
    // console.log(dy);
}