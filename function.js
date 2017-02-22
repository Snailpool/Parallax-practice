(function (){
	var mainPage = {
		init: function(){
			this.cacheDom();
			window.requestAnimationFrame(this.getOffset.bind(this));
			this.bindEvents();
		},
		cacheDom: function(){
			this.eHome = document.getElementById('home');
			this.eTitle = document.getElementById('title');
			this.eSubTitle =	document.getElementById('subTitle');
			this.eBee =	document.getElementById('bee');
			this.eAboutEng =	document.getElementById('aboutEng');
			this.eAboutTw =	document.getElementById('aboutTw');
			this.eBuzzList =	document.getElementsByClassName('buzz-song__text');
			this.eBeeText = document.getElementById('beeText');
			this.eCommentList = document.getElementsByClassName('comment-box');
			this.ticking = false;
			window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		},
		getOffset: function(){
			this.scrollY = window.pageYOffset;
			this.screenOffset =  screen.height/3; 
			// this.screenOffset =  screen.height/1.2; 
			this.sectionOffsets = {
				about: document.getElementById('about').offsetTop + 500,
				buzz: document.getElementById('buzzSong').offsetTop + 500 ,
				draw: document.getElementById('draw').offsetTop + 500,
				comment: document.getElementById('comment').offsetTop + 500,
			};
		},
		bindEvents: function(){	
			window.addEventListener('scroll', this.requestFromScroll.bind(this), false);
		},
		requestFromScroll(){
			if(!this.ticking) {
				this.scrollY = window.pageYOffset;
				this.ticking = true;
				window.requestAnimationFrame(this.handleAnimation.bind(this));
			}
		},
		determineSection: function(scrollY){
			var adjustScrollY = scrollY + this.screenOffset;
			if( adjustScrollY < this.sectionOffsets.about - 100) {
				return 1
			}
			if( adjustScrollY > this.sectionOffsets.about && adjustScrollY < this.sectionOffsets.buzz) {
				return 2
			}
			if( adjustScrollY > this.sectionOffsets.buzz && adjustScrollY < this.sectionOffsets.draw ) {
				return 3
			}
			if( adjustScrollY > this.sectionOffsets.draw && adjustScrollY < this.sectionOffsets.comment-100) {
				return 4
			}
			if( adjustScrollY >  this.sectionOffsets.comment -100) {
				return 5
			}
		},
		handleAnimation: function(){
			var section = this.determineSection(this.scrollY);
			var self = this;
			switch (section){
				case 1:
					var beeThing =  this.scrollY/25;
					this.eSubTitle.style.transform = "translateX("+ beeThing +"%)";
					this.eBee.style.transform = "translateX("+ beeThing +"%)";
					this.eTitle.style.transform = "translateY("+ this.scrollY +"%)";
				
				case 2:
					this.eHome.style.opacity= 1;
					this.eAboutEng.classList.remove("about--hidden");
					this.eAboutTw.classList.remove("about--hidden");
					break;
				case 3:
					this.eHome.style.opacity= 0;
					[].forEach.call(this.eBuzzList, function (ele, i){
						ele.style.transitionDelay = 0.1*i +'s';
						ele.classList.remove("buzz-song__text--hidden");
					});
					break;
				case 4:
						this.eBeeText.style.opacity = 1-(this.sectionOffsets.draw - this.scrollY)*4.5/(this.sectionOffsets.draw);
					break;
				case 5:
					[].forEach.call(this.eCommentList, function (ele, i,html){
						var offset = (self.sectionOffsets.comment -  self.scrollY - 100)*550/ self.sectionOffsets.comment;
						console.log(offset);
						offset = offset < 0 ? 0 : offset;

						if(i < 2){
							ele.style.transform =  "translateX(-"+ offset + "%)";
						}
						else{
							ele.style.transform =  "translateX("+ offset + "%)";
						}
					});
				break;
			}
			this.ticking = false;
		}
		// handleScroll: function(){
		// 	window.requestAnimFrame = (function(){
		// 		return  window.requestAnimationFrame       ||
		// 		window.webkitRequestAnimationFrame ||
		// 		window.mozRequestAnimationFrame    ||
		// 		function( callback ){
		// 			window.setTimeout(callback, 1000 / 60);
		// 		};
		// 	})();
		// 	requestAnimationFrame(this.handleAnimation.bind(this));
		// },

	};
	window.onload = mainPage.init.bind(mainPage);
})();

