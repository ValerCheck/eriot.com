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

});