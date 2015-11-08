var ScoreBoard = {
    scores: null,
    start: function () {
        $("#scoreboard").show();
        ScoreBoard.displayScores();
    },
    save : function (winner, yourShots, enemyShots, time, board_size, num_ships) {
        ScoreBoard.scores.push({
            winner: winner,
            yourShots: yourShots,
            enemyShots: enemyShots,
            time: time,
            board_size: board_size,
            num_ships: num_ships
        });
        while(ScoreBoard.scores.length > 10){
            ScoreBoard.scores.shift();
        }
        localStorage.setItem("scores",JSON.stringify(ScoreBoard.scores));
    },
    displayScores: function () {
        console.log(ScoreBoard.scores);
        $("#scoreboard tr:not(.header)").remove();
        for (var i = 0; i < ScoreBoard.scores.length; i++) {
            var score = ScoreBoard.scores[i];
            var row = $("<tr></tr>");
            row.append($("<td></td>").text(score.winner));
            row.append($("<td></td>").text(score.yourShots));
            row.append($("<td></td>").text(score.enemyShots));
            row.append($("<td></td>").text(score.time));
            row.append($("<td></td>").text(score.board_size));
            row.append($("<td></td>").text(score.num_ships));
            $("#scoreboard table tr").eq(0).after(row)
        }
    },
};
ScoreBoard.scores = localStorage.getItem("scores") || "[]";
ScoreBoard.scores = JSON.parse(ScoreBoard.scores);