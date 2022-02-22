//Funções: =>

let makeLines = (array=[]) => {
        let lines = [];
        for(i = 0;i < array.length;i++){
            lines.push("_");
        } 
        return lines;
}

let chooseWord = (array = []) =>{
    choosed = Math.floor(Math.random()*(array.length - 0) + 0);
    return array[choosed];
}

let verifyLetter = (letter='', word=[]) =>{
    word = word.split('');
    places = []
    for (i in word){
        if (word[i] === letter){
            places.push(i);
        }
    }
    return places;
}

let changeCaracter = (caracter='_', position, array=[]) => {
        array.splice(position,1,caracter);
        return array;
}

let verifyComplete = (word=[],hiddenWord=[]) => {
    if(word===hiddenWord){
        return false;
    }
    else{
        return true;
    }

}

word = (chooseWord(["casa", "aviao", "pina-colada", "coisa"]))
hiddenWord = makeLines(word)

console.log(verifyComplete(word,hiddenWord))
while(verifyComplete(word,hiddenWord.join(''))){

    letter = prompt(`digite uma letra \n ${hiddenWord.join(" ")}`)
    position = verifyLetter(letter,word)
    if(position.length == 0){
        alert("tem não")
    }
    else{
        alert("tem sim")
        for(i of position){
            hiddenWord = changeCaracter(letter, i,hiddenWord)
        }
    }
    console.log(verifyComplete(word,hiddenWord))
}
console.log("Acabou")
