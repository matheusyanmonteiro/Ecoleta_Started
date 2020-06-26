const express = require("express")
const server = express()

//PEGANDO O BANCO DE DADOS
const db = require("./database/db.js")

server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})


server.get("/", (req, res) => {
    return res.render("index.html")

})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")

})

server.get("/search", (req, res) => {
    //pegando os dados do banco de dados

    db.all(`SELECT * FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        console.log("dados resgastados com sucessoS")
        //mostrar a pagina html com o banco de dados
        return res.render("search-results.html",{places: rows})
    })



})

server.listen(3000)