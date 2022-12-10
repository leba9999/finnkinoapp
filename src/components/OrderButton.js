import classes from './OrderButton.module.css';
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function OrderButton(props){
    const navigate = useNavigate();
    useEffect(() => {
    }, []);

    function handleClick(){
        navigate(`/movie/${props.id}/tickets?scheduleid=${props.event[0].value}&showstart=${props.event[2].value}`);
    }
    console.log(props.event);
    return (
        <div>
            <button onClick={ handleClick } className={classes.orderTickets}>Varaa liput...</button>
        </div>
    );
}
export default OrderButton;