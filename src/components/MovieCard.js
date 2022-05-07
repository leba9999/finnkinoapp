import classes from "./MovieCard.module.css";
import notFound from "../img/notfound.jpg";


function MovieCard(props){
    const movie = props.event.children;
    let portrait = notFound;
    console.log(movie[17])
    try {
        portrait = movie[17].children[1].value;
    }catch (e){

    }
    return (
        <div className={classes.card} id={movie[0].value}>
            <img className={classes.portrait} src={portrait}/>
            <h3>{movie[1].value}</h3>
            <p className={classes.OriginalTitle}>{movie[2].value}</p>
        </div>
    );
}
export default MovieCard;