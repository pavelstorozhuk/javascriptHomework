import React, {Component} from 'react';

import  ItemStatus from '../ItemStatus/itemStatus';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

    render(){
           const{onFilterClick, filters} = this.props;
           const elements = filters.map((item) => {
                const { id, ...itemProps } = item;
            
                return (
                        <div key={id}>
                           <ItemStatus {...itemProps } onFilterClick={()=>{onFilterClick(id)}} />
                        </div>

                )});

        return (
            <div className="btn-group">
                {elements}
            </div>
          );
    }
}

