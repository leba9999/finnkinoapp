import classes from "./Tickets.module.css";
import movieClasses from "./Movie.module.css";
import showtimeclasses from '../components/ShowTime.module.css';
import notFound from "../img/notfound.jpg";
import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import XMLParser from "react-xml-parser";
import TheaterMap from "../components/TheaterMap";

function Tickets() {
    let portrait = notFound;
    let title;
    let ogTitle;
    let banner = null;
    let contentDescriptors = null;
    const dateOptions = {
        dateStyle: "short"
    }
    const timeOptions = {
        timeStyle: "short",
    }
    let date = new Date();
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [shows, setShows] = useState(null)
    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams();
    const scheduleid = searchParams.get("scheduleid");
    const showstart = searchParams.get("showstart");
    useEffect(() => {
        fetch("https://www.finnkino.fi/xml/Events/?eventID=" + id).then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            return results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    setMovie(jsonDataFromXml.getElementsByTagName('Event')[0].children);
                    getShowTimes();
                });
        });
    }, []);
    function getShowTimes(){
        date = new Date(showstart);
        console.log(date.toLocaleString('fi-FI', dateOptions));
        fetch(`https://www.finnkino.fi/xml/Schedule/?eventID=${id}&dt=${date.toLocaleString('fi-FI', dateOptions)}`).then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            return results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    setShows(jsonDataFromXml.getElementsByTagName('Shows')[0].children);
                    const object = jsonDataFromXml.getElementsByTagName('Shows')[0].children;
                    for (const property in object){
                        if(object[property].children[0].value == scheduleid){
                            setShow(object[property].children);
                            setLoading(true);
                            return;
                        }
                    }
                });
        });
    }
    console.log(movie);
    console.log(show);
    try {
        portrait = movie[17]?.children[1]?.value || movie[17]?.children[0]?.value;
        banner = movie[17]?.children[4]?.value || movie[17]?.children[3]?.value;
        contentDescriptors = movie[21]?.children;
        const parser = new DOMParser();
        title = parser.parseFromString(`<!doctype html><body>${movie[1]?.value}`, 'text/html').body.textContent;
        ogTitle = parser.parseFromString(`<!doctype html><body>${movie[2]?.value}`, 'text/html').body.textContent;
    }catch (e){

    }
    return (
        <div className={classes.Tickets}>
            {loading ? (<section className={classes.content}>
                <div className={movieClasses.images}>
                    <div className={movieClasses.banner}>
                        <img className={movieClasses.bannerimg} src={banner}/>
                    </div>
                    <img className={classes.portrait} src={portrait}/>
                </div>
                <div className={movieClasses.textContent}>
                    <h3>{title}</h3>
                    <p className={movieClasses.OriginalTitle}>{ogTitle}</p>
                    <div>
                        <img className={movieClasses.contentDescriptor} src={movie[8]?.value} alt={movie[6]?.value || movie[7]?.value} title={movie[6]?.value || movie[7]?.value}/>
                        {
                            contentDescriptors.map((item, index) => {
                                return (<img className={movieClasses.contentDescriptor} key={index} src={item.children[1]?.value} alt={item.children[0]?.value} title={item.children[0]?.value}/>)
                            })
                        }
                    </div>
                    <p className={movieClasses.OriginalTitle}>Kesto: {Math.floor(movie[4]?.value/60)}h {Math.round(Number('.'+(movie[4]?.value/60).toString().split('.')[1])*60)}min ({movie[4]?.value}min)</p>
                    <p className={showtimeclasses.text}>Kieli: {show[35].children[0].value} { show[36].name.includes("SubtitleLanguage") ? `| Tekstitys: ${show[36].children[0].value}${show[37].name.includes("SubtitleLanguage") ?`, ${show[37].children[0].value}`:``} ` : `` }</p>
                    <div className={classes.Theater}>
                        <h3 className={classes.time}>{date.toLocaleString('fi-FI', timeOptions)}</h3>
                        <h3 className={classes.date}>{date.toLocaleString('fi-FI', dateOptions)}</h3>
                        {show[29].value}
                    </div>
                    <div>

                    </div>
                </div>
                <TheaterMap theater={{width : 12, height : 6, firstrow: 9}}/>
            </section>) : null}
        </div>
    );
}

export default Tickets;