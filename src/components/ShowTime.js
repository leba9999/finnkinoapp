import classes from './ShowTime.module.css';
import React, {useRef, useEffect, useState} from "react";

function ShowTime(props){
    const event = props.event.children;
    let date = null;
    const dateOptions = {
        timeStyle: "short"
    }
    useEffect(() => {
    }, []);
    //console.log(event)
    try {
        date = new Date(event[2].value);
    } catch (e){

    }
    return (
        <div className={classes.Event}>
            <h3>{date.toLocaleString('fi-FI')}</h3>
            <div>
                <p>{event[29].value}</p>
            </div>
            <button className={classes.orderTickets}>Varaa liput...</button>
        </div>
    );
}
export default ShowTime;