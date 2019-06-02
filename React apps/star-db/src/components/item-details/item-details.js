import React, { Component } from 'react';

import './item-details.css';
import  SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button/error-button';

const Record = ({item, field, label}) => {
  return (
  <li className="list-group-item">
    <span className="term">{label}</span>
    <span>{item[field]}</span>
  </li>
  );
};

export {
  Record
};
export default class ItemDetails extends Component {

  state={
    item: null,
    image: null
  }
  
updateItem(){
  const{itemId, getData, getImageUrl} =this.props;
  if (!itemId){
    return;
  }

    getData(itemId).then((item) => {
      this.setState({
        item,
        image: getImageUrl(item)
      });
     // this.props.onPersonLoaded();
    });
}

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(prevProps){
    if (prevProps.itemId!== this.props.itemId ||
        prevProps.getData !== this.props.getData ||
        prevProps.getImageUrl !== this.props.getImageUrl){
      this.updateItem();
    }
  }

  render() {
    const {item, image} = this.state;

  if (!this.state.item){
    return (<span> Select a person from a list </span> );
  }

  const {name} = item;

    return (
      <div className="person-details card">
     <img className="person-image"
        src={image} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(this.props.children, (child)=>{
              return React.cloneElement(child,{item});
            })
          }
        </ul>
        <ErrorButton />
      </div>
    </div>
    )
  }
}