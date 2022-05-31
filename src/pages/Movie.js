import React, {useEffect, useState} from "react";
import XMLParser from 'react-xml-parser';
import classes from "./Movie.module.css";
import {Link, useParams} from "react-router-dom";
import notFound from "../img/notfound.jpg";
//https://www.educative.io/edpresso/how-to-create-a-loading-spinner-in-react
import {Spinner} from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.css';

function Movie(props) {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    let portrait = notFound;
    let banner = null;
    let contentDescriptors = null;
    //useEffect second parameter [] causes useEffect to act as componentDidMount
    // https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
    useEffect(() => {
        fetch("https://www.finnkino.fi/xml/Events/?eventID="+ id).then((results) => {
            // results returns XML. Cast this to a string, then create
            // a new DOM object out of it! like this
            return results
                .text()
                .then((str) => {
                    const jsonDataFromXml = new XMLParser().parseFromString(str);
                    console.log( jsonDataFromXml.getElementsByTagName('Event'));
                    setMovie(jsonDataFromXml.getElementsByTagName('Event')[0].children);
                    setLoading(true);
                });
        });
    },[])
    try {
        portrait = movie[17]?.children[1]?.value || movie[17]?.children[0]?.value;
        banner = movie[17]?.children[4]?.value || movie[17]?.children[3]?.value;
        contentDescriptors = movie[21]?.children;
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
                            <h3>{movie[1]?.value}</h3>
                            <p className={classes.OriginalTitle}>{movie[2]?.value}</p>
                            <div>
                                <img className={classes.contentDescriptor} src={movie[8]?.value} alt={movie[6]?.value || movie[7]?.value} title={movie[6]?.value || movie[7]?.value}/>
                                {
                                    contentDescriptors.map((item, index) => {
                                        return (<img className={classes.contentDescriptor} key={index} src={item.children[1]?.value} alt={item.children[0]?.value} title={item.children[0]?.value}/>)
                                    })
                                }
                            </div>
                            <p className={classes.OriginalTitle}>Kesto: {Math.floor(movie[4]?.value/60)}h {Math.round(Number('.'+(movie[4]?.value/60).toString().split('.')[1])*60)}min ({movie[4]?.value}min)</p>
                            <Tabs defaultIndex={0}>
                                <TabList>
                                    <Tab>Info</Tab>
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
                                    <h2>Any content 2</h2>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                    <div className={classes.buttonContainer}>
                        <button className={classes.orderTickets}>Varaa liput...</button>
                    </div>
                </div>
                ) : (

                    <Spinner animation="border" role="status"></Spinner>
                )}

        </div>
    );
}

export default Movie;