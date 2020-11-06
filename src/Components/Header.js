import React from 'react'
import "./Header.css"
import {useState, useEffect} from "react"
import {FaSearch, FaArrowLeft} from 'react-icons/fa'

import Card from './Card'
// import _,{ debounce } from "lodash";

// let searchContainer = false;

let searchData ;
let matchPoke = [] ;
// let matches2 ;


function Header({getSearchState}) {
    const [searchCon, setSearchCon] = useState(false)
    const [input, setInput] = useState('');
    const [searchDataReady, setSearchDataReady] = useState(false)
    const [readyToRender, SetReadyToRender] = useState(false)
    const [searchArray, setSearchArray] = useState([])

    function search(){
        getSearchState(true);
        setSearchCon(true)
    }

    function back(){
        getSearchState(false);
        setSearchCon(false)
    }

    async function searchPokemon(searchText) {
        matchPoke = []

        let resp = await fetch(" https://pokeapi.co/api/v2/pokemon?limit=893&offset=0")
        let data = await resp.json()
        searchData = data.results
        console.log(searchData)
        setSearchDataReady(true)

        if (searchDataReady) {
            if (searchText === '') {
                console.log('nothing')
                setSearchArray([])
            } else{
                    let matches = searchData.filter(element => {
                    const regex = new RegExp(`^${searchText}`, 'gi');
                    if(element.name.match(regex)){
                        console.log('match', element.name)
                        return element.url;
                    }
                  })

                  for (let index = 0; index < matches.length; index++) {
                    // setLoading(true)
                    const element = matches[index];
                    let resp = await fetch(element.url);
                    let respData = await resp.json()
                    matchPoke.push(respData)
                    setSearchArray(matchPoke)
                    console.log(searchArray)
                    SetReadyToRender(true)
                  }
            }
        }
    }

   

    function handleSearch(e) {
        setInput(e.target.value)
    }

    useEffect(() => {
        console.log(input)
        searchPokemon(input)
    }, [input])


    return (
            <header>
                {/* className={expanded? "show" : null} */}
                {/* <div className="row-1"> */}
                    <div className="search-input">
                        <input type="text" name="" id="" value={input} className={searchCon? "show" : null} onChange={handleSearch}/>
                        <button onClick={search}><FaSearch className="FaSearch"/></button>
                    </div>
                    <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/500px-International_Pok%C3%A9mon_logo.svg.png" alt=""/>
                    <button><FaArrowLeft className={searchCon? "FaArrowLeft back" : "FaArrowLeft"} onClick={back}/></button>
                    {readyToRender? matchPoke.map(item => (
                            <Card 
                            key={item.id}
                            name= {item.name} 
                            imgUrl={item.sprites.other["official-artwork"].front_default} 
                            rank={item.id} 
                            stats={item.stats} 
                            pokeType={item.types[0].type.name}
                            />
                        )) : null}
                    {/* <h4 onClick={expand}>Sort By Types</h4> */}
                {/* </div> */}
                {/* <div className="types">
                    <h4 id="normal" onClick ={searchByType}>Normal</h4>
                    <h4 id="grass">Grass</h4>
                    <h4 id="fire">Fire</h4>
                    <h4 id="water">Water</h4>
                    <h4 id="fighting">Fighting</h4>
                    <h4 id="flying">flying</h4>
                    <h4 id="poison">poison</h4>
                    <h4 id="ground">ground</h4>
                    <h4 id="rock">rock</h4>
                    <h4 id="bug">bug</h4>
                    <h4 id="ghost">ghost</h4>
                    <h4 id="electric">electric</h4>
                    <h4 id="psychic">psychic</h4>
                    <h4 id="ice">ice</h4>
                    <h4 id="dragon">dragon</h4>
                    <h4 id="dark">dark</h4>
                    <h4 id="steel">steel</h4>
                    <h4 id="fairy">fairy</h4>
                </div> */}
            </header>
    )
}

export default Header
