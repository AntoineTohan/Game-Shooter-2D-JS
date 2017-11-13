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
var score = 0;
// Fonction pour traquer la position du curseur de la souris sur la page
// Sers aussi tjrs tracer et calculer le vecteur entre le centre du player et le curseur de la souris
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
    gameOver2 = setInterval(drawEnnemi, 1750);
    gameOver = setInterval(Gameloop, 10);
}

// Fonction Gameloop est le jeu en lui même c'est tune fonction executer en boucle toute les 10 milième de secondes
function Gameloop(){
    // console.log(keyState);

    // La ligne ci dessous permet de clear tous le Canevas pour ne pas afficher les positions précédente de notre Player
    ctx.clearRect(0, 0, canevas.width, canevas.height);
    ctx.save();
    createPlayer();
    updateEnemy();

    // Conditions qui lise la positon en cours du Player et qui ne lui permette pas de ce déplacer hors du cadre de jeu
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


    var canvas = document.getElementById("Canvas");
    var ctx2 = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;

    // Condition d'écoute si la souris est clicker alors start = true donc on ajoute des tirs dans le tableau afin de les afficher
    if (started) {
        shots.push(new Shot(mouseX, mouseY, dx, dy));
    }

    //Deuxième tableau de tir qui compte le nom bre detir ACTIF sur la map (qui ne sont pas encore sorti du cadre)
    var a = [];

    for (var i = 0; i < shots.length; i++) {

        // Ajout des tirs dans le tableau tirs
        var shot = shots[i];

        // Faire bouger les tirs
        shot.x += shot.dx;
        shot.y += shot.dy;

        //Si le tirs n'est pas encore sorti des bordures de la maps on le laisse dans le tableau a
        if (shot.x >= 0 && shot.x <= cw && shot.y > 0 && shot.y <= ch) {
            a.push(shot);
            shot.display();
        }
    }

    // Si le tirs sors des bordures de la map in le supprime du tableau a
    if (a.length < shots.length) {
        shots.length = 0;
        Array.prototype.push.apply(shots, a);
    }



    //Boucle d'écoute pour la collisions des tirs et des Ennemis
    for (var i = 0; i < a.length; i++) {
        for (var y = 0; y < EnemyTab.length; y++) {
            var decX = shot.x - EnemyTab[y].x;
            var decY = shot.y - EnemyTab[y].y;
            var distance = Math.sqrt(decX * decX + decY * decY);
            if (distance < 3 + EnemyTab[y].r) {
                EnemyTab.splice(y,1);
                score += 100;
            }
        }
    }

    // Ici on gère les collisions entre le Player et tous les ennnemis
    for (var i = 0; i < EnemyTab.length; i++) {
        if(EnemyTab[i].exist == true) {
            var decX = EnemyTab[i].x - posx;
            var decY = EnemyTab[i].y - posy;
            var distance = Math.sqrt(decX * decX + decY * decY);

            if (distance < rayonPlayer + EnemyTab[i].r) {
                clearInterval(gameOver);
                clearInterval(gameOver2);
                ctx.clearRect(0, 0, canevas.width, canevas.height);
                ctx.fillStyle = "black";
                ctx.font = "60px Arial";
                ctx.fillText("Game Over ! ", 402, 334);
                shots = [];
            }
        }
    }
}

// _________________________________________________________________________________________________________________________________
// Librairie de fonctions Dessin Player et Canvas
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

    getVariable();
}
// _____________________________________________________________________________________________________________________________________
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
// Librairie de fonctions qui gère les transitions et affichages de la page
function CloseAllAffichage(){
    closeAffichageAlert();
    closeAffichageButton();
    afficherButtonRetour();
    afficherScore();
    var t = setInterval(function() {
        document.getElementById("display").innerHTML = score;
    }, 500);
}

//Foncton qui permet de fermer les alertes CSS dans le menu
function closeAffichageAlert(){
    let close = document.getElementsByClassName("closebtn");
    let i;

    for (i = 0; i < close.length; i++) {
            var div =  close[i].parentElement;
            div.style.opacity = "0";
            setTimeout(function(){ div.style.display = "none"; }, 600);
        }
}
// Fonction qui permet de fair disparaitre le boutton pour démarrer le jeu
function closeAffichageButton(){
        let close = document.getElementById("start");
        setTimeout(function(){ close.style.display = "none"; }, 100);
}

//Fonction qui permet de d'afficher un boutton retour
function afficherButtonRetour(){
    document.getElementById('start')
        .insertAdjacentHTML('beforebegin',
            '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ' +
            'id="buttonRetour" style="position: relative; float: left;">RETOUR</button>');

    document.getElementById('buttonRetour').addEventListener('click', function() {
        location.reload();
    }, false);
}

//Fonction pour afficher le score
function afficherScore(){
    document.getElementById('start')
        .insertAdjacentHTML('beforebegin',
            '<div id="display"></div>');
}
