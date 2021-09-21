import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom'
import decode from 'jwt-decode';
import Login from '../Login/Login'


const Authentication = (Page) => {
    return class extends Component{
        constructor(){
            super();
            const token = JSON.parse(localStorage.getItem('profile'))?.token
            // const token = localStorage.getItem('profile')
            let decodedToken = 0
            console.log('token',token)
            if (token == null){
                console.log('no token')
            }else{
                // decodedToken = decode(localStorage.getItem('token'))
                decodedToken = decode(JSON.parse(localStorage.getItem('profile')).token)
                console.log(new Date(decodedToken.exp * 1000))
                
            }

            // const decodedToken = localStorage.getItem('token')  ? decode(localStorage.getItem('token')) : null

            this.state = {
                authorised: token == null ? false : (decodedToken.exp * 1000 > new Date().getTime())
            };
        }
        componentDidMount(){
            // console.log(localStorage.getItem('token') ? new Date(decode(localStorage.getItem('token')).exp * 1000) : null)
            console.log(this.state.authorised)
           
        }
        componentDidUpdate(prevState){
            // if(prevState.authorised !== this.state.authorised){
            //     console.log('no longer authorised')
            // }
        }
        render(){
            return(
                <div>
                    {this.state.authorised ? 
                    <Page /> 
                    : 
                    <div> 
                        <Route path="/login" render = {(props) => <Login {...props} />} />
                        <Redirect to={{
                            pathname:"./login",
                            state:{ authorised: false }
                        }} /> 
                    </div>}
                </div>
            )
        }
    };
}
 
export default Authentication;
