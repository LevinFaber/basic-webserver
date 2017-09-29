$(document).ready(function (){


    var httpClient = function(){
    this.get = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                callback(xhr.responseText);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }
    }

    var vac = new httpClient();
    function getem(){
    vac.get("http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=AAD42D5DE55845AFF3E16ED82A426E36&steamids=76561198077704323", 
    function(response){
        var varResponse = JSON.parse(response);
        console.log(varResponse);
    });
};
    getem();
    




})

