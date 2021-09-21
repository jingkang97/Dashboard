import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from "react-router-dom";
import { Spin, Button, Input } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined, IdcardOutlined } from '@ant-design/icons';
import * as api from '../api/index'
import './styles.css'

import {signin, signup} from '../../actions/auth'

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [type, setType] = useState('login')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleNameChange = (e) => { setName(e.target.value) }
    const handleUserChange = (e) => { setUsername(e.target.value) }
    const handlePasswordChange = (e) => { setPassword(e.target.value) }
    const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value) }

    const handleLogin = async (e) => {
        e.preventDefault()
        if(!password || !username){
            alert('Fields cannot be empty!')
        }else{
            try {
                setLoading(true)
                console.log('using dispatch')
                dispatch(signin({username: username, password:password}, history))
                console.log('dispatch')
                
            } catch (error) {
                alert(error)
            }
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        if(!password || !username || !confirmPassword){
            alert('Passwords do not match!')
        }
        else if(confirmPassword != password){
            alert('Fields cannot be empty!')
        }else{
            try {
                e.preventDefault()
                setLoading(true)
                dispatch(signup({username: username, password:password}, history))

                // api.register({username: username, password: password}).then(resp => {
                //     console.log(resp)
                //     localStorage.setItem('token', resp.data.token)
                //     localStorage.setItem('username', resp.data.username)
                //     if(resp.data.authorised){
                //         history.push('/overview')
                //     }else{
                //         alert(resp.data.message)
                //         setLoading(false)
                //     }
                // })
            } catch (error) {
                alert(error)
            }
        }
    }
    const changeType = () => {
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        if(type == 'login'){
            setType('register');
        }else{
            setType('login')
        }
    }
    return ( 
        <form onSubmit={type == 'login' ? handleLogin : handleRegister}>
            <div style={{position:'relative', background:'#2f3136', height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <div className={type}>
                    <div style={{overflow:'hidden', position:'relative'}}>
                        <div className="brand">
                            <img src="whitelogo.svg" style={{height:'40px'}}/>
                            <div style={{marginLeft:'10px'}}>DANCE<span style={{fontWeight:'bold', color:'white'}}>DANCE</span></div> 
                        </div>
                        <div style={{height:'90px', width:'100%', overflow:'hidden', marginTop:'-30px', position: 'relative'}}>
                        <svg height="100%" width="100%" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 81.13875598086125,180.11483253588517 162.2775119617225,160.22966507177034 248,184 C 333.7224880382775,207.77033492822966 424.02870813397135,275.1961722488038 537,270 C 649.9712918660287,264.8038277511962 785.6076555023923,186.98564593301433 895,175 C 1004.3923444976077,163.01435406698567 1087.5406698564593,216.86124401913875 1174,232 C 1260.4593301435407,247.13875598086125 1350.2296650717703,223.5693779904306 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#5a65eaff" class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 200)"></path></svg>
                        </div>
                        <div style={{height:'120px', width:'150%',marginTop:'-115px'}}>
                        <svg height="100%" width="100%" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 126.54545454545456,194.94736842105263 253.09090909090912,189.89473684210526 340,171 C 426.9090909090909,152.10526315789474 474.18181818181813,119.36842105263159 547,151 C 619.8181818181819,182.6315789473684 718.1818181818184,278.6315789473684 821,273 C 923.8181818181816,267.3684210526316 1031.090909090909,160.10526315789474 1135,131 C 1238.909090909091,101.89473684210526 1339.4545454545455,150.94736842105263 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#5a65eaff" fill-opacity="0.3" class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 200)"></path></svg>
                        </div>
                        <div style={{height:'120px', width:'90%',marginTop:'-120px'}}>
                        <svg height="100%" width="100%" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 126.54545454545456,194.94736842105263 253.09090909090912,189.89473684210526 340,171 C 426.9090909090909,152.10526315789474 474.18181818181813,119.36842105263159 547,151 C 619.8181818181819,182.6315789473684 718.1818181818184,278.6315789473684 821,273 C 923.8181818181816,267.3684210526316 1031.090909090909,160.10526315789474 1135,131 C 1238.909090909091,101.89473684210526 1339.4545454545455,150.94736842105263 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#5a65eaff" fill-opacity="0.6" class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 200)"></path></svg>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'-10px', justifyContent:'center'}}>
                            {type == 'login' ? null : 
                            <Input name="name" size="large" 
                            value={name}
                            onChange={handleNameChange}
                            placeholder="name" prefix={<IdcardOutlined /> } 
                            style={{width:'90%', marginTop:'10px', borderRadius:'8px', border:'transparent', background:'#2f3136', marginBottom:'10px'}}
                            />}
                            
                            <Input 
                            value={username}
                            onChange={handleUserChange}
                            name="username" size="large" placeholder="username" prefix={<UserOutlined />} style={{width:'90%', borderRadius:'8px', border:'transparent', background:'#2f3136'}}/>
                            <Input.Password name="password" size="large"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="password" prefix={<LockOutlined />} 
                            style={{width:'90%', marginTop:'10px', borderRadius:'8px', border:'transparent', background:'#2f3136'}}
                            />
                            {type == 'login' ? null : 
                            <Input.Password name="confirm password" size="large" 
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="confirm password" prefix={<LockOutlined />} 
                            style={{width:'90%', marginTop:'10px', borderRadius:'8px', border:'transparent', background:'#2f3136'}}
                            />}
                            
                        </div>
                        <div style={{width:'100%', height:'60px',display:'flex', flexDirection:'row', justifyContent:'center', background:'transparent', alignItems:'center'}}>
                            <Button type="primary" htmlType="submit" style={{width:'90%', margin:'0px 10px 0px 10px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>{type == 'login' ? 'Login' : 'Register'} <Spin indicator={<LoadingOutlined style={{fontSize:'15px', marginLeft:'10px', color:'white'}}/>} spinning={loading}/> </Button>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:'20px'}}>
                    {type == 'login' ? <div>Not registered yet? <a onClick={changeType}>Create an Account </a> </div>: <div>Registered? <a onClick={changeType}>Login here </a> </div>}
                </div>
            </div>
        </form>
     );
}
export default Login;