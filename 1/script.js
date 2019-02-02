"use strict"
var money, time;
function start()
{
      time = prompt("Введите дату в формате yyyy-mm-dd");

      while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц,","");     
      }
}

start();

var appData = {
    budget : +money,
    timeData: time,
    expenses :{},
    optionalExpenses:{},
    income:[],
    saving: true
};

function chooseExpenses()
{
      for (var i=0; i< 2; i++)
      {
            var state = prompt("Введите обязательную статью расходов:");
            var totalAmount = prompt("Во сколько обойдется?");
            if (typeof(state) === 'string' &&
             ( state !== '' && totalAmount !== '' && state.length < 50)){
            
                  console.log('done');
                  appData.expenses[state] = totalAmount;
            }
            else{
                  i--;
            }
           
      }
}

chooseExpenses();

function detectDayBudget ()
{
      appData.moneyPerDay = (appData.budget / 30).toFixed();
      alert('Ежедневный бюджет -' + appData.moneyPerDay)
}

detectDayBudget();

function detectLevel(){
      if (appData.moneyPerDay < 1000)
      {
            console.log('Минимальный уровень достатка'); 
      }else if(appData.moneyPerDay> 1000 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
      }
      else if(appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
      }
      else{
            console.log("Произошла ошибка!");
      }
}

detectLevel();
function checkSavings(){
    //  debugger;
      if (appData.saving === true){
            var save = +prompt("Какова сумма накоплений?"),
            percent = +prompt("Под какой процент?");
            appData.monthInCome = save/100/12*percent;
            alert("Доход в месяц с вашего дипозита:" + appData.monthInCome);
      }
}
checkSavings();

function chooseOptExpenses(){
      for (var i =0; i< 2; i++){
            appData.optionalExpenses[i+1] = prompt("Статья необязательных расходов?");
      }
}

chooseOptExpenses();
