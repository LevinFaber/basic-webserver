var express = require('express');
var app = express();
var request = require('request');
var server_port = 80;
var server_ip_address = "0.0.0.0"; 
var url = "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=AAD42D5DE55845AFF3E16ED82A426E36&steamids=76561198077704323";

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/"+ "index.html");
});

request.get(url, function(error, response, body){
    console.log(body);
});

var server = app.listen(server_port, server_ip_address, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", server_ip_address, server_port)
});