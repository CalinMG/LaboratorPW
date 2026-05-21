import {BrowserRouter,Routes,Route} from 'react-router';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Card from './Card';

import { useState } from 'react';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import ProjectList from './ProjectList';
import Navbar from './Navbar';
function App() {

    return ( 
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/projects" element={<Projects />}/>
                <Route path="*" element={<NotFound />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
        
    ); 
    
} 

export default App; 