//  OpenShift sample Node application

Object.assign=require('object-assign');

var nodeDotaApi = require('node-dota-api');
var express = require('express');
var app = express();
var request = require('request');
var playerID = 76561198077704323;
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = app.listen(server_port, server_ip_address, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Webapp listening at http://%s:%s", server_ip_address, server_port)
  });

app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname +"/"+ "/public/index.html");
});
getHeros();
getVacBans();
getStats();
getRecent();
getWl();
//VAC
app.get('/vac', function (req, res) {
    res.send(`${days}`);
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


//notVAC

//MMR

app.get('/mmr', function(req, res){
    res.send(`${mmr}`);
})
var mmr = 0;

function getStats() {
    
    var url = "https://api.opendota.com/api/players/117438595"
    request.get(url, function(error, response, body){
        ans = JSON.parse(body);
        mmr = ans.mmr_estimate.estimate;
    })
};


//NOT MMR

//Recent
app.get('/outcome', function(req, res) {
    res.send(`${win}`);
})
app.get('/kda', function(req, res){
    res.send([kills, deaths, assists]);
})
app.get('/hero', function(req, res){
    getHeros();
    getRecent();
    res.send(`${hero}`);
})
var win = true; 
var kills = 0;
var deaths = 0;
var assists = 0;
var hero = "";
function getRecent(){
    var url = "https://api.opendota.com/api/players/117438595/recentMatches"
    request.get(url, function(error, response, body){
        ans = JSON.parse(body);  
        //WINS
        var team = ans[0].playerslot < 5 ? 0 : 1;
        if(team === 0 && ans[0].radiant_win === true){
            win = true;
        }
        else{
            win = false;
        };  
        //HERO
        var heroID = (ans[0].hero_id);
        heroes.forEach(function(element) {
            if(element.id === heroID){
                hero = element.localized_name;
            }
        }, this);
        //KDA
        kills = ans[0].kills;
        deaths = ans[0].deaths;
        assists = ans[0].assists;

    });
}
var heroes = [];
function getHeros(){
    var url = "https://api.opendota.com/api/heroes"
    request.get(url, function(error, response, body){
        heroes = JSON.parse(body);
    })
}

//NOT RECENT 

//WIN LOSS
app.get('/wl', function(req, res) {
    res.send([wl, w, l]);
})
var wl = 0;
var w = 0;
var l = 0;
function getWl() {
    var url = "https://api.opendota.com/api/players/117438595/wl"
    request.get(url, function(url, respnse, body){
        var pl = JSON.parse(body);
        w = pl.win;
        l = pl.lose;
        wl = w/l;
        wl = wl.toFixed(3);
    })
}

