
import React from "react";
import MovieCard from "../components/MovieCard";
import XMLParser from 'react-xml-parser';

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
        let responseDoc = null;
        fetch("https://www.finnkino.fi/xml/Events/").then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            results
                .text()
                .then((str) => {
                    responseDoc = new DOMParser().parseFromString(str, 'text/xml');
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
            <div className="Movies">
                <h1>Movies</h1>
                {
                    this.state.event.map((item, index) => {
                      return <MovieCard key={index} event={item}></MovieCard>
                    })
                }
            </div>
        );
    }
}

export default Movies;