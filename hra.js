import cardsData from "./cards.JSON" assert {type: "json"};

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
function showClue() {
    if (clueCnt <= 1) {

        clueBtn.disabled = true;
    }

    clueSpace.innerHTML += `<br>${cardsData[arr[idx]].clues[5 - clueCnt]}`;
    clueCnt --;

}


//Funkcia zabezpecujuca prejdenie na nasledujucu kartu
function nextCard() {
    if (idx + 1 >= cardsData.length) {
        nextBtn.disabled = true;
        return
    }

    clueCnt = 5;

    clueBtn.disabled = false;
    nextBtn.disabled = true;
    clueSpace.innerHTML = "";
    answerIn.value  = "";

    idx ++;
    showClue();

}


function checkAnswr() {
    if (answerIn.value != cardsData[arr[idx]].answer) {
        livesCnt --;
        livecnter.innerHTML = livesCnt;
        if (livesCnt == 0) {
            endGame();
        }
        return;
    }

    let cardPoints = clueCnt + 1;
    points += cardPoints;
    console.log(points);
    nextBtn.disabled = false;


}


function endGame() {
    console.log(points);
    answerBtn.disabled = true;
    console.log("fuck");
    resetGame();
}


//Funkcia na resetovanie hry, aby sa dala hrat znova
function resetGame() {
    idx = -1
    clueCnt = 5;
    livesCnt = 3;
    points = 0;

    nextBtn.disabled = true;
    answerBtn.disabled = false;
    livecnter.innerHTML = livesCnt;
    randomizeArr(arr);
    nextCard();
}


let idx;
let points;
let clueCnt;
let livesCnt;

let arr = []; //'arr' je pole indexov kariet v 'cards_data'; pri nahodnom prehadzovani sa kopiroju len indexy a nie cele objekty

const clueBtn = document.getElementById("newClue");
const nextBtn = document.getElementById("nextCard");
const answerBtn = document.getElementById("sendAnswer");
const clueSpace = document.getElementById("Clues");
const answerIn = document.getElementById("answerInput");
const livecnter = document.getElementById("liveCounter");

clueBtn.addEventListener("click",showClue);
nextBtn.addEventListener("click",nextCard);
answerBtn.addEventListener("click",checkAnswr);

//zaciatok hry
filArr(arr);
resetGame();


// for (let j = 0; j < 5; j ++) {
//     showClue(cardsData[arr[idx]],j);
// }
    //nextCard();



