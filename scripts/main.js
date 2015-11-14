$(document).ready(function () {
    $("body").on("New_Game ShipPlacement MainGame Scoreboard", function(){
        $("#pregameoptions").hide();
        $("#boards").hide();
        $("#scoreboard").hide();
        $("#score").hide();
        $(".board").hide();
        MainGame.finish();
    });

    $("body").on("New_Game", GameMenu.start);
    $("body").on("ShipPlacement", ShipPlacement.start);
    $("body").on("MainGame", MainGame.start);
    $("body").on("Scoreboard", ScoreBoard.start);
    //$("body").on("shipPlacement", ShipPlacement.start)


    $("#menu_new_game").click(function () {$("body").trigger("New_Game")});
    $("#menu_peek").click(function(){$("body").toggleClass("peek")});
    $("#menu_scoreboard").click(function () {$("body").trigger("Scoreboard")});
    $("#menubar .button:not([disabled])").click(function(){console.log("menu select");$("#menubar .button").removeClass("selected"); $(this).addClass("selected")});

    $("body").trigger("New_Game");
});

