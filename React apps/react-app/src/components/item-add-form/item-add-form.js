import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component{

    state={
        label:""
    }

    onLabelChange = (e)=>{
        const value = e.target.value;
        this.setState(() => {
            return{
                label: value
            };
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const {OnAdded} = this.props;
        const {label} = this.state;
        OnAdded(label);
        this.setState(() => {
            return{
                label: ''
            };
        });
    }

    render(){
        return (
            <form className ="item-add-form d-flex" onSubmit={this.onSubmit}>
                <input type="text" 
                className="form-control" 
                onChange ={this.onLabelChange} 
                value={this.state.label}
                placeholder="What's need to be done."/>
                <button className="btn btn-outline-secondary">Add</button>
           </form>
          );
    }
}

