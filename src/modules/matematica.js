const PI = 3.14159;
let numeros = ["dos", "cuatro", "ocho", "diez"];

function sumar(num1, num2)
{
    return (num1 + num2);
}
function restar(num1, num2)
{
    return (num1 - num2);
}
const dividir = (a, b) => {
    return (a/b);
};
const multiplicar = (a, b) => {
    return (a*b);
}; 
export {PI, sumar, multiplicar, restar, dividir, numeros}; 