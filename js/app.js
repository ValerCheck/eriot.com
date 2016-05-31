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
			var speeds 	 = [];
			var condElem = $('.exp-line-area > div.line:last-child .color');
			if (parseInt(condElem.css('width')) == 0) {

				lengths.push(parseFloat($('.exp-line-area > div.line:first').css('width')));
				var len = lengths[0];

				elements.push('.exp-line-area > div.line:first .color');
				
				for (var i = 1; i < 3; i++) {
					
					var first = '#'+ (2*i-1);
					var middle = '.expertise-item:nth-child('+(i+1)+')';
					var last = '#'+ (2*i);

					lengths.push(parseFloat($(first).parent().css('width')));
					lengths.push(parseFloat($(middle).css('width')));
					lengths.push(parseFloat($(last).parent().css('width')));

					len += lengths[1];
					len += lengths[2];
					len += lengths[3];

					elements.push(first 	+ '.color');
					elements.push(middle + ' .front-color');
					elements.push(last   + '.color');
				}

				var lineFirst = '.exp-line-area .line.for-mobile:first';
				var lineLast =	'.exp-line-area .line.for-mobile:last'; 
				lengths.push(parseFloat($(lineFirst).css('width')));
				lengths.push(parseFloat($(lineLast).css('width')));

				elements.push(lineFirst);
				elements.push(lineLast);

				for (var i = 1; i < 3; i++) {

					var first = '#'+ (3+2*i);
					var middle = '.expertise-item:nth-child('+(i+5)+')';
					var last = '#'+ (4+2*i);

					lengths.push(parseFloat($(first).parent().css('width')));
					lengths.push(parseFloat($(middle).css('width')));
					lengths.push(parseFloat($(last).parent().css('width')));

					len += lengths[6];
					len += lengths[7];
					len += lengths[8];

					elements.push(first 	+ '.color');
					elements.push(middle + ' .front-color');
					elements.push(last   + '.color');
				}

				lengths.push(parseFloat($('.exp-line-area > div.line:last').css('width')));

				len += lengths[9];
				var velocity = len/3000;
				speeds = lengths.map(function(el){
					return el/velocity;
				});

				elements.push('.exp-line-area > div.line:last .color');

				var arr = elements;
				
				function fill(id){
				    if(id<arr.length){
				    	var elem = $(arr[id]);
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
