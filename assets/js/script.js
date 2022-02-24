

fetch("assets/json/words.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let themes = data.map(function (iten, index) { return iten.theme; });

        //Funções: =>

        let makeLines = (string = "") => {
            let lines = [];
            for (i = 0; i < string.length; i++) {
                if (string[i] == " ") {
                    lines.push(" ");
                } else {
                    lines.push("_");
                }
            }
            return lines;
        };

        let chooseWord = (array = []) => {
            choosed = Math.floor(Math.random() * (array.length - 0) + 0);
            return array[choosed];
        };

        let verifyLetter = (letter = "", word = []) => {
            word = word.split("");
            places = [];
            for (i in word) {
                if (word[i].toUpperCase() === letter.toUpperCase()) {
                    places.push(i);
                    console.log(i)
                }
            }
            return places;
        };

        let changeCaracter = (caracter = "_", position, array = []) => {
            array.splice(position, 1, caracter.toUpperCase());
            return array;
        };

        let verifyComplete = (word = [], hiddenWord = []) => {
            if (word.toUpperCase() === hiddenWord.join("").toUpperCase()) {
                return true;
            } else {
                return false;
            }
        };

        let drawDoll = (num = 0) => {
            const doll = document.querySelector("img");
            doll.setAttribute("src", `./assets/images/doll/${num}.png`);
        };
        let chooseTheme = (number, data) => {
            number = parseInt(number);
            theme = data.map(function (iten, index) {
                return iten.theme;
            });
            choosedTheme = theme[number - 1];
            words = data.map(function (iten, index) {
                return iten.word;
            });
            themeWords = words[number - 1];
            return [choosedTheme, themeWords];
        };
        
        // inretação DOM
        const hiddenWord = document.querySelector("#hiddenWord");
        const usedLetters = document.querySelector("#usedLetters");
        let letterUsed = [];
        const letterIn = document.querySelector("#letterIn");
        const themeTitle = document.querySelector("#themeTitle");
        const btConfirm = document.querySelector("#btConfirm");
        let life = 0
        
        let game = () => {
        
            let choosingTheme;
            drawDoll();
            while (true) {
                // validando entrada do tema

                choosingTheme = prompt("Escolha o tema:\n 1:Casa\n2:Jogos\n3:Futebol");
                choosingTheme = parseInt(choosingTheme);
                if (choosingTheme >= 1 && choosingTheme <= 3) {
                    break;
                } else {
                    alert("Opção inválida");
                }
            }
            // definindo tema
            let themeAndWord = chooseTheme(choosingTheme, data);
            themeTitle.innerHTML = `Tema: ${themeAndWord[0]}`;
            // Sorteando a palavra e criando as linhas no DOM
            let word = chooseWord(themeAndWord[1]);
            let wordLines = makeLines(word);
            hiddenWord.innerHTML = wordLines.join(" ");
            // Receber e verificar letra digitada
            btConfirm.addEventListener("click",() => {
                let letter = letterIn.value;
                let positions = verifyLetter(letter, word);
                if(letterUsed.includes(letter)){
                    alert("Letra já usada")
                }
                else{
                    letterUsed.push(letter)
                    if (positions.length > 0) {
                        for (i of positions) {
                            wordLines = changeCaracter(letter, i, wordLines);
                        }
                    }
                    else{
                        life+=1;
                    }
                }
                   
                drawDoll(life);
                usedLetters.innerHTML = letterUsed;
                hiddenWord.innerHTML = wordLines.join(" ");
                document.getElementById("letterIn").value = null
                document.getElementById("letterIn").focus()
                console.log(word, wordLines.join(''))
                if(verifyComplete(word,wordLines)){
                    alert("parabêns")
                }
            }

        );
        
    }
    game();
})

//Jogo
// drawDoll(6)
// words = returnWords()
// console.log(words[0]["palavras"])
// word = chooseWord(words[0]["palavras"])
// lines = makeLines(word)
// hiddenWord.innerHTML = lines.join(' ');

// while(verifyComplete(word,lines)){

// position = verifyLetter(letter,word)
// if(position.length == 0){
//     alert("tem não")
// }
// else{
//     alert("tem sim")
//     for(i of position){
//         hiddenWord = changeCaracter(letter, i,hiddenWord)
//     }
// }
// console.log(verifyComplete(word,hiddenWord))
// }

// const teste = () =>{
//     let image = document.querySelector(".imagem");
//     image.innerHTML = `<img src="./assets/images/doll/0.png">`

// }

//    fetch("assets/json/text.json")
//     .then(response =>{
//         return console.log(response.json())
//     })
//     .then(data =>{

//     })
// word = (chooseWord(["casa", "aviao", "pina-colada", "coisa"]))
// hiddenWord = makeLines(word)

// console.log(verifyComplete(word,hiddenWord))
// while(verifyComplete(word,hiddenWord.join(''))){

//     letter = prompt(`digite uma letra \n ${hiddenWord.join(" ")}`)
//     position = verifyLetter(letter,word)
//     if(position.length == 0){
//         alert("tem não")
//     }
//     else{
//         alert("tem sim")
//         for(i of position){
//             hiddenWord = changeCaracter(letter, i,hiddenWord)
//         }
//     }
//     console.log(verifyComplete(word,hiddenWord))
// }
// console.log("Acabou")
