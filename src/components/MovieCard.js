import classes from "./MovieCard.module.css";
import notFound from "../img/notfound.jpg";
import {Link} from "react-router-dom";
import React from "react";
import OrderButton from "./OrderButton";


function MovieCard(props){
    const movie = props.event.children;
    let portrait = notFound;
    try {
        portrait = movie[17].children[1].value;
    }catch (e){

    }
    return (
        <div className={classes.card} id={movie[0].value}>
            <div className={classes.content}>
                <img className={classes.portrait} src={portrait}/>
                <div className={classes.textContent}>
                    <Link className={classes.link} to={'/movie/'+ movie[0].value}><h3>{movie[1].value}</h3></Link>
                    <p className={classes.OriginalTitle}>{movie[2].value}</p>
                    <p className={classes.Synopsis}>{movie[14].value}</p>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <OrderButton/>
            </div>
        </div>
    );
}
export default MovieCard;