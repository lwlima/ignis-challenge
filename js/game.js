let teamList;
let tableGame;
let tableRound;
let championDiv;
let tableRoundTemp;
let tableGameTemp;
let teamChampion;
let listLength;
let stop;
let msgError;

function reset(){
    teamList = document.getElementById("data").value.split("\n");
    tableGame = document.getElementById("game-table");
    tableRound = document.getElementById("game-round");
    championDiv = document.getElementById("champion");
    msgError = document.getElementById("msg-error");


    if(teamList.length === 1 && (teamList.Length%2 != 0)){
        msgError.innerHTML = `<div class="col-12 alert alert-danger mx-auto" role="alert">Entrada de dados não pode ser vazia e impar</div>`;
    }else{
        msgError.innerHTML = "";    
        for(i = 0; i< teamList.length; i++){
            teamList[i] = teamList[i].trim().split(";");
            teamList[i][2] = 0; //pontuação dos times
        }

        listLength = teamList.length-1;
        stop = teamList.length/2;

        tableGame.innerHTML = "";
        tableRound.innerHTML = "";

        makeTable();
    }
}

// criando tabela de jogos de ida
function makeTable() {
    let tableGameTemp = tableGame.innerHTML;
    tableGame.innerHTML = `<li><h2>Tabela de jogos</h2></li> <li><h3> Turno de ida </h3></li>`;
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

//criando tabela de jogos de volta
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

    makeRound();
}

// criando os rounds de ida
function makeRound() {
    tableRoundTemp = tableRound.innerHTML;
    tableRound.innerHTML = `<li><h2>Tabela Resultados</h2></li><li><h3> Turno de ida </h3></li>`;

    for(let round=1; round<=listLength; round++){
        tableRoundTemp = tableRound.innerHTML;
        tableRound.innerHTML = `${tableRoundTemp} <li><h4> Rodada ${round}</h4></li>`;

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

// criando os rounds de volta
function makeRoundInverse() {
    tableRoundTemp = tableRound.innerHTML;
    tableRound.innerHTML = `${tableRoundTemp} <li><h3> Turno de volta </h3></li>`;

    for(let round=0; round<listLength; round++){
        let tableRoundTemp = tableRound.innerHTML;
        tableRound.innerHTML = `${tableRoundTemp}<li><h4> Rodada ${round+teamList.length}</h4></li>`;

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

// definindo placar de cada time
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

// selecionando o time vencedor do campeonato
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

// Gerar resultando randomico das partidas
function randomResult() {
    min = Math.ceil(0);
    max = Math.floor(10);
    return Math.floor(Math.random() * (max - min)) + min;
}

//trocar posições dos times na tabela para efetuar os matchs
function rotate(array){
    array.splice(1,0,array.pop());
}