// importando variavel express 

const express = require('express');
// impor function uuidv4
const {uuid} = require('uuidv4');

//instanciando express
const app = express();
app.use(express.json());

/*
Metodos HTTP 
GET=> Buscar informacao no backend
POST=> Criar informacao no backend
PUT/PATCH=> Alterar uma informacao no backend
DELET=> Deletar uma informacao no backend
*/ 

/*
Tipos de parametros
Parametros sao formas de envio de informacoes  
Querry Params=> Filtros e Paginacao (listagem com filtros)
Route Params=> Idenficiar recursos ID => (Atualizar/Deletar)
Request Body=> Conteudo na hora de criar ou editar um recurso (json)
*/ 

const projects = [];

app.get('/projects',(request, response) =>{
    const {app} = request.query;

    const results = app         
                    ? projects.filter(project => project.app.includes(app))     
                    : projects;
        
    return response.json(results);
});

app.post('/projects',(request, response)=>{
    const {app, owner} = request.body;

    const project = { id:uuid(), app, owner }
    projects.push(project);
    
    return response.json(project)
});

app.put('/projects/:id',(request, response)=>{
    const {id} = request.params;
    const {app, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    if(projectIndex < 0){
        return response.status(400).json({error: 'Project error found.'})
    }

    const project = {
        id,
        app,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project)
});
                      //:id(n precisa ser id) = route params
app.delete('/projects/:id',(request, response)=>{
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    if(projectIndex < 0){
        return response.status(400).json({error: 'Project error found.'})
    }
    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('✔ Backend Started 🌹');
});