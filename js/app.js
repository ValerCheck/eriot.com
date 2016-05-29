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
