var AI_DELAY = 250;

var MainGame = {
    start: function () {
        $("#gameoptions").hide();
        $("#boards").show();
        $(".board").show();
        $(".board.opponent .cell").click(MainGame.onCellClick);
        $(".board.opponent").data("turn", false);
        $(".board.own").data("turn", true);
        Timer.start();
    },
    changeTurn: function () {
        $(".board").each(function () {
            $(this).data("turn", !$(this).data("turn"));
        })
    },
    onCellClick: function (e) {
        if($(e.target).hasClass("shot")) return;
        if(!$(this).closest(".board").data("turn")){
            $(e.target).addClass("shot");
            MainGame.checkVictory();
            if(!$(e.target).hasClass("ship")){
                MainGame.changeTurn();
                setTimeout(MainGame.waitForTurn, AI_DELAY);
            }
        }
    },
    waitForTurn: function () {
        var options = $(".board.own .cell:not(.shot)");
        var target = options[Math.floor(Math.random() * options.length)];
        $(target).addClass("shot");
        if ($(target).hasClass("ship")) {
            if(MainGame.checkVictory()) return;
            setTimeout(MainGame.waitForTurn, AI_DELAY);
        } else {
            MainGame.changeTurn();
        }
    },
    checkVictory: function () {
        $(".board").each(function () {
            if($(this).find(".cell.ship:not(.shot)").length == 0){
                $("#boards *").off();
                Timer.stop();
                var playerWon = !$(this).hasClass("own");
                var yourShots = $(".board.opponent .cell.shot").length;
                var enemyShots = $(".board.own .cell.shot").length;
                var time = Timer.get() / 1000;
                var board_size = $("body").data("board_size");
                var num_ships = $("body").data("num_ships");
                ScoreBoard.save(playerWon, yourShots, enemyShots, time).then(function(){
                    $("body").trigger("Scoreboard");
                });
                return true;
            }
        })
    },
    finish: function () {
        $("#boards").hide();
    }
};