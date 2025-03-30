function checkStr(str) {
    const brackets = [];
    let round = 0;
    let square = 0;
    let curle = 0;
    for(let i = 0; i <str.length; i++) {
        if(str[i] === '(') {
            round++;
            brackets.push('(')
        }
        else if(str[i] === '[') {
            square++;
            brackets.push('[')
        }
        else if(str[i] === '{') {
            curle++;
            brackets.push('{')
        }

        else if(str[i] === ')') {
            if(round === 0 || brackets.pop() !== '(') return false;
            round--;
        }
        else if(str[i] === ']') {
            if(square === 0 || brackets.pop() !== '[') return false;
            square--;
        }
        else if(str[i] === '}') {
            if(curle === 0 || brackets.pop() !== '{') return false;
            curle--;
        }
    }

    if(round === 0 && square === 0 && curle === 0) {
        return true; 
    }
    
    else {
        return false
    }
}

console.log(checkStr('()'))
console.log(checkStr('{[()]}'))
console.log(checkStr('([)]'))
console.log(checkStr('(){}'))
console.log(checkStr('{()}{'))