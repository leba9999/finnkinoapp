import React, {useEffect, useState} from "react";
import XMLParser from 'react-xml-parser';
import classes from "./Movie.module.css";
import { useSearchParams, useParams} from "react-router-dom";
import notFound from "../img/notfound.jpg";
//https://www.educative.io/edpresso/how-to-create-a-loading-spinner-in-react
import {Spinner} from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.css';
import ShowTime from "../components/ShowTime";
import Accordion from "../components/Accordion";

function Movie(props) {
    const [movie, setMovie] = useState(null)
    const [theaters, setTheaters] = useState(null)
    const [theater, setTheater] = useState(null)
    const [shows, setShows] = useState(null)
    const [showsInTheaters, setShowsInTheaters] = useState(new Map())
    const [dates, setDates] = useState([])
    let [date, setDate] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    let [searchParams, setSearchParams] = useSearchParams();
    console.log(id);
    console.log(searchParams);
    const dateOptions = {
        dateStyle: "short"
    };
    let portrait = notFound;
    let title = "";
    let ogTitle = "";
    let banner = null;
    let contentDescriptors = null;
    let dates_t = [];
    //useEffect second parameter [] causes useEffect to act as componentDidMount
    // https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
    useEffect(() => {
        for (let i = 0; i < 5; i++){
            let date = new Date();
            date.setDate(date.getDate()+i);
            dates_t.push(date);
        }
        dates_t.push(null);
        setDates(dates_t);
        getShowTimes();
        fetch("https://www.finnkino.fi/xml/Events/?eventID="+ id).then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            return results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    setMovie(jsonDataFromXml.getElementsByTagName('Event')[0].children);
                    setLoading(true);
                });
        });
        fetch("https://www.finnkino.fi/xml/TheatreAreas/").then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            return results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    setTheaters(jsonDataFromXml.getElementsByTagName('TheatreAreas')[0].children);
                    getShowTimes();
                });
        });
    },[date, theater])
    useEffect(()=>{
        let tempMap = new Map();
        if(!theaters || !shows){
            return;
        }
        for(let i = 0; i < shows.length; i++){
            if(tempMap.has(shows[i].children[25].value)){
                tempMap.get(shows[i].children[25].value).push(shows[i]);
            } else {
                tempMap.set(shows[i].children[25].value, [shows[i]]);
            }
            //(showsInTheaters.set(shows[i].children[25].value, shows[i])
        }
        setShowsInTheaters(tempMap);
    },[shows, theaters])
    useEffect(()=>{
        setDate(dates_t[0])
    },[])
    function getShowTimes(){
        let d = parseInt(date) || parseInt(date) != 0 ? new Date(date) : null;
        fetch(`https://www.finnkino.fi/xml/Schedule/?eventID=${id}${theater != null ? "&area=" + theater : "" }${d ? "&dt=" + ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth()+1)).slice(-2) + "." + d.getFullYear(): "&nrOfDays=10"}`).then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            return results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    setShows(jsonDataFromXml.getElementsByTagName('Shows')[0].children);
                });
        });
    }
    function handleDates(a_date) {
        setDate(a_date);
    }
    function handleTheater(a_theater){
        setTheater(a_theater);
    }
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
        <div className={classes.Movies} >
            {loading ? (
                <div>
                    <div className={classes.content}>
                        <div className={classes.images}>
                            <div className={classes.banner}>
                                <img className={classes.bannerimg} src={banner}/>
                            </div>
                            <img className={classes.portrait} src={portrait}/>
                        </div>
                        <div className={classes.textContent}>
                            <h3>{title}</h3>
                            <p className={classes.OriginalTitle}>{ogTitle}</p>
                            <div>
                                <img className={classes.contentDescriptor} src={movie[8]?.value} alt={movie[6]?.value || movie[7]?.value} title={movie[6]?.value || movie[7]?.value}/>
                                {
                                    contentDescriptors.map((item, index) => {
                                        return (<img className={classes.contentDescriptor} key={index} src={item.children[1]?.value} alt={item.children[0]?.value} title={item.children[0]?.value}/>)
                                    })
                                }
                            </div>
                            <p className={classes.OriginalTitle}>Kesto: {Math.floor(movie[4]?.value/60)}h {Math.round(Number('.'+(movie[4]?.value/60).toString().split('.')[1])*60)}min ({movie[4]?.value}min)</p>
                            <Tabs defaultIndex={searchParams.get("showtime") ? searchParams.get("showtime").includes("true") ? 1 : 0 : 0}>
                                { console.log(movie)}
                                <TabList>
                                    <Tab>Tiedot</Tab>
                                    <Tab>Näytösajat</Tab>
                                </TabList>
                                <TabPanel>
                                <h3 className={classes.Synopsis}>Synopsis</h3>
                                <p className={classes.Synopsis}>{movie[15]?.value}</p>
                                {
                                    movie[18]?.children[0]?.children[4].value.includes("YoutubeVideo") || !movie[18]?.children[0]?.children[4].value.includes("Flash") ? (
                                        <div>
                                            <h3 className={classes.Tittle}>Traileri</h3>
                                            <div className={classes.video_container}>
                                                <iframe src={"https://www.youtube.com/embed/"+movie[18]?.children[0]?.children[1].value}>
                                                </iframe >
                                            </div>
                                        </div>
                                    ) : (
                                        <video >
                                            <source src={movie[18]?.children[0]?.children[1].value} type="video/mp4"/>
                                            <source src="movie.ogg" type="video/ogg"/>
                                            Your browser does not support the video tag.
                                        </video >
                                    )
                                }
                                </TabPanel>
                                <TabPanel>
                                    <h3 className={classes.Synopsis}>Näytösajat</h3>
                                    <div></div>
                                    <select className={classes.selection} onChange={e => handleTheater(e.target.value)} name="theaters" id="theaters">
                                        {
                                            theaters ?
                                                theaters.map((item, index) => {
                                                    return (<option key={index} value={item.children[0].value}>{item.children[1].value}</option>)
                                                }) : null
                                        }
                                    </select>
                                    <select className={classes.selection} onChange={e => handleDates(e.target.value)} name="time" id="time">
                                        {
                                            dates ?
                                                dates.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item ? item : 0}>
                                                            {
                                                                item ?
                                                                    item.getDate() === new Date().getDate() ?
                                                                        `Tänään, ` + item.toLocaleString('fi-FI', dateOptions)
                                                                    :
                                                                        item.toLocaleString('fi-FI', dateOptions)
                                                                    :
                                                                    `Kaikki päivät`
                                                            }
                                                        </option>)
                                                }) : null
                                        }
                                    </select>
                                    {
                                        showsInTheaters ?
                                            [...showsInTheaters.values()].map(shows =>
                                                <Accordion title={shows[0].children[27].value}>{
                                                    shows.map((item, index) => {
                                                            return (
                                                                    <ShowTime key={index} event={item}></ShowTime>
                                                            )
                                                        })
                                                    }
                                                </Accordion>
                                            ): null
                                    }
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
                ) : (
                    <Spinner animation="border" role="status"></Spinner>
                )}

        </div>
    );
}

export default Movie;