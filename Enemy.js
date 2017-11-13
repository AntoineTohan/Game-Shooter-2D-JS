// Function qui crée des valeurs différentes et aléatoire pour chaque ennemis qui apparait toutes les 2 secondes
//Variable Tableau qui gère le nombre d'ennemis présent sur la map
var EnemyTab = [];
var i = EnemyTab.length;
var ii = EnemyTab.length;
function drawEnnemi() {


        // Condition pour réduire le temps d'appariton des ennemis selon
         if(score >= 10000) {
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 400);
        }else if(score >= 9000) {
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 500);
        }else if(score >= 8000) {
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 600);
        }else if(score >= 7000) {
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 700);
        }else if(score >= 6000) {
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 800);
        }else if(score >= 5000) {
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 900);
        }else if (score >= 4000){
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 1000);
        }else if (score >= 3000){
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 1100);
        }else if (score >= 2000){
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 1250);
        }else if(score >= 1000){
            clearInterval(gameOver2);
            gameOver2 = setInterval(drawEnnemi, 1500);
        }

            i = i+1;
            var canevas = document.getElementById('Canvas');
            var colors = ["#673AB7", "#B388FF", "#3F51B5", "#6200EA", "#3D5AFE", "#0D47A1", "#29B6F6", "#2E7D32", "#00E676", "#EEFF41", "#C0CA33", "#F57F17", "#FFA000", "#FFC400", "#E65100", "#FF3D00", "#424242", "#FF8A65", "#FFE0B2", "#FBC02D"];
            var numColors = colors.length;
            var xPos = Math.random() * canevas.width;
            var yPos = Math.random() * canevas.height;
            var rayonEnnemi = 10 + (Math.random() * (20 - 10));
            var colorIndex = Math.random() * (numColors - 1);
            colorIndex = Math.round(colorIndex);
            var color = colors[colorIndex];
            exist = false;

            enem = new Circle(i, xPos, yPos, rayonEnnemi, color, exist);
            EnemyTab.push(enem);
            //Funtion qui change la valeur exist qui permet de savoir si la colision entre cet ennemi et le player est possible (1.5sec d'invicibilité a l'apparition d'un ennemis en tps réel )
            setTimeout(function(){ EnemyTab[ii].exist = true; }, 300);
            // console.log(EnemyTab);


}

// fonction qui gère l'apparition des ennemis mais aussi  leurs mouvements avec une mise a jours chaque 10 milisecondes
function updateEnemy() {
    var canevas = document.getElementById('Canvas');
    ctx = canevas.getContext('2d');

    for(var i = 0; i < EnemyTab.length; i++){
        ctx.beginPath();
        ctx.arc(EnemyTab[i].x, EnemyTab[i].y, EnemyTab[i].r, 0, Math.PI*2);
        ctx.fillStyle = EnemyTab[i].color;
        ctx.fill();


        // Condition de suivi du Player
        if(EnemyTab[i].x > posx && EnemyTab[i].y > posy  ){
            EnemyTab[i].x -= 1.3;
            EnemyTab[i].y -= 1.3;
        }
        if(EnemyTab[i].x > posx && EnemyTab[i].y < posy  ){
            EnemyTab[i].x -= 1.3;
            EnemyTab[i].y += 1.3;
        }
        if(EnemyTab[i].x < posx && EnemyTab[i].y > posy  ){
            EnemyTab[i].x += 1.3;
            EnemyTab[i].y -= 1.3;
        }
        if(EnemyTab[i].x < posx && EnemyTab[i].y < posy  ){
            EnemyTab[i].x += 1.3;
            EnemyTab[i].y += 1.3;
        }

    }

}

// Fonction Ennemy Object qui permet de gere les ennemeis comme des objets !
function Circle(id,x, y, r,color,exist) {
    "use strict";
    this.id = (x === null) ? 0 : id;
    this.x = (x === null) ? 0 : x;
    this.y = (y === null) ? 0 : y;
    this.r = (r === null) ? 0 : r;
    this.color = (r === null) ? 0 : color;
    this.exist = (r === null) ? 0 : exist;
}
