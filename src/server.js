const express = require('express');
const server = express();

const porta = 3000;

//config da pasta public
server.use(express.static('public'));

//gabilitar o uso do req.body
server.use(express.urlencoded({extended:true}))

//banco de dados
const db = require('./database/db.js');

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

    //req.query: query strings da url
    console.log(req.query);


    return res.render('create-point.html');
})
server.post('/savepoint', (req, res) =>{

    //inserir dados no db
        //inserir dados na tabela
        const query =`
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    
    `;
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items  

    ];
    function afterInsertData(err) {
        if(err){
            console.log(err);

            return res.send('Erro de cadastro'); 
        }

        console.log('Cadastrado com sucesso');
        console.log(this);
        return res.render('create-point.html', {saved:true});
    }

    db.run(query, values, afterInsertData);
    
    console.log(req.body);

    
})
//resultados da busca
server.get('/search', (req, res) => {

    const search = req.query.search

    if(search == ''){
        //vazio
        return res.render('search-results.html', {total: 0});

    }

    //pegar os dados do db
    db.all(`SELECT * FROM  places WHERE city LIKE '%${search}%';`, function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length;

        console.log(rows);

        //mostrar pagina html com os dados do db
        return res.render('search-results.html', { places : rows, total});
    })

    
})

//abrindo server
server.listen(porta, function () {
    console.log(`server on in ${porta}`);
})

/*npm start executa o objeto start no package.json*/