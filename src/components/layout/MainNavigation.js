import {Link} from 'react-router-dom';
import navClasses from './MainNavigation.module.css';

function MainNavigation(){
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Elokuvat</Link>
                    </li>
                    <li>
                        <Link to='/theaters'>Teatterit</Link>
                    </li>
                    <li>
                        <Link to='/about'>Tiedot</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default MainNavigation;