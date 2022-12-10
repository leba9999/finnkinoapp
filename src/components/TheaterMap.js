import classes from './TheaterMap.module.css';
import seat from "../img/chair.png";
import greenSeat from "../img/greenChair.png";
import redSeat from "../img/redChair.png";
import goldSeat from "../img/goldChair.png";
import React, {useEffect, useState} from "react";
import ShowTime from "./ShowTime";

function TheaterMap(props){
    const theater = props.theater;
    const [selected, setSelected] = useState([])
    const [rows, setRows] = useState([])
    function handleClick(index, array){
        let test = [...array]
        test[index] = !test[index];
        setSelected(test);
    }
    useEffect(() => {
        for(let j = 0; j < theater.height; j++){
            for(let i = 0; i < theater.width; i++){
                selected.push(false);
                };
        }
        for(let i = 0; i < theater.firstrow; i++){
            selected.push(false);
        }
    }, []);
    useEffect(() => {
        let column = [];
        for(let j = 0; j < theater.height; j++){
            let row = [];
            for(let i = 0; i < theater.width; i++){
                row.push(<img onClick={() => handleClick(j * theater.width + i, selected)} key={j * theater.width + i} className={selected[j * theater.width + i] ? `${ classes.selected}` : `${classes.seat}`} src={seat}/>)
            }
            column.push(<div key={"height" + j} className={classes.row}>{row}</div>);
        }
        let row = [];
        for(let i = 0; i < theater.firstrow; i++){
            row.push(<img onClick={() => handleClick(theater.height * theater.width + i, selected)} key={theater.height * theater.width + i} className={selected[theater.height * theater.width + i] ? `${ classes.selected}` : `${classes.seat}`} src={seat}/>)
        }
        column.push(<div key={"firstrow"} className={classes.row}>{row}</div>);
        setRows(column);
    }, [selected]);

    return (
        <div className={classes.theaterMap}>
            <div className={classes.content}>
                <div  className={classes.seatInfo}>
                    <img className={classes.egSeats} src={greenSeat}/><h4>= Vapaa | </h4>
                    <img className={classes.egSeats} src={redSeat}/><h4>= Varattu | </h4>
                    <img className={classes.egSeats} src={goldSeat}/><h4>= Valinta</h4>
                </div>
                <div className={classes.map}>
                    {rows}
                </div>
            </div>
        </div>
    );
}
export default TheaterMap;