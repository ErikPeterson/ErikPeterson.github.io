var getOffset = function(elem){
    var box = elem.getBoundingClientRect();
    var docEl = document.documentElement;

    return box.top;
};

var scrolledTop = function(){
    return window.pageYOffset === 0;
};

var scrolledBottom = function(){
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
};

var scroll = function(elem, space, cb){
    var offset = getOffset(elem);
    space = space || 0;
    //case where offset is positive

    if(offset > 0){
        offset -= space;
        if(scrolledBottom()) return cb ? cb() : true;
        if(offset === 0) return cb ? cb() : true;
        if(offset < 5){window.scrollBy(0, offset); return cb ? cb() : true;};
    } else {
        offset -= space;
        if(scrolledTop()) return cb ? cb() : true;
        if(offset === 0) return cb ? cb() : true;
        if(offset > -5) {window.scrollBy(0, offset); return cb ? cb() : true;};
    }

    var distance = offset / 15;
    
    window.scrollBy(0, distance);
    
    window.requestAnimationFrame(function(){
        window.setTimeout(function(){
            scroll(elem, space, cb);
        }, (1000/60));
    });
};

module.exports = scroll;