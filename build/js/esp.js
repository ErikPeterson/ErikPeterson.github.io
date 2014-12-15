var $=require('qwery');

var ESP = {
    initialize: function(){
        var path = window.location.search === "" ? window.location.pathname : window.location.search.replace(/^?route=/,'/');

        this.bindHistory();
        this.captureLinks();
        if (window.history.state && window.history.state.path) return this.route(window.history.state.path)
        this.route(path);
    },
    captureLinks: function(){
        var that = this;
        var $links = $('a');

        $links.forEach(this.bindLink.bind(this));
        
    },
    bindLink: function(a){
        var that = this;
        var host = a.host || window.location.host;
        var path = a.pathname;

        a.addEventListener('click', function(e){
            if(window.location.host !== host) return;
            e.preventDefault();
            window.history.pushState({path: path}, '', path);

            that.route(path);
        }, true);
    },
    bindHistory: function(){
        var that = this;

        window.addEventListener('popstate', function(e){
            var path = (e.state && e.state.path) ? e.state.path : '/';

            that.route(path);
        });
    },
    route: function(path){
        var action = path.replace(/^\//,'');
            action = (action === '') ? 'index' : action;

        this[action]();
    },
    index: function(){
        console.log("hit the index route");
    },
    about: function(){
        console.log("hit about route");
    },
    work: function(){
        console.log("hit work route");
    },
    contact: function(){
        console.log("hit contact route");
    }
};

module.exports = ESP;