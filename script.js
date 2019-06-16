/**
* Vérifie les déplacement du carré et s'assure que le carré ne sorte pas de la grille
*/
function checkStepOnGrid(step) {        
    if (step === 5 ) {
        step = 0;
    } 
    if (step === -1) {        
        step = 4;
    }
    return step;
}


/**
* Tue l'énnemi en supprimant la classe "enemy"
*/
function killEnemy(line, column) {

    var potentialEmeny = $(`[data-line="${line}"][data-column="${column}"]`);

    if ( $(potentialEmeny).hasClass("enemy") ) {        
        $(potentialEmeny).removeClass('enemy');
        return true;
    }
    return false;
}


/**
* Régénère l'énnemi dans une case où celui-ci n'est pas présent
*/
function regenerateEmeny() {
    var randomLine = Math.floor(Math.random() * 5);
    var randomColumn = Math.floor(Math.random() * 5);

    if ( !$(`[data-line="${randomLine}"][data-column="${randomColumn}"]`).hasClass('enemy') ) {
        !$(`[data-line="${randomLine}"][data-column="${randomColumn}"]`).addClass('enemy');
    } else {
        regenerateEmeny();
    }   
}


/*
* Fais bouger les coordonnées du carré donné en argument
*/
function move(event, square) {

    // repère la position actuelle du carré rouge depuis l'argument @param square
    var currentLine = $(square).attr('data-line');
    var currentColumn = ($(square).attr('data-column'));

    // modifie la position actuelle du carré rouge
    switch (event.key) {

        case "ArrowUp":
            currentLine--;
            break;

        case "ArrowDown":
            currentLine++;
            break;

        case "ArrowLeft":
            currentColumn--;
            break;

        case "ArrowRight":
            currentColumn++;
            break;

        default:
            // dont do anything
            break;
    }

    return {
        column : currentColumn, 
        line : currentLine
    };
}



/**
* Déroule le scénario du jeu
* @param square est le carré que l'on souhaite faire bouger, celui-ci est "tagué" d'une classe .selected
* @param event est l'évenement émit par un keypress
*/
function playGame(event, square) {
    
    // calcule la nouvelle position du carré à partir de sa position actuelle
    var coordinates = move(event, square);
    var currentLine = coordinates.line;
    var currentColumn = coordinates.column;

    // supprime le carré rouge afin de pouver le replacer ailleurs
    $(square).removeClass('selected');

    // vérifie que le futur emplacement du carré rouge ne sorte pas de la grille
    currentLine = checkStepOnGrid(currentLine);
    currentColumn = checkStepOnGrid(currentColumn);

    // replace a nouveau le carré rouge
    $(`[data-line="${currentLine}"][data-column="${currentColumn}"]`).addClass('selected');

    // tue l'ennemi et le regénérer ailleurs si il y a collision entre ennemi et carré rouge
    if ( killEnemy(currentLine, currentColumn) ) {
        regenerateEmeny();
    }
}


// ... déroulement
$(document).on('keydown', (event) => { 
    // on séléectionne le carré rouge
    var redsquare = $('.selected');
    console.log(event.key);
    

    // et on joue au jeu
    playGame(event, redsquare);
});
