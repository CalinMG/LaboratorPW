import QuickNote from '../QuickNote';
import { useState, useEffect } from 'react';
function Home() { 
    const [count, setCount] = useState(0);
    const [stats, setStats] = useState({
    total: 0,
    done: 0,
    inProgress: 0
});
    useEffect(function () {
    fetch('https://laboratorpw.onrender.com/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error(err));
}, []);
    return ( 
        <div>
            <h2>Home</h2> 
            <p>Bine ai venit pe dashboard-ul meu!</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
            <p>Ai apasat de {count} ori</p>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <p>Proiecte Stats: </p>
            <br></br>
            <p>Total: {stats.total}</p>
            <p>Finalizate: {stats.done}</p>
            <p>În lucru: {stats.inProgress}</p>
            <QuickNote/>
        </div> 

    ); 
} 
export default Home;