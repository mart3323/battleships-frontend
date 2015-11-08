var Timer = {
    start: function () {
        Timer.time = Date.now();
    },
    get: function () {
        return Timer.time;
    },
    stop: function () {
        Timer.time = Date.now() - Timer.time;
    }
}

Timer.start()


Timer.stop()


$().text(Timer.get()+"s");