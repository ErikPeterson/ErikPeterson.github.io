var $ = 'querySelectorAll' in document ? function(selector){ return Array.prototype.slice.call(document.querySelectorAll(selector));} : require('qwery');
var smoothScroll = require('./smoothScroll.js');

var ESP = {
    initialize: function(){
        var path = window.location.search === "" ? window.location.pathname : window.location.search.replace(/^\?route=/,'/');
        this.scrolling = false;
        this.els = {};
        this.menubar = $('header')[0];
        this.bindHistory();
        this.captureLinks();
        this.bindEmail();
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
    bindEmail: function(){
        var emailEl = $('.email-handle')[0];
        var listener = function(e){
            emailEl.innerHTML = "<a href='mailto:eriksalgstrom@gmail.com'>eriksalgstrom@gmail.com</a>";
            emailEl.removeEventListener('click', listener);
        };

        emailEl.addEventListener('click', listener);
    },
    route: function(path){
        var action = path.replace(/^\//,'');
            action = (action === '') ? 'index' : action;
        if(!this.scrolling) this[action]();
    },
    index: function(){
        this.els.index = this.els.index || $('body')[0];
        this._startScroll();
        smoothScroll(this.els.index, this.menubar.getBoundingClientRect().height, this._endScroll.bind(this));
    },
    about: function(){
        this.els.about = this.els.about || $('section[data-section-id="about"]')[0];
        this._startScroll();
        smoothScroll(this.els.about, this.menubar.getBoundingClientRect().height, this._endScroll.bind(this));
    },
    work: function(){
        this.els.work = this.els.work || $('section[data-section-id="work"]')[0];
        this._startScroll();
        smoothScroll(this.els.work, this.menubar.getBoundingClientRect().height, this._endScroll.bind(this));
    },
    contact: function(){
        this.els.contact = this.els.contact || $('section[data-section-id="contact"]')[0];
        this._startScroll();
        smoothScroll(this.els.contact, this.menubar.getBoundingClientRect().height, this._endScroll.bind(this));
    },
    _startScroll: function(){
        console.log('calling start scroll');
        this.scrolling = true;
    },
    _endScroll: function(){
        console.log('calling end scroll');
        this.scrolling = false;
    }
};

module.exports = ESP;