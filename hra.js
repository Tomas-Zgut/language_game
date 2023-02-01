const fs = require('fs');


//Funkcia na nahodne poprehadzovanie poloziek v 'array'. 
function randomizeArr(array) {
    let rndIndex;
    let currIndex = array.length;

    while(currIndex != 0) {
        rndIndex = Math.floor(Math.random() * currIndex);
        currIndex --;
        [array[currIndex], array[rndIndex]] = [array[rndIndex], array[currIndex]];  
        
    }
    return array;
}


function filArr(array) {
    for (let i = 0; i < cardsData.length; i++) {
        array[i] = i;
    }
    return array;
}

//Funkcia zabezpecujuca ukazanie nasledujucej napovedy
function showClue(card) {
    if (clueCnt <= 0) {
        console.log("done");
    }

    console.log(card.clues[5 - clueCnt]);
    clueCnt --;

}

//Funkcia zabezpecujuca prejdenie na nasledujucu kartu
function nextCard() {
    if (idx + 1 >= cardsData.length) {
        return
    }

    clueCnt = 5;
    idx ++;
}
//Funkcia na resetovanie hry, aby sa dala hrat znova
function resetGame() {
    idx = 0
    clueCnt = 5;
    livesCnt = 3;

    randomizeArr(arr);
}

let idx;
let clueCnt;
let livesCnt;

let arr = []; //'arr' je pole indexov kariet v 'cards_data'; pri nahodnom prehadzovani sa kopiroju len indexy a nie cele objekty
let cardsData = eval(fs.readFileSync('cards.JSON', 'utf-8',(err,inputD) => {if (err) throw err})); 

//zaciatok hry
filArr(arr);
resetGame();



for (let i = 0; i < arr.length; i ++){
    for (let j = 0; j < 5; j ++) {
        showClue(cardsData[arr[idx]],j);
    }
    nextCard();
}


