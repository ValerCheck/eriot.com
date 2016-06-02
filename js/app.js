var eriotApp = angular.module('eriotApp',[]);

$(document).ready(function(){

	$(document).scroll(function(){
		if ($(document).scrollTop()+$(window).height() - 100 >= $('.steps-figures').offset().top) {
			var el = $('.steps-figures li:nth-child(1)');
			el.find('.step-text .text-upper').addClass('mark-word');
			el.find('.step-color.front').animate({
				width: '100%'
			}, 3000);
		}

		if ($(document).scrollTop()+$(window).height() - 100 >= $('.exp-line-area').offset().top) {
			
			var elements = [];
			var notColor = [];
			var lengths  = [];
			var time = 3000;
			
			var condElem = $('.exp-line-area > div.line:last-child .color');
			
			if (parseInt(condElem.css('width')) == 0) {

				function addElementSelector(iter, k1, k2, offset, callbacks) {
					if (!iter) return;
					for (var i = 1; i < 3; i++) {
						elements.push('#'+ (2*i+k1) 	+ '.color');
						elements.push('.expertise-item:nth-child('+(i+offset)+') .front-color');
						elements.push('#'+ (2*i+k2) + '.color');
					}
					if (callbacks.length > 0) callbacks.pop()();
					addElementSelector(iter-1,k1 + 4,k2+4,offset + 4, callbacks);
				}

				elements.push('.exp-line-area > div.line:first .color');

				addElementSelector(2,-1,0,1,[function(){
					elements.push('.exp-line-area .line.for-mobile:first .color');
					elements.push('.exp-line-area .line.for-mobile:last .color');
				}]);

				elements.push('.exp-line-area > div.line:last .color');

				for (var i = 0; i < elements.length; i++) {
					var elem = $(elements[i]);
					var parent = elem.parent();
					lengths.push(parseFloat(parent.css('width')));
				}

				var velocity = lengths.reduce(function(a,b){return a+b;},0)/time;

				var speeds = lengths.map(function(el){ return el/velocity; });
				
				function fill(id){
				    if(id<elements.length){
				    	var elem = $(elements[id]);
				    	if (elem.css('display') == 'none') fill(id+1);
				    	else elem.animate({width:'100%'}, speeds[id],"linear", function(){ fill(id+1)});
				    } 
				}

				fill(0);
				
			}
		}
	});

	$('.step-slider').on('beforeChange',function(event,slick,current,next){
		if (next < current) {
			var format = '.steps-figures li:nth-child({number})';
			var elements = '';
			for (var i = next+1; i < 4; i++) {
				var selector = format.replace('{number}',i+1);
				if ($(selector + ' .step-color.front').css('width') == 0) continue;
				elements += (elements == '') ? 
				elements + selector + ' .step-color.front' : 
				',' + selector + ' .step-color.front';
				$(selector + ' .step-text .text-upper').removeClass('mark-word');
			}
			$(elements).animate({
				width: '0'
			}, 3000);
			return;
		}
		var el = $('.steps-figures li:nth-child('+ (next + 1) +')');
		el.find('.step-text .text-upper').addClass('mark-word');
		el.find('.step-color.front').animate({
			width: '100%'
		}, 3000);
	});

	$('.step-slider').slick({
		nextArrow: $('.services-next'),
  		prevArrow: $('.services-prev')
	});
});
