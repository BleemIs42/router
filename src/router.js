;(function(){ 
    if(typeof require !== 'undefined'){
        window.$ = require('jquery');
    }

    if(typeof $ === 'undefined'){
        console.log("It needs jquery!")
        return;
    }

    var Router = function(){
        var self = this;
        this.hashMode = '#/';
        this.hasInit = false;
        this.isClick = false;

        this.init = function(){
            this.createEvent();
        }
        this.createEvent = function(){
            var parms = {
                oldUrl: '',
                oldState: '',
                newUrl: '',
                newState: ''
            }
            var routerEvent = new CustomEvent('routerChanged', {
                'detail': parms
            });
            window.addEventListener('hashchange', function(e){
                parms.oldUrl = e.oldURL || '';
                parms.oldState = e.oldURL.split(self.hashMode)[1] || '';
                parms.newUrl = e.newURL || '';
                parms.newState = e.newURL.split(self.hashMode)[1] || '';
                window.dispatchEvent(routerEvent);

                var currState = window.location.href.split(self.hashMode)[1];
                if(!self.isClick){
                    self.go(currState);
                }
            })
        }
        this.setHashMode = function(value){
            this.hashMode = value + '/';
            this.init();
        }
        this.on = function(event, cb){
            window.addEventListener(event, function(e){
                var currState = window.location.href.split(self.hashMode)[1];
                var parms = e.detail;
                if(currState in self.allState){
                    cb(e, parms);
                }
            });
        }
        this.allState = {};
        this.config = function(configState){
            configState(this);
            var $tagA = $('a[state]');
            this.handleClick($tagA);

            for(var key in this.allState){
                this.initView(key);
                return;
            }
        }
        this.handleClick = function($tagA){
            $tagA.on('click', function(e){
                self.isClick = true;
                var state = $(e.target).attr('state');
                var currState = window.location.href.split(self.hashMode)[1];
                if(currState == state) return;
                if( !(state in self.allState) ){
                    console.error( new Error('Error: Could not resolve ' + state + ' from state ' + currState) );
                    return;
                }
                self.go(state);
                return false;
            })
        }
        this.when = function(state, tplObj){
            self.allState[state] = tplObj;
            return self;
        }
        this.initView = function(initState){
            var state;
            var currState = window.location.href.split(self.hashMode)[1];
            if(currState && currState != 'undefined'){
                state = currState
                this.go(state);
            }else{
                state = initState;
            }

            this.setUrl(state);
        }
        this.go = function(state){
            var allState = this.allState;
            var $viewDom = $('RouterView');
            if( !(state in allState) ){
                this.isClick = false;
                this.other();
                return;
            }

            var cb = allState[state].cb || (function(state){});
            if(allState[state].templateUrl){
                $viewDom.load(allState[state].templateUrl, function(dom){
                    cb(state);
                    var $tagA = $(dom).find('a[state]');
                    self.handleClick($tagA);
                });
            }else{
                $viewDom.html(allState[state].template);
                cb(state);
                var $tagA = $(allState[state].template).find('a[state]');
                this.handleClick($tagA);
            }
            //change url, trigger onhashchange event
            this.setUrl(state);
        }
        this.setUrl = function(state){
            var path = window.location.pathname;
            var url = path + this.hashMode + state;
            window.location.href = url;
        }
        this.other = function(state){
            self.other = function(){
                self.go(state);
            }
        }
        this.init();
    }
    if(typeof window.Router === 'undefined'){
        window.router = new Router();
    }
})();


