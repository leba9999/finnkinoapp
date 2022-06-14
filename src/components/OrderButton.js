import classes from './OrderButton.module.css';
import React, { useEffect} from "react";

function OrderButton(props){
    useEffect(() => {
    }, []);
    return (
        <button className={classes.orderTickets}>Varaa liput...</button>
    );
}
export default OrderButton;