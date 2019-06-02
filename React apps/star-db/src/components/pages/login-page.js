import React from 'react';
import {Redirect} from'react-router-dom';

const LoginPage = ({isLoggedIn, onLogin}) =>{

    if(isLoggedIn){
        return <Redirect to="/"/>;
    }
    return (<div className="jambotron">
            <p>Login to see secret page</p>
            <button class="btn btn-primary" onClick={onLogin}>
            Login
            </button>
           </div>);
}

export default LoginPage;