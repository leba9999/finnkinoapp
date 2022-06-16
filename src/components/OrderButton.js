import classes from './OrderButton.module.css';
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function OrderButton(props){
    const navigate = useNavigate();
    useEffect(() => {
    }, []);

    function handleClick(){
        navigate("/movie/" + props.id + "/tickets", { state: { eventID: props.event[14].value, scheduleID: props.event[0].value } });
    }
    return (
        <div>
            <button onClick={ handleClick } className={classes.orderTickets}>Varaa liput...</button>
        </div>
    );
}
export default OrderButton;