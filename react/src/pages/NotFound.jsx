import {BrowserRouter,Routes,Route} from 'react-router';
import Home from './Home';
import Navbar from '../Navbar';
import {NavLink } from 'react-router';
function NotFound() { 
    return ( 
        <div>
            <p>theres no page nigga</p>
            <nav>
            <NavLink to="/">go home</NavLink>
            
        </nav>
    </div>
    ); 
} 
export default NotFound;