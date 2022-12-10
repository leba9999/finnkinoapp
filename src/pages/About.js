import classes from "./About.module.css";

function About() {
    return (
        <div className={classes.content} >
            <h1>About</h1>
            <p>This was my first React App project. Idea was to create small clone of Finnkino website and learn React.</p>
            <p>Project uses Finnkino xml services, to provide latest information of movies which are currently now showing at Finnkino.</p>
            <ul>
                <li>
                    XML service: <a className={classes.link} href={"https://www.finnkino.fi/xml/"}>https://www.finnkino.fi/xml/</a>
                </li>
                <li>
                    GitHub: <a className={classes.link} href={"https://github.com/leba9999/finnkinoapp"}>https://github.com/leba9999/finnkinoapp</a>
                </li>
            </ul>
        </div>
    );
}

export default About;