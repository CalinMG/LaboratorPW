import { useState, useEffect } from 'react'; 
import Card from './Card';
function ProjectList() { 
    const [projects, setProjects] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    useEffect(function() { 
        fetch('/data/projects.json') 
            .then(function(response) { 
                return response.json(); 
            }) 
            .then(function(data) { 
                setProjects(data.projects); 
                setLoading(false);

            })
            .catch(function(err) { 
                setError('Eroare la incarcarea datelor'); 
                setLoading(false); 
            }) ; 
    }, []); 
 
    if (loading) { 
        return <p>Se incarca...</p>; 
    } 
    if (error) {
    return <p>{error}</p>;
    }
    return ( 
        <div> 
            <h3>Proiecte</h3> 
            <input
                type="text"
                placeholder="Caută proiect după titlu..."
                value={search}
                onChange={function(e) {
                    setSearch(e.target.value);
                }}
            />
            {
                projects.filter(function(p){
                    return p.title.toLowerCase().includes(search.toLowerCase());
                })
                .map((item, index) => (
                <Card key={index} title={item.title} description={item.description} />
            ))}
            <p>Total proiecte:{projects.length}</p>
            <p>Proiecte finalizate:{projects.filter(p=>p.done).length}</p>
            <p>Proiecte in lucru:{projects.filter(p=>!p.done).length}</p>
        </div> 
    ); 
} 
 
export default ProjectList;