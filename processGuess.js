function processGuess(str){
    str = str.trim();
    if (str.length == 2) {
        let letterChar = str[0].toUpperCase().charCodeAt() - 65;
        let num = str[1];
        if (letterChar>=0 && letterChar<=6 && num>=0 && num<=6) {
            return letterChar+num;
        } else {
            return null;
        }
    } else {
        return null
    };
}
//alert(processGuess('b4'));
let guess = prompt('enter your guess');
alert(processGuess(guess));