var entrada = document.getElementById('entrada'),
    numero = document.querySelectorAll('.numeros div'),
    operadores = document.querySelectorAll('.operadores div'),
    resultado = document.getElementById('resultado'),
    limpar = document.getElementById('limpar'),
    resultadoDigitado = false;

for (var i = 0; i < numero.length; i++){

    numero[i].addEventListener("click", function (e) {
        
        var stringAtual = entrada.innerHTML;
        var ultimoOperador = stringAtual[stringAtual.length - 1];

        if(resultadoDigitado === false) {
            entrada.innerHTML += e.target.innerHTML
        }
        else if (resultadoDigitado === true && ultimoOperador === "+" || ultimoOperador === "-" || ultimoOperador === "×" || ultimoOperador === "÷"){
            resultadoDigitado = false;
            entrada.innerHTML += e.target.innerHTML;
        }else{
            resultadoDigitado = false;
            entrada.innerHTML = "";
            entrada.innerHTML += e.target.innerHTML;
        }

    });

}

for (var i = 0; i < operadores.length; i++){

    operadores[i].addEventListener("click", function (e){

        var stringAtual = entrada.innerHTML;
        var ultimoOperador = stringAtual[stringAtual.length - 1];

        if(ultimoOperador === "+" || ultimoOperador === "-" || ultimoOperador === "×" || ultimoOperador === "÷"){
            var novaString = stringAtual.substring(0, stringAtual.length - 1) + e.target.innerHTML;
            entrada.innerHTML = novaString;
        } else if (stringAtual.length == 0){

        } else {
            entrada.innerHTML += e.target.innerHTML;
        }
    });

}

resultado.addEventListener("click", function () {

    var entradaString = entrada.innerHTML;
    var numero = entradaString.split(/\+|\-|\×|\÷/g);
    var operadores = entradaString.replace(/[0-9]|\./g, "").split("");

    var dividir = operadores.indexOf("÷");
    while (dividir != -1){
        numero.splice(dividir, 2, numero[dividir] / numero[dividir + 1]);
        operadores.splice(dividir, 1);
        dividir = operadores.indexOf("÷");
    }
    
    var multiplicar = operadores.indexOf("×");
    while (multiplicar != -1){
        numero.splice(multiplicar, 2, numero[multiplicar] * numero[multiplicar + 1]);
        operadores.splice(multiplicar, 1);
        multiplicar = operadores.indexOf("×");
    }

    var subtrair = operadores.indexOf("-");
    while (subtrair != -1){
        numero.splice(subtrair, 2, numero[subtrair] - numero[subtrair + 1]);
        operadores.splice(subtrair, 1);
        subtrair = operadores.indexOf("-");
    }

    var soma = operadores.indexOf("+");
    while (soma != -1){
        numero.splice(soma, 2, parseFloat(numero[soma]) + parseFloat(numero[soma + 1]));
        operadores.splice(soma, 1);
        soma = operadores.indexOf("+");
    }

    entrada.innerHTML = numero[0];
    resultadoDigitado = true;

});

limpar.addEventListener("click", () => {
    entrada.innerHTML = "";
})