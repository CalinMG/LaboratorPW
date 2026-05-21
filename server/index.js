const express = require('express'); 
const app = express(); 
const PORT = 3000; 
app.use(express.json());
// Prima ruta: raspunde la GET / 
app.get('/', function(req, res) { 
res.json({ message: 'Serverul functioneaza!' }); 
}); 
// POST /api/projects - adauga un proiect nou 
app.post('/api/projects', function(req, res) { 
    const newProject = { 
        id: projects.length + 1, 
        title: req.body.title, 
        tech: req.body.tech, 
        done: req.body.done || false, 
    }; 
    projects.push(newProject); 
    res.status(201).json(newProject); 
}); 
// Porneste serverul 
// Date (temporar in memorie, vom folosi MongoDB mai tarziu) 
const projects = [ 
    { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true }, 
    { id: 2, title: "Calculator Buget", tech: "JS", done: true }, 
    { id: 3, title: "Dashboard React", tech: "React", done: false }, 
    { id: 4, title: "API Meteo", tech: "React, API", done: false }, 
]; 
const id = [ 
    { id: 1, title: "Pagina Personala"}, 
    { id: 2, title: "Calculator Buget"}, 
    { id: 3, title: "Dashboard React"}, 
    { id: 4, title: "API Meteo"}, 
]; 
const stats = [ 
 
]; 

// GET /api/projects - returneaza toate proiectele 
app.get('/api/projects', function(req, res) { 
    res.json(projects); 
}); 
app.get('/api/stats', function(req, res) {

    const total = projects.length;

    const completed = projects.filter(
        p => p.done === true
    ).length;

    const inProgress = projects.filter(
        p => p.done === false
    ).length;

    res.json({
        totalProjects: total,
        completedProjects: completed,
        WIP: inProgress
    });
});

app.get('/api/projects/:id', function(req, res) {
    const project = projects.find(
        p => p.id === parseInt(req.params.id)
    );
    res.json(project);
});
app.listen(PORT, function() { 
console.log('Server pornit pe http://localhost:' + PORT); 
}); 