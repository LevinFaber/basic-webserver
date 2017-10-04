$(document).ready(function () {
    //QR CODE
    var qr = false;
    $('#me').click(function () {
        event.preventDefault();
        $(this).toggleClass('bild');
        $(this).toggleClass('qr');
        if (qr === false) {
            $(this).attr('src', './assets/qrcode.png');
            qr = true;
        } else {
            $(this).attr('src', './assets/dumbledumb.jpg');
            qr = false;
        }
    //QR CODE

    });
    //CHANNEL FRAMES

    
    var activeIframe = "preview";
    $(".channel").click(function(){
        var ident = this.id;
        $("#contentwrapper").children().hide();
        if(activeIframe === ident){
            $("#preview").show();
            activeIframe = "preview";
        }else if(ident === "youtube"){
            $(".aspect-ratio").show();
            $("#youtubeC").show();
            activeIframe = ident
        }else{
            $(`#${ident}C`).show();
            activeIframe = ident
        }
        });
    //CHANNEL FRAMES

    //SCROLL ARROWS
    var $root = $('html, body');
    $('#socialspacer').on('click', function () {
        $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });

    function getpos() {
        var pos = ($('#socialspacer').offset().top - $(window).scrollTop());
        if (pos < 200) {
            $('#socialspacer').attr('href', '#home');
            $("#arrow").attr('class', 'fa fa-angle-double-up fa-3x');
        } else {
            $('#socialspacer').attr('href', '#socialspacer');
            $("#arrow").attr('class', 'fa fa-angle-double-down fa-3x');
        }
    }
    getpos();
    $(window).scroll(getpos);

    $("i").hover(function(){
        $("i").fadeTo("fast", 1);
    }, function(){
        $("i").fadeTo("fast", 0.6);

    })
    //SCROLL ARROWS



    //VAC COUNTER
    $.get("/vac", function(data, status){
        $(".vac").html(`${data}`);
    });

    //DOTA STATS
    //EST MMR
    $.get("/mmr", function(data, status){
        $(".mmr").html(`${data}`);
    })
    //LAST game WON
    $.get("/outcome", function(data, status){
        if(data === true){
            $(".outcome").html("Won!");
            $(".outcome").addClass("green");
        }
        else{
            $(".outcome").html("Lost!");
            $(".outcome").addClass("red");
        }
    })
    //KDA
    $.get("/kda", function(data, status){
        $(".kills").html(data[0]);
        $(".deaths").html(data[1]);
        $(".assists").html(data[2]);
    })
    //last HERO
    $.get("/hero", function(data, status){
        $(".hero").html(`${data}`);
    })
    //WL ratio
    $.get("/wl", function(data, status){
        $(".wl").html(data[0]);
        data[0] > 1 ?  $(".wl").addClass("green") :  $(".wl").addClass("red") 
        $(".wins").html(data[1]);
        $(".losses").html(data[2]);
    })

});
