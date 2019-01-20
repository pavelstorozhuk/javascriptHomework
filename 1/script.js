"use strict"
var money, time;
var money = prompt("Ваш бюджет на месяц,","");
var time = prompt("Введите дату в формате yyyy-mm-dd");
var appData = {
    budget : money,
    timeData: time,
    expenses :{

    },
    optionalExpenses:{

    },
    income:[],
    saving: false
};
var state = prompt("Введите обязательную статью расходов:");
var totalAmount = prompt("Во сколько обойдется?");
appData.expenses = {
      state : totalAmount
};

console.log("Бюджет на 1 день {0}", appData.budget / 30);