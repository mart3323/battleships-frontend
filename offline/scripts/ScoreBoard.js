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
        var sorting = $("#scoreboard").data("sorting");
        $.post("../../cgi-bin/prax3/offline/get_scores.py",{
            sorting: sorting,
            name:name
        }).then(function(games){
            if(typeof games == "string") {
                console.error(games);
                return;
            }
            $("#scoreboard tr:not(.header)").remove();
            for (var i = 0; i < games.length; i++) {
                var score = games[i];
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
    }
};