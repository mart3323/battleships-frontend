var TableNavigation = {
    left: function ($el) {
        return $el.prev();
    },
    right: function ($el) {
        return $el.next();
    },
    up: function ($el) {
        if($el.length == 0) return $();
        var prev = $el.parent().prev();
        if(prev.length == 0) return $();
        return prev.children().eq($el.data("x"))
    },
    down: function ($el) {
        if($el.length == 0) return $();
        var next = $el.parent().next();
        if(next.length == 0) return $();
        return next.children().eq($el.data("x"))
    }
};