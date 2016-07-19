var eriotApp = angular.module('eriotApp',[]);

function initializeMap() {
	var pos = new google.maps.LatLng(50.4251127,30.5331364);
	
	var customMapType = new google.maps.StyledMapType([
		{
			featureType : 'all',
			elementType : 'geometry',
			stylers : [
				{
					hue : "#ffff00",
					color: "#ff0000"
				}
			]
		},
		{
			elementType : 'labels',
			stylers : [{visibility: 'on'}]
		}
	],{name: 'Custom Style'});
	var customMapTypeId = 'custom_style';

	var infoWindow = new google.maps.InfoWindow({
		content: '<b> We are here! </b>'
	});

	var mapOptions = {
		zoom 		: 18,
		center 		: pos,
		mapTypeControlOptions : {
			mapTypeIds 	: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
		}
	}

	var map = new google.maps.Map($('.location')[0],mapOptions);

	map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);

	var image = {
		url  : 'images/map-marker.png'
	};

	var marker = new google.maps.Marker({
		position : pos,
		map 	 : map,
		icon : image,
		title 	 : 'We are here!'
	});

	google.maps.event.addListener(marker,'click',function(){
		infoWindow.open(map,marker);
	});

	google.maps.event.addDomListener(window,'resize',function(){
		var center = map.getCenter();
		google.maps.event.trigger(map,'resize');
		map.setCenter(center);
	});
}

$(document).ready(function(){

	$(document).scroll(function(){
		if ($(document).scrollTop()+$(window).height() - 100 >= $('.steps-figures').offset().top) {
			var el = $('.steps-figures li:nth-child(1)');
			el.find('.step-text .text-upper').addClass('mark-word');
			el.find('.step-color.front').animate({
				width: '100%'
			}, 3000);
		}

		var filling = false;

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
					if (!filling) filling = true;
				    if(id<elements.length){
				    	var elem = $(elements[id]);
				    	if (elem.css('display') == 'none') fill(id+1);
				    	else {
				    		var percent = '100%';
				    		if (elem.hasClass('front-color')) percent = '99%';
				    		elem.animate({width:percent}, speeds[id],"linear", function(){ fill(id+1)});
				    	} 
				    } 
				}

				if (!filling) fill(0);
				
			}
		}
	});

	$('.step-slider').slick({
		nextArrow: $('.services-next'),
  		prevArrow: $('.services-prev')
	});

	$('.step-slider').on('beforeChange',function(event,slick,current,next){

		var START = 0, END = 3;

		var format	  = '.steps-figures li:nth-child({number})', 
			elements  = '';

		var addComma = function(){
			return (elements == '') ? '' : ',';
		}

		var getOptions = function() {
			var condRemove = (next == START && current == END);
			var condAdd = (next == END && current == START);
			return 	condRemove 	? {method: 'removeClass',width:'0'} : 
					condAdd 	? {method:'addClass',width:'100%'} 	: 
					null;
		}

		var opt = getOptions();

		if (opt) {

			for (var i = START + 2; i <= END + 1; i++) {
				var selector = format.replace('{number}',i);
				elements += addComma() + selector + ' .step-color.front';
				$(selector + ' .step-text .text-upper')[opt.method]('mark-word');
			}

			$(elements).animate({
				width: opt.width
			}, 1500);
			return;
		}

		var isNext = next > current;

		var el = $('.steps-figures li:nth-child('+ (isNext ? next + 1 : next + 2) +')');
		el.find('.step-text .text-upper')[isNext ? 'addClass' : 'removeClass']('mark-word');
		el.find('.step-color.front').animate({
			width: (isNext ? '100%' : '0')
		}, 1500);
		
	});

	initializeMap();
});
