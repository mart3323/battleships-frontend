
var GameMenu = {
    start: function () {
        $("#boards").hide();
        $("#board_size, #num_ships").on("input", GameMenu.onSizeChange);
        $("#name").on("input", GameMenu.onNameChange);
        $("#playgame").click(GameMenu.createGame);
        $("#pregameoptions").show();
        $("#refresh").click(GameMenu.loadOpenGames);
        GameMenu.loadOpenGames()
    },
    loadOpenGames: function () {
        ServerConnection.get_available_games().done(function (s) {
                $("#joinGame .openGame").remove();
                $.each(s.data.games, function(i,game){
                    var gameElement = $("<div></div>").addClass("flex").addClass("flex_zero_width").addClass("openGame");
                    function appendElement(element) {
                        gameElement.append($("<div></div>").append(element));
                    }
                    appendElement($("<div></div>").text(game.player_1));
                    appendElement($("<div></div>").text(game.board_size));
                    appendElement($("<div></div>").text(game.num_ships));
                    appendElement($("<div></div>").text("Join")
                        .addClass("button")
                        .data("gameID",game.gameID)
                        .click(GameMenu.join_game));
                    $("#joinGame").append(gameElement);
                });
            })
    },
    join_game: function () {
        var gameID = $(this).data("gameID");
        var name = $("#name").val();
        ServerConnection.join_game(gameID, name).done(function (s) {
            GameMenu.finish();
            $("body")
                .data("hash", s.data.player_2_hash)
                .data("name", $("#name").val())
                .data("opponent", s.data.player_1)
                .data("board_size", s.data.board_size)
                .data("num_ships", s.data.num_ships)
                .data("gameID", s.data.gameID)
                .trigger("ShipPlacement");
        })
    },
    onNameChange: function () {
        var name = $(this).val();
        var newname = name.replace(" ","_");
        if(newname == ""){
            newname = "_"
        }
        while(newname[0] == "_" && newname.length > 1){
            newname = newname.substring(1);
        }
        if(newname.length > 8){
            newname = newname.substring(0,9);
        }
        if(name != newname){
            $(this).val(newname);
        }
    },
    onSizeChange: function () {
        var new_size = parseInt($("#board_size").val());
        var current_ships = parseInt($("#num_ships").val());
        $("#num_ships").val(Math.min(current_ships, new_size-1));
        GameMenu.checkValid();
    },
    checkValid: function () {
        var size = parseInt($("#board_size").val());
        var ships = parseInt($("#num_ships").val());
        var board_size_valid = 3 <= size && size <= 10;
        var num_ships_valid = 1 <= ships && ships < size;
        if(board_size_valid && num_ships_valid){
            $("#playgame").attr("disabled",false);
        } else {
            $("#playgame").attr("disabled",true);
        }
        $("#error2").toggle(!board_size_valid);
        $("#error3").toggle(!num_ships_valid);

    },
    createGame: function () {
        if(!$("#playgame").attr("disabled")){
            $(this).off();
            var board_size = parseInt($("#board_size").val());
            var num_ships = parseInt($("#num_ships").val());
            var name = $("#name").val();
            ServerConnection.create_game(board_size, num_ships, name).done(function (s) {
                GameMenu.finish();
                $("body")
                    .data("name", $("#name").val())
                    .data("hash", s.data.player_1_hash)
                    .data("board_size", s.data.board_size)
                    .data("num_ships", s.data.num_ships)
                    .data("gameID", s.data.gameID)
                    .trigger("ShipPlacement");
            });
        }
    },
    finish: function () {
        $("#pregameoptions").hide();
    }
};
