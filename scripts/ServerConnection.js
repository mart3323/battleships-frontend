var ServerConnection = {
    /**
     * @returns:
     * {
     * &nbsp;&nbsp;success: bool,
     * &nbsp;&nbsp;data: See specific command
     * }
     */
    request: function(url, params){
        var request = $.post(url, params);
        request.then = request.done;
        request.else = request.fail;
        return request;
    },

    /**
     * Returns a promise - Keeps requesting game state from the server at certain intervals
     * until conditionFunction returns true or a request fails
     * See {@link get_game_state}
     * @param conditionFunction Condition to test every response against
     * @param delay delay in milliseconds after receiving a response before sending another request
     * @returns {Promise}
     */
    ping_until: function (name, hash, gameID, delay, conditionFunction) {
        return new Promise(function(resolve, reject){
            ping();
            function ping(conditionalFunction, delay, resolve, reject){
                ServerConnection.request("../cgi-bin/prax3/get_game_state.py",
                    {
                        name: name,
                        hash: hash,
                        gameID: gameID
                    }
                ).then(function(s){
                    if(conditionFunction(s)){
                        promise.resolve(s);
                    } else {
                        setTimeout(function(){ ping(conditionFunction, delay, resolve, reject); }, delay)
                    }
                });
            }
        });
    },

    /**
     * see also: {@link request}
     * @returns: <ul><li>gameID
     * <li>player_1_hash / player_2_hash
     * <li>player_1
     * <li>player_2
     * <li>board_size
     * <li>num_ships
     * <li>started_at
     * <li>game_state
     * <li>waiting_for
     */
    create_game: function(board_size, num_ships, name){
        return ServerConnection.request("../cgi-bin/prax3/create_game.py",{
            board_size: board_size,
            num_ships: num_ships,
            name: name
        })
    },
    /**
     * see also: {@link request}
     * @returns: <ul><li>gameID
     * <li>player_1_hash / player_2_hash
     * <ul><li>player_1
     * <li>player_2
     * <ul><li>board_size
     * <li>num_ships
     * <li>started_at
     * <li>game_state
     * <li>waiting_for
     */
    join_game: function (gameID, name) {
        return ServerConnection.request("../cgi-bin/prax3/join_game.py",{
            gameID: gameID,
            name: name
        })
    },
    /**
     *
     * @Returns: Array of games with the following properties:
     *       <li>gameID
     *       <li>your_name
     *       <li>opponent_name
     *       <li>your_hash
     *       <li>board_size
     *       <li>num_ships
     *       <li>started_at
     *       <li>game_state
     *       <li>waiting_for
     */
    get_available_games: function(){
        return ServerConnection.request("../cgi-bin/prax3/get_available_games.py")
    },
    /**
     * see also: {@link request}
     * @returns: <ul><li>game
     * <ul><li>gameID
     * <li>player_1_hash / player_2_hash
     * <li>player_1
     * <li>player_2
     * <li>board_size
     * <li>num_ships
     * <li>started_at
     * <li>game_state
     * <li>waiting_for
     * </ul><li>your_board
     * </ul><li>opponent_board
     */
    get_game_state: function(gameID, name, hash){
        return ServerConnection.request("../cgi-bin/prax3/get_game_state.py",{
            gameID: gameID,
            name: name,
            hash: hash
        })
    },
};