import React from 'react';
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const PokedexDetail = () => {

    const [pokemon, setPokemon] = useState({})
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setPokemon(res.data))
    }, [])

    const goToBack = () => {
        navigate('/pokedex')
    }

    console.log(pokemon);

    return (
        <div className={`pokemon-detail ${pokemon.types?.[0].type.name}`} >
            <div className="back">
                <button 
                    className='back-btn'
                    onClick={goToBack}
                >
                    {'<'}
                </button>
            </div>
            <section className='header'>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.sprites?.other.home.front_default} alt="" />
            </section>
            <section className='properties'>
                <div className='about'>
                    <h2>About</h2>
                    <div className='about-info'>
                        <div className='container left'>
                            <p><b>{pokemon.height/10}m</b></p>
                            <p className='opaque'>Height</p>
                        </div>
                        <div className='container rigth'>
                            <p><b>{pokemon.weight/10}kg</b></p>
                            <p className='opaque'>Weight</p>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    <h2>Stats</h2>
                    <div className='stats-info'>
                        <p>Hp</p>
                        <p>{pokemon.stats?.[0].base_stat}</p>

                        <p>Attack</p>
                        <p>{pokemon.stats?.[1].base_stat}</p>

                        <p>Defense</p>
                        <p>{pokemon.stats?.[2].base_stat}</p>

                        <p>Special attack</p>
                        <p>{pokemon.stats?.[3].base_stat}</p>

                        <p>Special defense</p>
                        <p>{pokemon.stats?.[4].base_stat}</p>

                        <p>Speed</p>
                        <p>{pokemon.stats?.[5].base_stat}</p>
                    </div>
                </div>
                <div className="type">
                    <h2>Types</h2>
                    <div className='type-info'>
                        <p>{pokemon.types?.[0]?.type.name}</p>
                        <p>{pokemon.types?.[1]?.type.name}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PokedexDetail;