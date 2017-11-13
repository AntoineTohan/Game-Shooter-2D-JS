// PAS TOUCHE A CES VARIABLE GLOBALE LES FRRS MERCI
// EN FAIRE UNE CLASSE
// Variable de déplacement / position / carctéristique
var posx = 562;
var posy = 334;
var depx = 3;
var depy = 3;
var rayonPlayer = 10;

function createPlayer() {

    // Création du Player
    // Deux étapes la première le cercle et ensuite la canon qui poiinte sur le curseur de la souris
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