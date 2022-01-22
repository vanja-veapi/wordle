window.addEventListener("load", function () {
    fetch("/data/dictionary.txt").then(res => res.text()).then(data => startGame(data));
});
function showEndGame(win, currentWord) {
    this.document.querySelector("#current-word").innerText = currentWord;
    return win === true ? alert("Pobijeda") : alert("Izgubio si");
}
function getWord(row) {
    let word = "";
    let lines = Array.prototype.slice.call(row.children); //Slice se ponavlja

    lines.forEach(tile => {
        word += tile.innerText;
    });

    return word
}
function startGame(data) {
    const dictionary = showFiveWords(data);
    const randomIndex = Math.floor(Math.random() * dictionary.length);

    const rows = this.document.querySelectorAll(".row");

    const currentWord = dictionary[randomIndex];
    console.log(currentWord);

    let rowIndex = 0; //Max rows 5; (5 + 1)
    let tileIndex = 0;
    let lines = Array.prototype.slice.call(rows[rowIndex].children);
    let isGameEnded = false;

    this.window.addEventListener("keydown", function (e) {
        if (e.keyCode >= 65 && e.keyCode <= 90 || e.key.match(/[ŠšĐđŽžČčĆć]/u)) {
            const key = e.key;

            if (tileIndex <= 4) {
                lines[tileIndex].innerText = key;
            }

            tileIndex = Math.min(tileIndex + 1, 5);
        }

        if (e.key === "Backspace" && !isGameEnded) {
            tileIndex = Math.max(tileIndex - 1, 0);
            lines[tileIndex].innerText = "";
        }

        if (e.key === "Enter") {
            let isCompleteWord = lines.every(tile => tile.innerText !== ""); //Da li su sva polja popunjena
            const word = getWord(rows[rowIndex]);

            if (isCompleteWord === true && dictionary.includes(word)) {

                for (let i = 0; i < word.length; i++) {
                    const playerLetter = word[i];
                    const serverLetter = currentWord[i];

                    if (playerLetter.toLowerCase() === serverLetter.toLowerCase()) {
                        lines[i].classList.add("bg-green");
                    }
                    else {
                        lines[i].classList.add("bg-gray");
                    }

                    // ako se slovo nalazi u reci onda ga oboji u zuto
                    if (lines[i].classList[1] !== "bg-green" && currentWord.toUpperCase().includes(playerLetter)) {
                        lines[i].classList.add("bg-yellow");
                    }
                }
                if (rowIndex === 5) {
                    isGameEnded = true;
                    return showEndGame(false, currentWord);
                }
                else if (currentWord.toLowerCase() === word.toLowerCase()) {
                    isGameEnded = true;
                    return showEndGame(true, currentWord)
                }

                rowIndex++;
                tileIndex = 0;
                lines = Array.prototype.slice.call(rows[rowIndex].children); //Slice se ponavlja
            }
            else {
                wiggle(lines);
            }
        }
    })
}
function wiggle(lines) {
    console.log("Vasa rijec se ne nalazi u nasem rijecniku. Moguce da postoji vasa, ali je kod nas nema");
    lines.forEach(tile => {
        tile.classList.add("wiggle");
        setTimeout(() => tile.classList.remove("wiggle"), 1000);
    })
}
function readTextFile(file) {
    fetch(file).then(res => res.text()).then(data => showFiveWords(data));
}
function showFiveWords(dictionary) {
    let allText = dictionary.split("\r\n");
    const fiveWords = allText.filter(words => words.length === 5); //Prikazujem samo reci od 5 slova
    return fiveWords;
<<<<<<< HEAD
}
=======
}
>>>>>>> 432926d07299bea8607c817b1cb41a7f1db1184e
