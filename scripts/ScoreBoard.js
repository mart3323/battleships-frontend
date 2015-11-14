var ScoreBoard = {
    start: function () {
        $("#scoreboard").show();
        $("#scoreboard").on("click","th",ScoreBoard.sort);
        $("#namefilter").on("input change click",ScoreBoard.displayScores);
        ScoreBoard.setHeaderStuff();
        ScoreBoard.displayScores();
    },
    sort: function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var current = $(this).attr("sortByIndex");
        if(current){
            current = parseInt(current);
            if($(this).data("reverse") == false){
                $(this).data("reverse",true);
            } else {
                $(this).data("reverse",false);
                if($(this).data("filters").length > current+1){
                    $(this).attr("sortByIndex",current+1);
                } else {
                    $(this).attr("sortByIndex",0);
                }
            }
        } else {
            $("#scoreboard th").removeAttr("sortByIndex");
            $(this).attr("sortByIndex",0);
            $(this).data("reverse",false);
        }
        ScoreBoard.displayScores();
    },
    setHeaderStuff: function () {
        $("#scoreboard th").data("reverse",false);
        $("#scoreboard th").eq(0).data("filters",["player_1"]);
        $("#scoreboard th").eq(1).data("filters",["player_1_shots","player_1_hits"]);
        $("#scoreboard th").eq(2).data("filters",["player_2"]);
        $("#scoreboard th").eq(3).data("filters",["player_2_shots","player_2_hits"]);
        $("#scoreboard th").eq(4).data("filters",["winner"]);
        $("#scoreboard th").eq(5).data("filters",["time"]);
        $("#scoreboard th").eq(6).data("filters",["date"]).attr("sortByIndex",0);
    },
    displayScores: function () {
        var name = $("#namefilter").val();
        if(name == "") { name = undefined; }
        var index = $("#scoreboard th[sortByIndex]").attr("sortByIndex");
        var list = $("#scoreboard th[sortByIndex]").data("filters");
        var sortby = list[index];
        var reverse = $("#scoreboard th[sortByIndex]").data("reverse");
        console.log(list);
        console.log(index);
        console.log(sortby);
        console.log(reverse);
        ServerConnection.get_scores(name, sortby, reverse).then(function(s){
            scores = s.data.scores;
            $("#scoreboard tr:not(.header)").remove();
            $.each(scores, function(i,score){
                var row = $("<tr></tr>");
                row.append($("<td></td>").text(score.player_1));
                row.append($("<td></td>").text(score.player_1_hits+"/"+score.player_1_shots));
                row.append($("<td></td>").text(score.player_2));
                row.append($("<td></td>").text(score.player_2_hits+"/"+score.player_2_shots));
                row.append($("<td></td>").text("player_"+score.winner));
                row.append($("<td></td>").text(score.time));
                row.append($("<td></td>").text(score.date));
                $("#scoreboard table").append(row)
            });
        })
    },
};