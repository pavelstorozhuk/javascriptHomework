import React, {Component} from 'react';

import './itemStatus.css';

export default class ItemStatus extends Component{

    render(){
        const {name, isActive, onFilterClick} = this.props;
        let classNames ='btn';
        classNames = isActive === true? classNames+= ' btn-info' : 
                                      classNames+= ' btn-outline-secondary';

    return (
                <button type="button"
                        className={classNames}
                        onClick={onFilterClick}>{name}</button>
            );
    }
}