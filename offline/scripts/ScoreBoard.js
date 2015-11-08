var ScoreBoard = {
    start: function () {
        $("#scoreboard").show();
        $("#scoreboardFilterName").on("input click change", ScoreBoard.displayScores);
        ScoreBoard.displayScores();
    },
    save: function(playerWon, yourShots, enemyShots, time) {
        return $.post("../../cgi-bin/prax3/offline/save_score.py", {
            name: $("#name").val(),
            winner: playerWon,
            score1: yourShots,
            score2: enemyShots,
            time: time
        });
    },
    displayScores: function () {
        var name = $("#scoreboardFilterName").val();
        name = name == "" ? undefined : name;
        $.post("../../cgi-bin/prax3/offline/get_scores.py",{
            sorting:$("#scoreboard").data("sorting"),
            name:name
        }).then(function(games){
            $("#scoreboard tr:not(.header)").remove();
            console.log("Games received");
            console.log(games);
            if(typeof games == "string"){
                console.error(games);
                return;
            }
            for (var i = 0; i < games.length; i++) {
                var score = games[i];
                console.log(score);
                var row = $("<tr></tr>");
                row.append($("<td></td>").text(score.name));
                row.append($("<td></td>").text(score.winner ? score.name : "AI"));
                row.append($("<td></td>").text(score.player_shots));
                row.append($("<td></td>").text(score.opponent_shots));
                row.append($("<td></td>").text(score.time));
                row.append($("<td></td>").text(score.date));
                $("#scoreboard table").append(row)
            }
        }).fail(function(e){console.warn(e);});
        console.log("bindings prepared")
    }
};