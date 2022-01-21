window.addEventListener("load", function () {
    startGame();
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
function startGame() {
    const rows = this.document.querySelectorAll(".row");
    const currentWord = "Dokaz";
    // const tiles = this.document.querySelectorAll(".tile");

    let rowIndex = 0; //Max rows 5; (5 + 1)
    let tileIndex = 0;

    let lines = Array.prototype.slice.call(rows[rowIndex].children);
    this.window.addEventListener("keydown", function (e) {
        //Zameniti sa regexom (Pogledati regex generator....)
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const key = e.key;

            if (tileIndex <= 4) {
                lines[tileIndex].innerText = key;
            }

            tileIndex = Math.min(tileIndex + 1, 5);
        }

        if (e.key === "Backspace") {
            tileIndex = Math.max(tileIndex - 1, 0);
            lines[tileIndex].innerText = "";
        }

        if (e.key === "Enter") {
            let isCompleteWord = lines.every(tile => tile.innerText !== ""); //Da li su sva polja popunjena
            if (isCompleteWord === true) {
                const word = getWord(rows[rowIndex]);

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
                    return showEndGame(false, currentWord);
                }
                else if (currentWord.toLowerCase() === word.toLowerCase()) {
                    return showEndGame(true, currentWord)
                }

                rowIndex++;
                tileIndex = 0;
                lines = Array.prototype.slice.call(rows[rowIndex].children); //Slice se ponavlja
            }
        }
    })
}
/**
 * let mixedCharacters = "aεЛ";

// Using the canonical "long" name of the script
mixedCharacters.match(/\p{Script=Latin}/u); // a

// Using a short alias for the script
mixedCharacters.match(/\p{Script=Greek}/u); // ε

// Using the short name Sc for the Script property
mixedCharacters.match(/\p{Sc=Cyrillic}/u); // Л 
 */