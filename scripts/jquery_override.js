normal_post = $.post;
$.post = function(url, params){
    console.log("Request: "+url);
    promise = $.Deferred();
    normal_post(url, params)
        .done(function(s){
            console.log("Done: "+url);
            console.log(s);
            promise.resolve(s)
        })
        .fail(function(e){
            console.log("Fail: "+url);
            console.log(e);
            promise.reject(e)
        });
    return promise
};