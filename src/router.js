;(function(){
	var Router = function(){
		var self = this;
		this.hashMode = '#';
		this.hasInit = false;

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
				self.go();
			})
		}
		this.setHashMode = function(value){
			this.hashMode = value;
			this.init();
		}
		this.on = function(event, cb){
			window.addEventListener(event, function(e){
				var parms = e.detail;
				cb(e, parms);
			});
		}
		this.allState = [];
		this.state = function(state, tplObj){
			this.allState.push({
				state: state,
				tplObj: tplObj
			})
			!this.hasInit && this.initView();
			return this;
		}
		this.initView = function(){
			this.hasInit = true;
			var $viewDom = $('RouterView');
			if(this.allState[0].tplObj.templateUrl){
				$viewDom.load(this.allState[0].tplObj.templateUrl);
			}else{
				$viewDom.html(this.allState[0].tplObj.template);
			}			
			var path = window.location.pathname;
			var url = path + this.hashMode + this.allState[0].state;
			window.location.href = url;
		}
		this.go = function(hash){
			var currHash = hash || window.location.href.split(self.hashMode)[1];
			var path = window.location.pathname;
			var allState = this.allState;
			var $viewDom = $('RouterView');
			var len = allState.length;
			for(var i = 0; i < len; i++){
				if(currHash == allState[i].state){
					var cb = allState[i].tplObj.cb || (function(){});
					if(allState[i].tplObj.templateUrl){
						$viewDom.load(allState[i].tplObj.templateUrl, cb);
					}else{
						$viewDom.html(allState[i].tplObj.template);
						cb();
					}
					if(hash){
						var url = path + '#' + currHash;
						window.location.href = url;
					}
					return;
				}
			}		
			history.pushState('/', '/', path + '#/');
			$viewDom.html('');
		}
		this.init();
	}
	if(typeof window.Router === 'undefined'){
		window.router = new Router();
	}
})();

