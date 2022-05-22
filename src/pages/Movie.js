import React, {useEffect, useState} from "react";
import XMLParser from 'react-xml-parser';
import classes from "./Movie.module.css";
import {Link, useParams} from "react-router-dom";
import notFound from "../img/notfound.jpg";
import { Spinner } from 'react-bootstrap';

function Movie(props) {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    let portrait = notFound;
    let banner = null;
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
                    setMovie(jsonDataFromXml.getElementsByTagName('Event')[0].children);
                    setLoading(true);
                });
        });
    },[])
    try {
        portrait = movie[17].children[1]?.value || movie[17].children[0]?.value;
        banner = movie[17].children[4]?.value || movie[17].children[3]?.value;
    }catch (e){

    }
    console.log("Render");
    return (
        <div className={classes.Movies} >
            {loading ? (
                <div>
                    <div className={classes.content}>
                        <div className={classes.images}>
                            <div className={classes.banner}>
                                <img className={classes.bannerimg} src={banner}/>
                            </div>
                            <img className={classes.portrait} src={portrait}/>
                        </div>
                        <div className={classes.textContent}>
                            <h3>{movie[1]?.value}</h3>
                            <p className={classes.OriginalTitle}>{movie[2]?.value}</p>
                            <p className={classes.Synopsis}>{movie[15]?.value}</p>
                            <Spinner></Spinner>
                        </div>
                    </div>
                    <div className={classes.buttonContainer}>
                        <button className={classes.orderTickets}>Varaa liput...</button>
                    </div>
                </div>
                ) : (
                    null
                )}

        </div>
    );
}

export default Movie;