import classes from './ShowTimesButton.module.css';
import React, { useEffect} from "react";
import {Link} from "react-router-dom";

function ShowTimesButton(props){

    useEffect(() => {
    }, []);
    return (
        <Link to={"/movie/" + props.id + "/?showtime=true"} className={classes.orderTickets}>Näytös ajat...</Link>
    );
}
export default ShowTimesButton;