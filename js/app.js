var eriotApp = angular.module('eriotApp',[]);

eriotApp.controller('LandingController',function($scope){

	$scope.menu = [{
		'title'	: ['Home'],
		'link'	: '#'
	},{
		'title'	: ['Services'],
		'link'	: '#', 
	},{
		'title'	: ['Expertise'],
		'link'	: '#'
	},{
		'title'	: ['Team'],
		'link'	: '#'
	},{
		'title'	: ['Awards/Cases'],
		'link'	: '#'
	},{
		'title'	: ['Contacts'],
		'link'	: '#'
	}];

});