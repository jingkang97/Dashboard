import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Input, Spin, Row, Col} from 'antd'
import {UserOutlined, SyncOutlined} from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import {IoIosSync} from 'react-icons/io'
import {io} from 'socket.io-client'
import * as api from '../api/index'
import './styles.css'

const Analytics = ({rows, session, emg, syncDelay}) => {

    return ( 

        <div>
            {/* individual  */}
            <Row>

            </Row>
            
            {/* Group */}
            <Row>
                
            </Row>

            {/* emg */}
            <Row>
                
            </Row>

        </div>
     );
}
 
export default Analytics

