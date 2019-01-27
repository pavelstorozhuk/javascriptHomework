"use strict"
var money, time;
var money = prompt("Ваш бюджет на месяц,","");
var time = prompt("Введите дату в формате yyyy-mm-dd");
var appData = {
    budget : +money,
    timeData: time,
    expenses :{},
    optionalExpenses:{},
    income:[],
    saving: false
};
for (var i=0; i< 2; i++)
{
      var state = prompt("Введите обязательную статью расходов:");
      var totalAmount = prompt("Во сколько обойдется?");
      if (typeof(state) === 'string' && ( state !== '' && totalAmount !== '' && state.length < 50))
      {
            console.log('done');
            appData.expenses[state] = totalAmount;
      }
      else{
            i--;
      }
     
}

/*var successAttempts = 0;
while (successAttempts < 2)
{
      var state = prompt("Введите обязательную статью расходов:");
      var totalAmount = prompt("Во сколько обойдется?");
      if (typeof(state) === 'string' && ( state !== '' && totalAmount !== '' && state.length < 50))
      {
            console.log('done');
            appData.expenses[state] = totalAmount;
            successAttempts++;
      }
}*/

/*var successAttempts = 0;
do 
{
      var state = prompt("Введите обязательную статью расходов:");
      var totalAmount = prompt("Во сколько обойдется?");
      if (typeof(state) === 'string' && ( state !== '' && totalAmount !== '' && state.length < 50))
      {
            console.log('done');
            appData.expenses[state] = totalAmount;
            successAttempts++;
      }
}
while(successAttempts < 2);*/

var moneyPerDay = appData.budget / 30;
alert("Бюджет на 1 день "+ moneyPerDay);
if (moneyPerDay < 1000)
{
      console.log('Минимальный уровень достатка'); 
}else if(moneyPerDay > 1000 && moneyPerDay < 2000) {
      console.log('Средний уровень достатка');
}
else if(moneyPerDay > 2000) {
      console.log('Высокий уровень достатка');
}
else{
      console.log("Произошла ошибка!");
}

