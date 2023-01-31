const fs = require('fs');


//Funkcia na nahodne poprehadzovanie poloziek v 'array'. 
function arrRandomizer(array) {
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
    for (let i = 0; i < cards_data.length; i++) {
        array[i] = i;
    }
    return array;
}

//Funkcia zabezpecujuca ukazanie nasledujucej napovedy
function show_clue(card) {
    if (clueCnt <= 0) {
        console.log("done");
    }

    console.log(card.clues[5 - clueCnt]);
    clueCnt --;

}

//Funkcia zabezpecujuca prejdenie na nasledujucu kartu
function next_card() {
    if (idx + 1 >= cards_data.length) {
        return
    }

    clueCnt = 5;
    idx ++;
}
//Funkcia na resetovanie hry, aby sa dala hrat znova
function resetGame() {
    idx = 0
    clueCnt = 5;
    lives = 3;

    arrRandomizer(arr);
}

let idx;
let clueCnt;
let lives;

let arr = []; //'arr' je pole indexov kariet v 'cards_data'; pri nahodnom prehadzovani sa kopiroju len indexy a nie cele objekty
let cards_data = eval(fs.readFileSync('cards.JSON', 'utf-8',(err,inputD) => {if (err) throw err})); 

//zaciatok hry
filArr(arr);
resetGame();



for (let i = 0; i < arr.length; i ++){
    for (let j = 0; j < 5; j ++) {
        show_clue(cards_data[arr[idx]],j);
    }
    next_card();
}


