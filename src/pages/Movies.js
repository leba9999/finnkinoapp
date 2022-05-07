
import React from "react";
import MovieCard from "../components/MovieCard";
import XMLParser from 'react-xml-parser';
import classes from "./Movies.module.css";

class Movies extends React.Component{
    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            event: [],
            DataisLoaded: false
        };
    }
    componentDidMount() {
        fetch("https://www.finnkino.fi/xml/Events/").then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    console.log( jsonDataFromXml.getElementsByTagName('Event'));
                    this.setState({
                        event: jsonDataFromXml.getElementsByTagName('Event')
                    });
                });
        });
    }
    render() {
        return (
            <div className={classes.Movies} >
                <div className={classes.content} >
                    <h1>Elokuvat</h1>
                    <input/>
                    <button>Hae</button>
                    {
                        this.state.event.map((item, index) => {
                          return <MovieCard key={index} event={item}></MovieCard>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Movies;