/*
Exercice intermédiaire : 
Développez une fonction de chat en temps réel. 
 Dans cette fonction, les clients doivent être en mesure d'envoyer des messages qui sont immédiatement reçus et affichés pour tous les autres clients connectés.

Connexion du client : 
    Chaque client doit être en mesure de se connecter à l'application de chat. Vous aurez besoin d'une authentification pour afficher l'identité de chaque utilisateur.

Envoi de messages : 
    Les clients doivent pouvoir saisir et envoyer des messages. 
    Ces messages seront ensuite envoyés à un serveur.

Serveur de messagerie : 
    Le serveur de messagerie recevra les messages des clients
    et les distribuera aux autres clients connectés. 
    Il sera nécessaire de gérer plusieurs connexions simultanées.

Réception des messages : 
    Les clients doivent pouvoir recevoir des messages du serveur de messagerie. 
    Ces messages doivent être affichés sur l'interface utilisateur.

Interface utilisateur : 
L'interface doit afficher les messages entrants en temps réel.

*/

const express = require('express');
const app = express();
const http = require("http").createServer(app); //Crée un serveur HTTP en combinant Express et Socket.IO.
const io = require("socket.io")(http);
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("client-message", (msg) => {
        io.emit("server-message", msg);
    });
});

app.get('/', (req, res) => {
    res.render("connection");
});

app.post('/chat', (req, res) => {
    res.render("chat", {nickname: req.body.nickname});
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
});


