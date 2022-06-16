import {useLocation} from "react-router-dom";

function Tickets() {
    const location = useLocation();
    const { state } = location;
    const { event } = state || {};
    console.log(location);
    console.log(event);
    return (
        <div className="Tickets">
            <h1>Tickets</h1>
        </div>
    );
}

export default Tickets;