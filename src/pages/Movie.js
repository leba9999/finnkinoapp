import React, {useEffect, useState} from "react";
import XMLParser from 'react-xml-parser';
import classes from "./Movies.module.css";
import {useParams} from "react-router-dom";

function Movie(props) {
    const [state, setState] = useState(null)
    const { id } = useParams();
    //useEffect second parameter [] causes useEffect to act as componentDidMount
    // https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
    useEffect(() => {
        fetch("https://www.finnkino.fi/xml/Events/?eventID="+ id).then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            return results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    console.log( jsonDataFromXml.getElementsByTagName('Event'));
                    setState(jsonDataFromXml.getElementsByTagName('Event'));
                });
        });
    },[])

    console.log("Render");
    return (

        <div className={classes.Movies} >
            <div className={classes.content} >
                <h1>{state ? state[0].children[1].value : ""}</h1>
            </div>
        </div>
    );
}

export default Movie;