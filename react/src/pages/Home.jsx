import QuickNote from '../QuickNote';
import { useState } from 'react';
function Home() { 
    const [count, setCount] = useState(0);
    return ( 
        <div>
            <h2>Home</h2> 
            <p>Bine ai venit pe dashboard-ul meu!</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
            <p>Ai apasat de {count} ori</p>
            <QuickNote/>
        </div> 

    ); 
} 
export default Home;