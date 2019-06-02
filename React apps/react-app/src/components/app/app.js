import React, {Component} from "react";
import ReactDOM from "react-dom";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";

export default class App extends Component{

  MaxId = 100;
  state = {
    todoData : [
      this.CreateToDoItem("Drink Cofee"),
      this.CreateToDoItem("Make Awesome app"),
      this.CreateToDoItem("Have a lunch")],

      filters : [this.CreateFilter('All',true),
      this.CreateFilter('Active', false),
      this.CreateFilter('Done', false)],

      searchText :''
  };
 
  
  onSearchTextChange = (e)=>{
    const value = e.target.value;
    this.setState(() => {
        return{
            searchText: value
        };
    });
}

  CreateToDoItem(label){
    return {label : label,
            done: false,
            important : false,
             id : ++this.MaxId};

  }

  CreateFilter(name, isActive){
    return {
            id : ++this.MaxId,
            name : name,
            isActive : isActive
    };
}

  deleteItem = (id) => {    
    this.setState(({todoData}) => {
      const index = todoData.findIndex(el => el.id === id);
      return {todoData : [...todoData.slice(0, index), ...todoData.slice( index+1)]};
    })
 };

 onToggleImportant=(id)=>{
  this.setState(({todoData}) => {
    const newArray =  this.toggleProperty(todoData, id, 'important');
     return {
       todoData: newArray
     };
   });
}

onToggleDone=(id)=>{
  this.setState(({todoData}) => {
   const newArray =  this.toggleProperty(todoData, id, 'done');
    return {
      todoData: newArray
    };
  });
}

onFilterClick= (id) =>{
  this.setState(({filters})=> {
          const index =   filters.findIndex((el)=> el.id === id);
          let filter = filters[index];
          filter.isActive = true;
          
          let newFilters = [
                  ...filters.slice(0, index),
                  filter,
                  ...filters.slice(index+1)
          ];

          newFilters.forEach((item) =>{
                  if (item.id !== id){
                          item.isActive = false;
                  }
          });

          return {filters : newFilters};
  });
}

 addItem =(text) =>{
  const newElement = this.CreateToDoItem(text);

  this.setState(({todoData})=> { 
    let newArray = [...todoData, newElement]
    return{
      todoData:newArray
    };
   })
 }

 toggleProperty(arr,id,propName){
  const index = arr.findIndex((el) => el.id === id);
  const oldItem = arr[index];
  const newItem = {...oldItem, [propName]: !oldItem[propName]};
   return [...arr.slice(0, index),
                    newItem,
                    ...arr.slice(index+1)
                   ];

 }

  

  render(){
    const {todoData, filters, searchText} = this.state;
    const filterName = filters.find((el)=> el.isActive === true).name;
    let filteredData = todoData;
    switch(filterName){
      case 'Active':
      filteredData = filteredData.filter((element) => !element.done);
       break;

      case 'Done':
      filteredData = filteredData.filter((element) => element.done);
       break;
    }

    if (searchText !== ''){
      filteredData = filteredData.filter(item => item.label.toLowerCase().startsWith(searchText.toLowerCase()));
    }
   
    const doneCount = todoData.filter((el)=> el.done).length;
    const todoCount = todoData.length - doneCount;
  
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel searchText ={searchText} onSearchTextChange ={this.onSearchTextChange} />
          <ItemStatusFilter  filters ={filters} onFilterClick={this.onFilterClick} />
        </div>
  
        <TodoList todos={filteredData} OnDeleted = {this.deleteItem} onToggleImportant ={this.onToggleImportant} 
        onToggleDone={this.onToggleDone}/>
        <ItemAddForm OnAdded={this.addItem}/>
      </div>
    );
  }
}
  