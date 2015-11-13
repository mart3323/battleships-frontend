var PING_FREQUENCY = 1000;

var MainGame = {
    start: function () {
        $("#gameoptions").hide();
        $("#boards").show();
        $(".board").show();
        $(".board.opponent").on("click", ".cell", MainGame.onCellClick);
    },
    onCellClick: function (e) {
        gameID = $("body").data("gameID");
        name = $("body").data("name");
        hash = $("body").data("hash");
        x = $(e.target).data("x");
        y = $(e.target).data("y");
        ServerConnection.make_shot(gameID, name, hash, x, y).then(function () {
            MainGame.waitForTurn();
        });
    },
    setBoards: function (your_board, opponent_board) {
        fill($(".board.own"), your_board);
        fill($(".board.opponent"), opponent_board);
        function fill($board, board_state) {
            $.each(board_state, function (y,row) {
                $.each(row, function (x,cell) {
                    var $cell = $board.find("tr").eq(y).find(".cell").eq(x);
                    if(cell%2 == 0){$cell.addClass("ship")}else{$cell.removeClass("ship")}
                    if(cell%3 == 0){$cell.addClass("shot")}else{$cell.removeClass("shot")}
                });
            })
        }
    },
    waitForTurn: function () {
        var name = $("body").data("name");
        var hash = $("body").data("hash");
        var gameID = $("body").data("gameID");
        var player_id = $("body").data("player_id");
        ServerConnection.ping_until(name, hash, gameID, PING_FREQUENCY, function(s){
            MainGame.setBoards(s.data.your_board, s.data.opponent_board);
            return s.data.game.your_turn || s.data.game.game_state == "F";
        }).then(function (e) {
            if(e.data.game.your_turn){
                MainGame.turn = e.data.game.your_turn;
            } else {
                alert("Game over")
            }
        });
    },
    finish: function () {
        $("#boards *").off();
    }
};