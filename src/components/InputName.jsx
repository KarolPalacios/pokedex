import React from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeName } from '../store/slices/name.slice';
import dragon from '../assets/dragon.png'

const InputName = () => {

    const [userName, setUserName] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const enterName = () => {
        navigate('/pokedex')
        dispatch(changeName(userName))
    }

    return (
        <div className='home'>
            <div className='home-container'>
                <div className='home-container-form'>
                    <h1>Hello trainer!</h1>
                    <p>What's your name?</p>
                    <form className='home-form'>
                        <input 
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeholder='Name'
                        />
                        <button onClick={enterName} >Enter</button>
                    </form>
                </div>
                <div className='home-img'>
                    <img src={dragon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default InputName;