let teamList = document.getElementById("data").value.split("\n");
let tableGame = document.getElementById("game-table");
let tableRound = document.getElementById("game-round");
let tableRoundTemp;
let tableGameTemp;
let teamChampion;

for(i = 0; i< teamList.length; i++){
    teamList[i] = teamList[i].trim().split(";");
    teamList[i][2] = 0; //pontuação dos times
}

let teamListTemp = teamList;
let listLength = teamListTemp.length-1;
let stop = teamListTemp.length/2;

makeTable();
makeRound();

function makeTable() {
    let tableGameTemp = tableGame.innerHTML;
    tableGame.innerHTML = tableGameTemp+"<li><h3> Turno de ida </h3></li>";
    for(let round=1; round<=listLength; round++){
        tableGameTemp = tableGame.innerHTML;
        tableGame.innerHTML = tableGameTemp+"<li><h4> Rodada "+round+"</h4></li>";
        rotate(teamListTemp);
        for(i=0; i<stop; i++){
            tableGameTemp = tableGame.innerHTML;
            tableGame.innerHTML = tableGameTemp+"<li>"+teamListTemp[i][0]+" vs "+teamListTemp[listLength-i][0]+" ("+teamListTemp[i][1]+")"+"</li>";
        }
    }
    makeTableInverse();
}

function makeTableInverse() {
    let tableGameTemp = tableGame.innerHTML;
    tableGame.innerHTML = tableGameTemp+"<li><h3> Turno de volta </h3></li>";

    for(let round=0; round<listLength; round++){
        tableGameTemp = tableGame.innerHTML;
        tableGame.innerHTML = tableGameTemp+"<li><h4> Rodada "+(round+teamListTemp.length)+"</h4></li>";
        rotate(teamListTemp);
        for(i=0; i<stop; i++){
            tableGameTemp = tableGame.innerHTML;
            tableGame.innerHTML = tableGameTemp+"<li>"+teamListTemp[listLength-i][0]+" vs "+teamListTemp[i][0]+" ("+teamListTemp[listLength-i][1]+")"+"</li>";
        }
    }
}

function makeRound() {
    let tableRoundTemp = tableRound.innerHTML;
    tableRound.innerHTML = tableRoundTemp+"<li><h3> Turno de ida </h3></li>";

    for(let round=1; round<=listLength; round++){
        tableRoundTemp = tableRound.innerHTML;
        tableRound.innerHTML = tableRoundTemp+"<li><h4> Rodada "+round+"</h4></li>";

        rotate(teamListTemp);
        for(i=0; i<stop; i++){
            let scoreOne = randomResult();
            let scoreTwo = randomResult();
            tableRoundTemp = tableRound.innerHTML;
            tableRound.innerHTML = tableRoundTemp+"<li>"+teamListTemp[i][0]+" vs "+teamListTemp[listLength-i][0]+" ("+teamListTemp[i][1]+")"+"</li>"
            +"<li>"+scoreOne+" - "+scoreTwo+"</li>";
            if(scoreOne > scoreTwo){
                teamListTemp[i][2] += 3;
            }
            else if(scoreTwo > scoreOne){
                teamListTemp[listLength-i][2] += 3;
            }
            else{
                teamListTemp[i][2] += 1;
                teamListTemp[listLength-i][2] += 1;
            }
        }
    }
    makeRoundInverse();
}

function makeRoundInverse() {
    let tableRoundTemp = tableRound.innerHTML;
    tableRound.innerHTML = tableRoundTemp+"<li><h3> Turno de volta </h3></li>";

    for(let round=0; round<listLength; round++){
        let tableRoundTemp = tableRound.innerHTML;
        tableRound.innerHTML = tableRoundTemp+"<li><h4> Rodada "+(round+teamListTemp.length)+"</h4></li>";

        rotate(teamListTemp);
        for(i=0; i<stop; i++){
            let scoreOne = randomResult();
            let scoreTwo = randomResult();
            tableRoundTemp = tableRound.innerHTML;
            tableRound.innerHTML = tableRoundTemp+"<li>"+teamListTemp[listLength-i][0]+" vs "+teamListTemp[i][0]+" ("+teamListTemp[listLength-i][1]+")"+"</li>"
            +"<li>"+scoreOne+" - "+scoreTwo+"</li>";

            if(scoreOne > scoreTwo){
                teamListTemp[listLength-i][2] += 3;
            }
            else if(scoreTwo > scoreOne){
                teamListTemp[i][2] += 3;
            }
            else {
                teamListTemp[i][2] += 1;
                teamListTemp[listLength-i][2] += 1;
            }
        }
    }

    champion();
}

function champion() {
    let over = 0;
    for(i=0; i<teamList.length; i++){
        if(teamList[i][2] > over){
            over = teamList[i][2];
            teamChampion = teamList[i][0];
        }
    }

    console.log("Campeão é o esporte clube "+ teamChampion);
}

function randomResult() {
    min = Math.ceil(0);
    max = Math.floor(10);
    return Math.floor(Math.random() * (max - min)) + min;
}

function rotate(array){
    array.splice(1,0,array.pop());
}