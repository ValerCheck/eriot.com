var eriotApp = angular.module('eriotApp',[]);

function loadMapScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.id = "googleMaps"
	script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initializeMap";
	document.body.appendChild(script);
}

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

	$('.block').toArray().forEach(function(el){
		$(el).prepend('<input type="checkbox" class="show-menu" role="button"/>');
	});

	$(document).scroll(function(){
		var expLineTrigger = parseFloat($('.exp-line-area .line:last .color').css('width'));
		var stepsTrigger = parseFloat($('.steps-figures li:first-child .step-color.front').css('width'));

		if ($(document).scrollTop()+$(window).height() - 100 >= $('.steps-figures').offset().top &&
			stepsTrigger == 0) {
			var el = $('.steps-figures li:nth-child(1)');
			el.find('.step-text .text-upper').addClass('mark-word');
			el.find('.step-color.front').animate({
				width: '100%'
			}, 3000);
		}

		var filling = false;

		if ($(document).scrollTop()+$(window).height() - 100 >= $('.exp-line-area').offset().top &&
			expLineTrigger == 0) {
			
			var lineElements = $('.exp-line-area > *');
			var elements = [];
			var time = 3000;

			var addElements = function(obj) {
				if (!obj) return;
				if (obj.className == 'color' ||
					obj.className == 'front-color') {
					elements.push(obj);
					return;
				}
				var children = (typeof(obj.children) == 'object') ? 
								obj.children : 
								obj.children();
				if (children.length) {
					var objs = [];
					for (var i = 0; i < children.length; i++)
						addElements(children[i]);
				}
			}

			addElements(lineElements);

			var lengths = elements.map(function(elem){
				return parseFloat($(elem).parent().css('width'));
			});

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
	});

	$('body').on('click','.asideMenuBurger',function(){
		
		var checked = $('.show-menu[checked]');

		var parent = $(this).parents('.block');

		var showMenu = parent.children('.show-menu');

		if (checked && checked[0] != showMenu[0]) checked.attr('checked',false);

		showMenu.attr('checked',!showMenu.attr('checked'));

		if (showMenu.attr('checked'))
			$('body').animate({
				'scrollTop' : parent.offset().top
			});
	});

	$('body').on('click','.contacts-text,.contact-us-btn, .person:last-child',function(){
		$('.overlay,#callback_form').fadeIn();
		$('body').addClass('modal-open');
	});

	$('body').on('click','.close_btn',function(){
		$('.overlay,#callback_form').fadeOut();
		$('body').removeClass('modal-open');
	});

	$('body').on('click','.overlay',function(event){
		if (event.target.className != 'overlay') return;
		$('.overlay,#callback_form').fadeOut();
		$('body').removeClass('modal-open');
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
});
