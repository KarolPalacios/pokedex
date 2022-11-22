import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux/es/exports';
import {useState, useEffect} from 'react'
import Pokemon from './Pokemon';
import pokebola from '../assets/pngwing.com.png'
import axios from 'axios'



const Pokedex = () => {

    const userName = useSelector(state => state.name)

    const [pokemon, setPokemon] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonType, setPokemonType] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
        .then(res => setPokemon(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type/')
        .then(res => setPokemonType(res.data.results))
    }, [])

    const searchPokemon = () => {
        navigate(`/pokedex/${pokemonName.toLowerCase()}`)
    }

    const filterType = (e) => {
        axios.get(e.target.value)
        .then(res => setPokemon(res.data.pokemon))
    }

    // console.log(pokemon);

    const [page, setPage] = useState(1)
    const pokemonPerPage = 10
    const lastIndex = page*pokemonPerPage
    const firstIndex = lastIndex-pokemonPerPage
    const pokemonPaginated = pokemon?.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(pokemon?.length/pokemonPerPage)

    const numbers = []
    for(let i = 1; i <= totalPages; i++){
        numbers.push(i)
    }

    console.log(numbers);
    

    return (
        <div className='pokedex'>
            <header className='pokedex-header'>
                <div className="pokedex-title">
                    <img src={pokebola} alt="" />
                    <h1>Pokedex</h1>
                </div>
                <p className='welcome'>Hello {userName}! Welcome to your pokedex</p>
                <div className='search-section'>
                    <select className='filter' onChange={filterType} name="" id="">
                        {
                            pokemonType.map(type => (
                                <option key={type.name} value={type.url}>{type.name}</option>
                            ))
                        }
                    </select>
                    <div className="search">
                        <input 
                            type="text" 
                            value={pokemonName}
                            onChange={e => setPokemonName(e.target.value)}
                            placeholder='Search pokemon' 
                        />
                        <button onClick={searchPokemon} >Search</button>
                    </div>
                </div>

            </header>

            <ul className='pokemons-container'>
                {
                    pokemonPaginated?.map(pokemon => (
                        <Pokemon 
                            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                        />
                    ))
                }
            </ul>

            <div className='pages-container'>
                <button 
                    className='prev-next' 
                    onClick={() => setPage(page-1)} 
                    disabled={page === totalPages}
                >
                    {'<'}
                </button>
                <div className='numbers-container'>
                    {
                        numbers.map(number => (
                            <button 
                                className='numbers' 
                                onClick={() => setPage(number)}
                            >
                                {number}
                            </button>
                        ))
                    }
                </div>
                <button 
                    className='prev-next'
                    onClick={() => setPage(page+1)}
                    disabled={page === totalPages}
                >
                    {'>'}
                </button>
            </div>

            
        </div>
    );
};

export default Pokedex;