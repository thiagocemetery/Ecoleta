const express = require('express');
const server = express();

const porta = 3000;

//config da pasta public
server.use(express.static('public'));

//template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/view', {
    express: server,
    noCache: true

})


//home
server.get('/', (req, res) => {
    return res.render('index.html');
})

//criação do ponto de coleta
server.get('/create-point', (req, res) => {
    return res.render('create-point.html');
})

//resultados da busca
server.get('/search', (req, res) => {
    return res.render('search-results.html');
})

//abrindo server
server.listen(porta, function () {
    console.log(`server on in ${porta}`);
})

/*npm start executa o objeto start no package.json*/