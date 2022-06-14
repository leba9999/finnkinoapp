import classes from './ShowTime.module.css';
import React, {useRef, useEffect, useState} from "react";
import OrderButton from "./OrderButton";

function ShowTime(props){
    const event = props.event.children;
    let date = null;
    const dateOptions = {
        dateStyle: "short"
    }
    const timeOptions = {
        timeStyle: "short",
    }
    useEffect(() => {
    }, []);
    console.log(event)
    try {
        date = new Date(event[2].value);
    } catch (e){

    }
    return (
        <div className={classes.Event}>
            <h3 className={classes.TheaterHeader}>{date.toLocaleString('fi-FI', timeOptions)}</h3>
            <h3 className={classes.date}>{date.toLocaleString('fi-FI', dateOptions)}</h3>
            <div>
                <p className={classes.text}>{event[29].value}</p>
                <p className={classes.text}>Kieli: {event[35].children[0].value} { event[36].name.includes("SubtitleLanguage") ? `| Tekstitys: ${event[36].children[0].value} ${event[37].name.includes("SubtitleLanguage") ? `, ${event[37].children[0].value}`:``} ` : `` }</p>
            </div>
            <div className={classes.buttonContainer}>
                <OrderButton/>
            </div>
        </div>
    );
}
export default ShowTime;