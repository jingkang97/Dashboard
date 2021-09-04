import React, {useEffect, useState} from 'react';
import { Card, Skeleton, Row, Col, } from 'antd';
import './styles.css'
import {io} from 'socket.io-client'

const User = () => {
    const socket = io("http://localhost:5000")
    socket.on("connect", () => {
        console.log(`You connected with id: ${socket.id}`)
    })
    socket.emit('send-message', 'hi hi this is a message')
    // socket.emit("custom-event", 10, "Hi", {a:"a"})
    socket.on("receive-message", message => {
        console.log(message)
    })
    // const ENDPOINT = 'localhost:5000';
    // useEffect(() => {
    // }, [ENDPOINT])
    return ( 
        <div style={{fontSize:'10px', color:'white'}}>
            User
        </div>
     );
}
 
export default User;