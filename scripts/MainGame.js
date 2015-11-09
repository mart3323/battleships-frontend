var PING_FREQUENCY = 250;

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
        // TODO: Ping server
        //      If victory, display victory, else changeturn/waitforturn
        if(!$(this).closest(".board").data("turn")){
            $(e.target).addClass("shot");
            MainGame.checkVictory();
            if(!$(e.target).hasClass("ship")){
                MainGame.changeTurn();
                MainGame.waitForTurn()
            }
        }
    },
    waitForTurn: function () {
        var name = $("body").data("name");
        var hash = $("body").data("hash");
        var gameID = $("body").data("gameID");
        var player_id = $("body").data("player_id");
        ServerConnection.ping_until(name, hash, gameID, PING_FREQUENCY, function(s){
            return s.waiting_for == player_id}
        ).then(MainGame.changeTurn);
    },
    finish: function () {
        $("#boards *").off();
        Timer.stop();
        var winner = $(this).hasClass("own") ? "Vastane" : "Sina";
        var yourShots = $(".board.opponent .cell.shot").length;
        var enemyShots = $(".board.own .cell.shot").length;
        var time = Timer.get() / 1000;
        var board_size = $("body").data("board_size");
        var num_ships = $("body").data("num_ships");
        var slots = $("#score").show().find("div.flex.vertical");
        slots.eq(0).children().eq(1).text(winner);
        slots.eq(1).children().eq(1).text(yourShots);
        slots.eq(2).children().eq(1).text(enemyShots);
        slots.eq(3).children().eq(1).text(time);
        slots.eq(4).children().eq(1).text(board_size);
        slots.eq(5).children().eq(1).text(num_ships);
        ScoreBoard.save(winner, yourShots, enemyShots, time, board_size, num_ships);
        window.scrollTo(0,document.body.scrollHeight);
    }
};