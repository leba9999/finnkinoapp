import classes from './Accordion.module.css';
import React, {useEffect, useState} from "react";

function Accordion(props){
    const [visible, setVisible] = useState(true)
    let title = props.title;

    function handleClick(){
        setVisible(!visible)
    }
    return (
        <div>
            <button onClick={handleClick} className={`${classes.accordion} `}>{title} <div className={`${classes.arrow} ${visible ? classes.up : classes.down}`} /></button>
            <div className={`${classes.panel} ${visible ? classes.active : ""}`}>
                {props.children}
            </div>
        </div>
    );
}
export default Accordion;