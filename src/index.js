function eval() {
    // Do not use eval!!!
    return;
}

function check(string) {
    let counter = 0;
    for (let i = 0; i < string.length; i++) {
        if ( string[i] == "(" ) {
            counter++;
        } 
        else if ( string[i] == ")" ) {
           counter--;
        }       
    }
    if (counter !== 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}  

function calculate(firstNumb, operator, secondNumb) {
    if ((secondNumb === 0) && (operator === '/')) {
        throw new Error('TypeError: Division by zero.');
    }
    if (operator == "+") {
        return firstNumb + secondNumb;
    }
    else if (operator == "-") {
        return firstNumb - secondNumb;
    }
    else if (operator == "*") {
        return firstNumb * secondNumb;
    }
    else if (operator == "/") {
        return firstNumb / secondNumb;
    }
}



function expressionCalculator(expr) {

    check(expr);

    let noSpaceString = expr.replace(/\s/g, '');
    let arr = [];
    let numberLength = 0;
    let numb = "";
    for (let i = 0; i <noSpaceString.length; i++) {
        if (isNaN(noSpaceString[i]) == true) {
            for ( let j = numberLength; j > 0; j--){
                numb += noSpaceString[i-j];
            }
            if(numb !== "") {
                arr.push(Number(numb));
                numb = "";
                numberLength = 0;
            }
            arr.push(noSpaceString[i]);
        }
        else{
            numberLength++;
        }
    }    

    if (numberLength > 0) {
        for(let j=numberLength; j>0; j--){
            numb += noSpaceString[noSpaceString.length-j];
        }
        arr.push(Number(numb));
    }

    let Priority ={
        '-': 1,
        '+': 1,
        '*': 2,
        '/': 2
    }
    let numberStack = [];
    let operatorsStack = [];

    for (let i = 0; i < arr.length; i++) {
        if (isNaN(arr[i]) == false) {
            numberStack.push(arr[i]);
        }
        else if (isNaN(arr[i]) == true) {
            if (arr[i] == "(") {
                operatorsStack.push(arr[i]);
            }
            else {
                if (operatorsStack[operatorsStack.length - 1] == "(") {
                    if (arr[i] == ")") {
                        operatorsStack.pop();
                    }
                    else {
                        operatorsStack.push(arr[i]);
                    }
                } 
                else if (arr[i] == ")") {
                    let lastOperator = operatorsStack.pop();
                    let lastNumb = numberStack.pop();
                    let initialNumb = numberStack.pop();
                    let newNumber = calculate(initialNumb, lastOperator, lastNumb);
                    numberStack.push(newNumber);
                    i--;
                }
                else if ( operatorsStack.length == 0) {
                    operatorsStack.push(arr[i])
                }
                else if (Priority[arr[i]] > Priority[operatorsStack[operatorsStack.length-1]]) {
                    operatorsStack.push(arr[i]);
                }
                else {
                    let lastOperator = operatorsStack.pop();
                    let lastNumb = numberStack.pop();
                    let initialNumb = numberStack.pop();
                    let newNumber = calculate(initialNumb, lastOperator, lastNumb);
                    numberStack.push(newNumber);
                    i--;
                }
            }
        } 
    }
    if ( numberStack.length > 1) {
        for ( let j = 0; j < numberStack.length; j++) {
            let lastOperator = operatorsStack.pop();
            let lastNumb = numberStack.pop();
            let initialNumb = numberStack.pop();
            let newNumber = calculate(initialNumb, lastOperator, lastNumb);
            numberStack.push(newNumber);
        }
    }
    return numberStack[0];
}

module.exports = {
    expressionCalculator
}


