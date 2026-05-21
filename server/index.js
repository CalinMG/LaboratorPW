const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
app.use(cors()); 
const Project = require('./models/Project'); 
const PORT = process.env.PORT || 3000; 
const mongoose = require('mongoose');
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(function() {
    console.log('Conectat la MongoDB!');
})
.catch(function(err) {
    console.error('Eroare conectare MongoDB:', err);
});


app.use(express.jcts, function(req, res) { 
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
const id = [ 
    { id: 1, title: "Pagina Personala"}, 
    { id: 2, title: "Calculator Buget"}, 
    { id: 3, title: "Dashboard React"}, 
    { id: 4, title: "API Meteo"}, 
]; 
const stats = [ 
 
]; 

// GET /api/projects - returneaza toate proiectele 
app.get('/api/projects', async function(req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});
app.put('/api/projects/:id', async function(req, res) {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(updated);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.post('/api/projects', async function(req, res) { 
    try { 
        const newProject = new Project({ 
            title: req.body.title, 
            tech: req.body.tech, 
            done: req.body.done || false, 
        }); 
        const saved = await newProject.save(); 
        res.status(201).json(saved); 
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    } 
}); 
app.get('/api/stats', async function(req, res) { 
try { 
const total = await Project.countDocuments(); 
const done = await Project.countDocuments({ done: true }); 
res.json({ total: total, done: done, inProgress: total - done }); 
} catch (err) { 
res.status(500).json({ error: 'Eroare server: ' + err}); 
} 
});

// app.get('/api/stats', function(req, res) {

//     const total = projects.length;

//     const completed = projects.filter(
//         p => p.done === true
//     ).length;

//     const inProgress = projects.filter(
//         p => p.done === false
//     ).length;

//     res.json({
//         totalProjects: total,
//         completedProjects: completed,
//         WIP: inProgress
//     });
// });

// app.get('/api/projects/:id', function(req, res) {
//     const project = projects.find(
//         p => p.id === parseInt(req.params.id)
//     );
//     res.json(project);
// });
app.get('/api/projects/:id', async function(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                error: 'Project not found'
            });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.delete('/api/projects/:id', async function(req, res) {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({
                error: 'Project not found'
            });
        }

        res.json({
            message: 'Deleted'
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.listen(PORT, function() { 
console.log('Server pornit pe http://localhost:' + PORT); 
}); 