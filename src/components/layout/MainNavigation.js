import {Link} from 'react-router-dom';
import navClasses from './MainNavigation.module.css';
import { ReactComponent as Logo } from '../../img/FinnkinoLogo.svg'

function MainNavigation(){
    return (
        <header>
            <nav>
                <Link to='/'> <Logo className={navClasses.logo}/></Link>
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