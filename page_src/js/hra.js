function loadFile(filePath) {
    let result = null;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
  }

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

//funkcia na paplnenie pomocneho pola
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

    clueSpace.innerHTML += `<li> ${cardsData[arr[idx]].clues[5 - clueCnt]} </li>`;
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
    answerBtn.disabled = false;
    nextBtn.disabled = true;
    clueSpace.innerHTML = "";
    answerIn.value  = "";

    idx ++;
    showClue();

}

//funkcia na skontrolovanie sprvnosti odpovede
function checkAnswr() {
    if (answerIn.value != cardsData[arr[idx]].answer) {
        livesCnt --;
        liveCnter.innerHTML = `${heartEmoji}${livesCnt}`;
        if (livesCnt == 0) {
            endGame();
        }
        return;
    }

    points += clueCnt + 1;
    
    pointCnter.innerHTML = points;
    answerBtn.disabled = true;
    clueBtn.disabled = true;

    if (idx + 1 < cardsData.length) {
        nextBtn.disabled = false;
    }
}


//funkcia na detekciu stlacenia enteru v input poli,vola checkAnswr()
function checkAnswrWrapper(event) {
    if (event.code == "Enter" || event.code == "NumpadEnter") {
        checkAnswr();
    }
}

//funkcia, ktora sa spusti po ukonceni hry
function endGame() {
    answerBtn.disabled = true;
    console.log(`gg ${points}`);
    //resetGame();
}


//Funkcia na resetovanie hry, aby sa dala hrat znova
function resetGame() {
    idx = -1
    clueCnt = 5;
    livesCnt = 3;
    points = 0;

    nextBtn.disabled = true;
    answerBtn.disabled = false;

    liveCnter.innerHTML = `${heartEmoji}${livesCnt}`;
    pointCnter.innerHTML = points;

    randomizeArr(arr);
    nextCard();
}

let idx;
let points;
let clueCnt;
let livesCnt;

let arr = []; //'arr' je pole indexov kariet v 'cards_data'; pri nahodnom prehadzovani sa kopiroju len indexy a nie cele objekty
const heartEmoji = "❤️";
let data = loadFile("page_src/js/cards.JSON");
const cardsData = JSON.parse(data);

//tu su najdene vsetky html elementy s ktorymi tento kod pracuje
const clueBtn = document.getElementById("newClue");
const nextBtn = document.getElementById("nextCard");
const answerBtn = document.getElementById("sendAnswer");
const clueSpace = document.getElementById("Clues");
const answerIn = document.getElementById("answerInput");
const liveCnter = document.getElementById("liveCounter");
const pointCnter = document.getElementById("scoreCounter");

clueBtn.addEventListener("click",showClue);
nextBtn.addEventListener("click",nextCard);
answerBtn.addEventListener("click",checkAnswr);
answerIn.addEventListener("keydown",checkAnswrWrapper);

//zaciatok hry
filArr(arr);
resetGame();




