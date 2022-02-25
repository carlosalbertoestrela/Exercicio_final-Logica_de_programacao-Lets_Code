fetch("assets/json/words.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let themes = data.map(function (iten, index) {
            return iten.theme;
        });

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
        let hidden = (element = []) => {
            for (i of element) {
                i.setAttribute("hidden", "true")
            }
        }
        let show = (element = []) => {
            for (i of element) {
                i.removeAttribute("hidden")
            }
        }


        // inretação DOM
        const result = document.querySelector("#result");
        const hiddenWord = document.querySelector("#hiddenWord");
        const usedLetters = document.querySelector("#usedLetters");
        const btStart = document.querySelector("#btStart")
        const letterIn = document.querySelector("#letterIn");
        const themeTitle = document.querySelector("#themeTitle");
        const btConfirm = document.querySelector("#btConfirm");
        const btRestart = document.querySelector("#btRestart");
        const image = document.querySelector(".image");

        btRestart.addEventListener("click", () => {
            document.location.reload(true)
        })
        btStart.addEventListener("click", () => {
            game()
            hidden([btStart])
        })

        const game = () => {
            show([hiddenWord, usedLetters, letterIn, btConfirm, themeTitle, image])
            let life = 0
            let letterUsed = [];
            let choosingTheme;
            drawDoll(life);
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
            btConfirm.addEventListener("click", () => {
                    let letter = letterIn.value;
                    let positions = verifyLetter(letter, word);
                    if (letter === "" || !isNaN(letter)) {
                        alert("Valor inválido")
                    } else if (letterUsed.includes(letter)) {
                        alert("Letra já usada")
                    } else {
                        letterUsed.push(letter)
                        if (positions.length > 0) {
                            for (i of positions) {
                                wordLines = changeCaracter(letter, i, wordLines);
                            }
                        } else {
                            life += 1;
                        }
                    }
                    //interação com a forca
                    drawDoll(life);
                    usedLetters.innerHTML = letterUsed;
                    hiddenWord.innerHTML = wordLines.join(" ");
                    document.getElementById("letterIn").value = null
                    document.getElementById("letterIn").focus()
                    if (verifyComplete(word, wordLines)) {
                        show([result,btRestart])
                        hidden([hiddenWord, usedLetters, letterIn, btConfirm])
                        result.innerHTML = ` &#127882; PARABÉNS Você encontrou a Palavra: ${word} &#127882;`
                    }
                    if (life == 6) {
                        drawDoll(6)
                        show([result,btRestart])
                        hidden([hiddenWord, usedLetters, letterIn, btConfirm])
                        result.innerHTML = ` &#10060; GAME OVER &#10060;\nPalavra Secreta: ${word}`
                    }
                }

            );


        }
    })