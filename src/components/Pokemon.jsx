import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Pokemon = ({url}) => {

    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        axios.get(url).then(res => setPokemon(res.data))
    }, [])

    console.log(pokemon);
// pokemon.types?.[0].type.name
    return (
        <div className={`pokemon-card ${pokemon.types?.[0].type.name}`}>
            <div className="pokemon-info">
                <Link className='link' to={`/pokedex/${pokemon.id}`}>
                    <p className="pokemon-id">
                        #<b>{pokemon.id}</b>
                    </p>
                        <>
                            <img className="img-pokemon" src={pokemon.sprites?.other.home.front_default} alt="" />
                        </>
                        <h3>{pokemon.name}</h3>
                    <div className="details">
                        <p>HP: {pokemon.stats?.[0].base_stat}</p>
                        <p>Attack: {pokemon.stats?.[1].base_stat}</p>
                        <p>Defense: {pokemon.stats?.[2].base_stat}</p>
                        <p>Speed: {pokemon.stats?.[5].base_stat}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Pokemon;