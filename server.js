var nodeDotaApi = require('node-dota-api');
var express = require('express');
var app = express();
var request = require('request');
var playerID = 76561198077704323;
var server_port = 80;
var server_ip_address = '127.0.0.1';

var server = app.listen(server_port, server_ip_address, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", server_ip_address, server_port)
 });

app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname +"/"+ "/public/index.html");
});


//VAC
app.get('/vac', function (req, res) {
    res.send(`<p>Clean since <br><span>${days}</span><br> days!</p>`);
  });  
var days = 0;
function getVacBans() {
    var url = "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=AAD42D5DE55845AFF3E16ED82A426E36&steamids=76561198077704323";
    request.get(url, function(error, response, body){
        ans = JSON.parse(body);
        days = (ans.players[0].DaysSinceLastBan);
        return days;
        
    });
};
getVacBans();

//notVAC

//MMR

app.get('/mmr', function(req, res){
    res.send(`<p>EST. MMR: <br><span>${mmr}</span></p>`);
})
var mmr = 0;
var wl = 0;
function getStats() {
    var stats = {}
};
getStats();

