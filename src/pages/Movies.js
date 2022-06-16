
import React, {useEffect, useState} from "react";
import MovieCard from "../components/MovieCard";
import XMLParser from 'react-xml-parser';
import classes from "./Movies.module.css";
import {useParams} from "react-router-dom";

function Movies(props){
    const [state, setState] = useState(null)
    let movies = [];
    const [input, setInput] = useState(''); // '' is the initial state value
    const { id } = useParams();
    useEffect(() => {
        fetch("https://www.finnkino.fi/xml/Events/").then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    console.log( jsonDataFromXml.getElementsByTagName('Event'));
                    setState(jsonDataFromXml.getElementsByTagName('Event'));
                });
        });
    },[])
    if(state){
        console.log(state)
        try {
            state.map((item, index) => {
                console.log(item.children[1].value)
                movies[index] = false;
                if(item.children[1].value.toLowerCase().includes(input.toLowerCase()) || item.children[2].value.toLowerCase().includes(input.toLowerCase())){
                    movies[index] = true;
                }
            });
        }catch (e){

        }
    }
    return (
        <div className={classes.Movies} >
            <div className={classes.content} >
                <h1>Elokuvat</h1>
                <input className={classes.selection} placeholder={"Hae elokuvaa..."} value={input} onInput={e => {setInput(e.target.value); console.log(e.target)}}/><button>Hae</button>

                { state ?
                    state.map((item, index) => {
                      return movies[index] ? <MovieCard key={index} event={item}></MovieCard> : null
                    }) : null
                }
            </div>
        </div>
    );
}

export default Movies;