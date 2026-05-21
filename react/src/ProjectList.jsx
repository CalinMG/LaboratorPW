import { useState, useEffect } from 'react'; 
import Card from './Card';
function ProjectList() { 
    const [projects, setProjects] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');
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
                                    async function handleToggle(id, currentDone) {
                                    try {
                                        const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                done: !currentDone,
                                            }),
                                        });

                                        const updatedProject = await response.json();

                                        setProjects(function (prev) {
                                            return prev.map(function (p) {
                                                return p._id === id ? updatedProject : p;
                                            });
                                        });
                                    } catch (err) {
                                        console.error('Eroare toggle:', err);
                                    }
                                }
                                function handleEditStart(project) {
                                setEditingId(project._id);
                                setEditTitle(project.title);
                                setEditTech(project.tech);
                            }
                            async function handleSaveEdit() {
                                try {
                                    const response = await fetch(
                                        `http://localhost:3000/api/projects/${editingId}`,
                                        {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                title: editTitle,
                                                tech: editTech,
                                            }),
                                        }
                                    );

                                    const updatedProject = await response.json();

                                    setProjects(prev =>
                                        prev.map(p =>
                                            p._id === editingId ? updatedProject : p
                                        )
                                    );

                                    setEditingId(null);
                                    setEditTitle('');
                                    setEditTech('');

                                } catch (err) {
                                    console.error('Eroare edit:', err);
                                }
                            }
                            function handleCancelEdit() {
                                setEditingId(null);
                                setEditTitle('');
                                setEditTech('');
                            }
                            async function handleDelete(id) {
                            if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
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
                <Card
    key={item._id}
    title={item.title}
    description={item.tech}
    done={item.done}
    onEdit={() => handleEditStart(item)}
    onToggle={() => handleToggle(item._id, item.done)}
    onDelete={() => handleDelete(item._id)}
/>
            ))}
                         <h3>Editează proiect</h3>

                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            <input
                                type="text"
                                value={editTech}
                                onChange={(e) => setEditTech(e.target.value)}
                            />

                            <button onClick={handleSaveEdit}>
                                Salvează
                            </button>

                            <button onClick={handleCancelEdit}>
                                Anulează
                            </button>
                        <form onSubmit={handleSubmit}>
                            <br></br><br></br><br></br><br></br><br></br><br></br>
                        <h2>Adaugă proiect</h2>
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