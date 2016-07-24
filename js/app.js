var eriotApp = angular.module('eriotApp',[]);

eriotApp.controller('LandingController',function($scope){

	$scope.menu = [{
		'title'	: ['Home'],
		'link'	: 'title'
	},{
		'title'	: ['Services'],
		'link'	: 'services', 
	},{
		'title'	: ['Devices'],
		'link'	: 'devices', 
	},{
		'title'	: ['Expertise'],
		'link'	: 'expertise'
	},{
		'title'	: ['Team'],
		'link'	: 'team'
	},{
		'title'	: ['Awards/Cases'],
		'link'	: 'awards-cases'
	},{
		'title'	: ['Contacts'],
		'link'	: 'contacts'
	}];

	$scope.devices = [{
		title :"Consumer Electronics",
		desc  :"Smart phones, eReaders, Tablets, eNotes etc."
	},{
		title:"Internet of Things",
		desc:"Fitness trackers, HealthCare and other devices"
	},{
		title :"Internet of Systems",
		desc  :"Smart home, tracking and control systems, gadgets' synchronization"
	},{
		title :"Others",
		desc  :"RobotoTechnic, Toys, Agro, Military, Embedded development, Engineering"
	}];

	$scope.steps = [{
		id : 1,
		articles : [{
			header : "What is inlucded to the package:",
			description : [
					"Examination of the idea, target audience and market;",
					"Evaluation of the production cost",
					"Choice of technology;",
					"Project works terms and schedules evaluation."
					]
		},{
			header : "What will you get as a result?",
			description : [
					"Understanding, whether the project will be profitable or not;",
					"Preliminary deadlines, schedules of design production, prototypes and production launch;",
					"Business consultations;",
					"Probably first investments for the project start."
					]
		}]
	},{
		id : 2,
		articles : [{
			header : "What is inlucded to the package:",
			description : [
					"Industrial Design;",
					"Electronical Design;",
					"Mechanical Design;",
					"UI Design."
					]
		},{
			header : "What will you get as a result?",
			description : ["Full set of schemes to create prototype"]
		}]
	},{
		id : 3,
		articles : [{
			header : "What is inlucded to the package:",
			description : ["Engineering samples;",
					"Design samples;",
					"Software;",
					"Pilot samples."
					]
		},{
			header : "What will you get as a result?",
			description : ["Ready and tested device prototype."]
		}]
	},{
		id : 4,
		articles : [{
			header : "What is inlucded to the package:",
			description : ["Contracts with factories;",
					"Preparation of project production documentation;",
					"Test samples of goods production for first preorders and first enquiries"]
		},{
			header : "What will you get as a result?",
			description : ["First produced goods to be sold"]
		}]
	}];

	$scope.scrollTo = function(id){
		$('body').animate({
			'scrollTop' : $('#'+id).offset().top
		},2000);
		var checked = $('.show-menu[checked]');
		checked.attr('checked',false);
	}

});

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

	$(document).on('submit','#callback_form',function(){
		var fields = $(this).children('.input_content');
		var form = $(this);
		$.ajax({
			type : 'POST',
			url  : 'sendEmail.php',
			data : {
				type 	: 'contact',
				name 	: fields.children('[name=name]').val(),
				company : fields.children('[name=company]').val(),
				phone 	: fields.children('[name=phone]').val(),
				email 	: fields.children('[name=email]').val()	
			},
			beforeSend : function(){
				form.hide();
				$('.overlay_loader').show();
			}
		}).done(function(data){
			$('.overlay_loader').hide();
			$('#callback_form').fadeOut();
			$('body').removeClass('modal-open');
			$('.thank-you-block').fadeIn();
			setTimeout(function(){
				form[0].reset();
				$('.thank-you-block,.overlay').fadeOut();
			},2000);
			console.log(data);
		});
	});

	$(document).on('submit','.get-details-form',function(){
		var form = $(this);
		$.ajax({
			type : 'POST',
			url  : 'sendEmail.php',
			data : {
				type 	: 'get-details',
				email 	: form.children('[name=email]').val()
			},
			beforeSend : function(){
				form.children('.details_loader').fadeIn();
			}
		}).done(function(data){
			$('.overlay,.thank-you-block').fadeIn();
			setTimeout(function(){
				form[0].reset();
				form.children('.details_loader').fadeOut();
				$('.thank-you-block,.overlay').fadeOut();
			},2000);
			console.log(data);
		});
	});

	$(document).on('submit','#message_form',function(){
		var form = $(this);
		$.ajax({
			type : 'POST',
			url  : 'sendEmail.php',
			data : {
				type 	: 'message',
				name 	: form.children('[name=name]').val(),
				phone 	: form.children('[name=phone]').val(),
				email 	: form.children('[name=email]').val(),
				message : form.children('[name=message]').val()
			},
			beforeSend : function(){
				form.children('.message_loader').fadeIn();
				form.children('[type=submit]').hide();
			}
		}).done(function(data){
			$('.overlay,.thank-you-block').fadeIn();
			setTimeout(function(){
				form[0].reset();
				form.children('.message_loader').fadeOut();
				form.children('[type=submit]').show();
				$('.thank-you-block,.overlay').fadeOut();
			},2000);
			console.log(data);
		});
	});

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

	$('body').on('click','#title .contacts-text,.contact-us-btn, .person:last-child',function(){
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
