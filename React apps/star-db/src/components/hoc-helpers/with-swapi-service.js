import React from 'react';
import {SwapiServiceConsumer} from '../swapi-service-context';

const withSwapiService =(mapMethodsToProps) => (Wrapped) =>{
    return (props)=>{
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) =>{
                        const serviceProps = mapMethodsToProps(swapiService);
                        return <Wrapped {...props} {...serviceProps}></Wrapped>
                    }
                }
            </SwapiServiceConsumer>
        )
    }
}

export default withSwapiService;