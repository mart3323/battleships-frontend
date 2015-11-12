normal_post = $.post;
$.post = function(url, params){
    console.log("Request: "+url);
    promise = $.Deferred();
    var slider = $(".connection-slider *");
    slider.removeClass("done").removeClass("fail");
    normal_post(url, params)
        .done(function(s){
            console.log("Done: "+url);
            console.log(s);
            promise.resolve(s);
        })
        .fail(function(e){
            console.log("Fail: "+url);
            console.log(e);
            promise.reject(e);
        });
    setTimeout(function () {
        promise.done(function(){slider.addClass("done")});
        promise.fail(function(){slider.addClass("fail")});
    }, 200);
    return promise
};