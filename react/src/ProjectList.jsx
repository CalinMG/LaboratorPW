import { useState, useEffect } from 'react'; 
import Card from './Card';
function ProjectList() { 
    const [projects, setProjects] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
const [tech, setTech] = useState('');
    useEffect(function() { 
        // DUPA (API Express): 
        fetch('http://localhost:3000/api/projects') 
            .then(function(response) { 
                return response.json(); 
            }) 
            .then(function(data) { 
                setProjects(data)
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
                                async function handleSubmit() { 
                            try { 
                            const response = await fetch('http://localhost:3000/api/projects', { 
                            method: 'POST', 
                            headers: { 'Content-Type': 'application/json' }, 
                            body: JSON.stringify({ title: title, tech: tech }), 
                            }); 
                            const newProject = await response.json(); 
                            setProjects([...projects, newProject]); 
                            setTitle('');  // Goleste input-urile 
                            setTech(''); 
                            } catch (err) { 
                            console.error('Eroare:', err); 
                            } 
                            } 
                                async function handleDelete(id) {
                                try {
                                    await fetch(`http://localhost:3000/api/projects/${id}`, {
                                        method: 'DELETE',
                                    });

                                    setProjects(function (prev) {
                                        return prev.filter(p => p._id !== id);
                                    });
                                } catch (err) {
                                    console.error('Eroare la ștergere:', err);
                                }
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
                <Card key={item._id} title={item.title} description={item.description} onDelete={() => handleDelete(item._id)} />
            ))}
                        <form onSubmit={handleSubmit}>
                        <h3>Adaugă proiect</h3>
                        <input
                            type="text"
                            placeholder="Titlu proiect"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="yeahhh"
                            value={tech}
                            onChange={(e) => setTech(e.target.value)}


                        />

                        <button type="submit">Adaugă proiect</button>

                        </form>
            <p>Total proiecte:{projects.length}</p>
            <p>Proiecte finalizate:{projects.filter(p=>p.done).length}</p>
            <p>Proiecte in lucru:{projects.filter(p=>!p.done).length}</p>
        </div> 
    ); 
} 
 
export default ProjectList;