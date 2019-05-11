'use struct';
console.log('Какое будет выведено значение: let x = 5; alert( x++ ); ?');
let x = 5;
console.log(x++);
console.log('Чему равно такое выражение: [ ] + false - null + true ?');
console.log(isNaN([1,2] + false - null + true));
console.log('Что выведет этот код: let y = 1; let x = y = 2; alert(x); ?');

console.log('Чему равна сумма [ ] + 1 + 2?');
console.log(([] + 1 + 2) == '12' );
console.log('Что выведет этот код: alert( "1"[0] )?');
console.log("1"[0]);
console.log('Чему равно 2 && 1 && null && 0 && undefined ?');
console.log('Есть ли разница между выражениями? !!( a && b ) и (a && b)??');

var a = [1,2,3];
var b = [1,2,3];
console.log(typeof(+'Infinity'));
console.log("ёжик" > "яблоко");