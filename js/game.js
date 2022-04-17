let teamList = document.getElementById("data").value.split("\n");
let tableGame = document.getElementById("game-table");
let tableRound = document.getElementById("game-round");
let championDiv = document.getElementById("champion");
let tableRoundTemp;
let tableGameTemp;
let teamChampion;

for(i = 0; i< teamList.length; i++){
    teamList[i] = teamList[i].trim().split(";");
    teamList[i][2] = 0; //pontuação dos times
}

let listLength = teamList.length-1;
let stop = teamList.length/2;

makeTable();
makeRound();

function makeTable() {
    let tableGameTemp = tableGame.innerHTML;
    tableGame.innerHTML = tableGameTemp+"<li><h3> Turno de ida </h3></li>";
    for(let round=1; round<=listLength; round++){
        tableGameTemp = tableGame.innerHTML;
        tableGame.innerHTML = tableGameTemp+"<li><h4> Rodada "+round+"</h4></li>";
        rotate(teamList);
        for(i=0; i<stop; i++){
            tableGameTemp = tableGame.innerHTML;
            tableGame.innerHTML = `${tableGameTemp} <li><img src="img/${teamList[i][0]}.svg" width="35px alt="Esporte Clube 
            ${teamList[i][0]}"> ${teamList[i][0]} vs ${teamList[listLength-i][0]} <img src="img/${teamList[listLength-i][0]}.svg" 
            width="35px" alt="Esporte Clube ${teamList[listLength-i][0]}"> - ${teamList[i][1]}</li>`
        }
    }
    makeTableInverse();
}

function makeTableInverse() {
    let tableGameTemp = tableGame.innerHTML;
    tableGame.innerHTML = tableGameTemp+"<li><h3> Turno de volta </h3></li>";

    for(let round=0; round<listLength; round++){
        tableGameTemp = tableGame.innerHTML;
        tableGame.innerHTML = tableGameTemp+"<li><h4> Rodada "+(round+teamList.length)+"</h4></li>";
        rotate(teamList);
        for(i=0; i<stop; i++){
            tableGameTemp = tableGame.innerHTML;
            tableGame.innerHTML = `${tableGameTemp} <li><img src="img/${teamList[listLength-i][0]}.svg" width="35px alt="Esporte Clube 
            ${teamList[listLength-i][0]}"> ${teamList[listLength-i][0]} vs ${teamList[i][0]} <img src="img/${teamList[i][0]}.svg" 
            width="35px" alt="Esporte Clube ${teamList[i][0]}"> - ${teamList[listLength-i][1]}</li>`
        }
    }
}

function makeRound() {
    let tableRoundTemp = tableRound.innerHTML;
    tableRound.innerHTML = tableRoundTemp+"<li><h3> Turno de ida </h3></li>";

    for(let round=1; round<=listLength; round++){
        tableRoundTemp = tableRound.innerHTML;
        tableRound.innerHTML = tableRoundTemp+"<li><h4> Rodada "+round+"</h4></li>";

        rotate(teamList);
        for(i=0; i<stop; i++){
            let scoreOne = randomResult();
            let scoreTwo = randomResult();
            tableRoundTemp = tableRound.innerHTML;

            tableRound.innerHTML = `${tableRoundTemp} <li><img src="img/${teamList[i][0]}.svg" width="35px alt="Esporte Clube 
            ${teamList[i][0]}"> ${teamList[i][0]} ${scoreOne} - ${scoreTwo} ${teamList[listLength-i][0]} <img src="img/${teamList[listLength-i][0]}.svg" 
            width="35px" alt="Esporte Clube ${teamList[listLength-i][0]}"> - ${teamList[i][1]}</li>`

            scoreBoard(scoreOne, scoreTwo, false);
        }
    }
    makeRoundInverse();
}

function makeRoundInverse() {
    let tableRoundTemp = tableRound.innerHTML;
    tableRound.innerHTML = tableRoundTemp+"<li><h3> Turno de volta </h3></li>";

    for(let round=0; round<listLength; round++){
        let tableRoundTemp = tableRound.innerHTML;
        tableRound.innerHTML = tableRoundTemp+"<li><h4> Rodada "+(round+teamList.length)+"</h4></li>";

        rotate(teamList);
        for(i=0; i<stop; i++){
            let scoreOne = randomResult();
            let scoreTwo = randomResult();
            tableRoundTemp = tableRound.innerHTML;

            tableRound.innerHTML = `${tableRoundTemp} <li><img src="img/${teamList[listLength-i][0]}.svg" width="35px alt="Esporte Clube 
            ${teamList[listLength-i][0]}"> ${teamList[listLength-i][0]} ${scoreOne} - ${scoreTwo} ${teamList[i][0]} <img src="img/${teamList[i][0]}.svg" 
            width="35px" alt="Esporte Clube ${teamList[i][0]}"> - ${teamList[listLength-i][1]}</li>`

            scoreBoard(scoreOne, scoreTwo, true);
        }
    }

    champion();
}

function scoreBoard(scoreOne, scoreTwo, inverse) {
    if(inverse === true){
        if(scoreOne > scoreTwo){
            teamList[listLength-i][2] += 3;
        }
        else if(scoreTwo > scoreOne){
            teamList[i][2] += 3;
        }
        else {
            teamList[i][2] += 1;
            teamList[listLength-i][2] += 1;
        }
    } else {
        if(scoreOne > scoreTwo){
            teamList[i][2] += 3;
        }
        else if(scoreTwo > scoreOne){
            teamList[listLength-i][2] += 3;
        }
        else{
            teamList[i][2] += 1;
            teamList[listLength-i][2] += 1;
        }
    }
}

function champion() {
    let over = 0;
    for(i=0; i<teamList.length; i++){
        if(teamList[i][2] > over){
            over = teamList[i][2];
            teamChampion = teamList[i][0];
        }
    }

    championDiv.innerHTML = `<img width="100px" src="img/${teamChampion}.svg" alt="Esporte Clube ${teamChampion}"><h1><img style="display: inline-block;" width="100px" src="img/trofeu.png" alt="trofeu"> ${teamChampion} É CAMPEÃO 
    <img style="display: inline-block;" width="100px" src="img/trofeu.png" alt="trofeu"></h1>`;
}

function randomResult() {
    min = Math.ceil(0);
    max = Math.floor(10);
    return Math.floor(Math.random() * (max - min)) + min;
}

function rotate(array){
    array.splice(1,0,array.pop());
}