(function (){
	var mainPage = {
		init: function(){
			this.cacheDom();
			this.bindEvents();
		},
		cacheDom: function(){
			this.sectionOffsets = {
				about: document.getElementById('about').offsetTop + 300,
				buzz: document.getElementById('buzzSong').offsetTop + 300,
				draw: document.getElementById('draw').offsetTop + 300,
				comment: document.getElementById('comment').offsetTop + 300,
			};
			this.screenOffset =  screen.height/1.5; 
			this.eTitle = document.getElementById('title');
			this.eSubTitle =	document.getElementById('subTitle');
			this.eBee =	document.getElementById('bee');
			this.eAboutEng =	document.getElementById('aboutEng');
			this.eAboutTw =	document.getElementById('aboutTw');
			this.eBuzzList =	document.getElementsByClassName('buzz-song__text');
			this.eBeeText = document.getElementById('beeText');
			this.eCommentList = document.getElementsByClassName('comment-box');
		},
		bindEvents: function(){	
			window.onscroll = this.handleScroll.bind(this);
		},
		determineSection: function(scrollY){
			if( scrollY < this.sectionOffsets.about - 100) {
				return 1
			}
			if( scrollY > this.sectionOffsets.about - this.screenOffset && scrollY < this.sectionOffsets.buzz) {
				return 2
			}
			if( scrollY > this.sectionOffsets.buzz  - this.screenOffset  && scrollY < this.sectionOffsets.draw- 400) {
				return 3
			}
			if( scrollY > this.sectionOffsets.draw - this.screenOffset  && scrollY < this.sectionOffsets.comment) {
				return 4
			}
			if( scrollY >  this.sectionOffsets.comment - this.screenOffset) {
				return 5
			}
		},
		handleAnimation: function(){
			var scrollY = window.scrollY;
			var section = this.determineSection(window.scrollY);
			var self = this;
			switch (section){
				case 1:
					this.eTitle.style.transform = "translateY("+scrollY/2 +"%)";
					this.eSubTitle.style.transform = "translateX("+ scrollY/15+"%)";
					this.eBee.style.transform = "translateX("+ scrollY/35 +"%)";
				
				case 2:
					this.eAboutEng.classList.remove("about__eng--hidden");
					setTimeout( function(){
						self.eAboutTw.classList.remove("about__tw--hidden");
					}, 400)
					break;
				case 3:
					[].forEach.call(this.eBuzzList, function (ele, i){
						setTimeout( function(){
							ele.classList.remove("buzz-song__text--hidden");
						}, 100*i)
					});
					break;
				case 4:
						this.eBeeText.style.opacity = (scrollY - this.sectionOffsets.draw )/(this.sectionOffsets.draw)*5;
					break;
				case 5:
					[].forEach.call(self.eCommentList, function (ele, i,html){
						var offset = (self.sectionOffsets.comment+300 -  scrollY) / self.screenOffset*80;
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
		},
		handleScroll: function(){
			requestAnimationFrame(this.handleAnimation.bind(this));
		},

	};
	mainPage.init();
})();

