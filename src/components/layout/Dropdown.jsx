import classes from './Dropdown.module.css';
import {useRef, useEffect, useState} from "react";

function Dropdown({children}){
    const ref = useRef(null);
    const [visible, setVisible] = useState(false)
    let dropdown = ref.current;

    useEffect(() => {
        // (better) use a ref
        dropdown = ref.current;
    }, []);

    function handleClick(){
        setVisible(!visible)
    }
    return (
        <div className={classes.dropdown}>
            <button onClick={handleClick} className={`${classes.dropdownButton}`}>Dropdown</button>
            <div ref={ref} className={`${classes.dropdown_content} ${visible ? classes.show : ""}`}>
                {children}
            </div>
        </div>
    );
}
export default Dropdown;