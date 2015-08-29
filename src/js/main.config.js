angular.module('swiss', ['ui.router','foundation', 'foundation.common', 'ngAnimate', 'mm.foundation'])

.constant('GEOCODE', 'https://maps.googleapis.com/maps/api/geocode/json')


.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.when('', '/landing');
	$urlRouterProvider.otherwise('/landing');

	$locationProvider.html5Mode({
		enabled: false,
		requireBase: false
	});

	$stateProvider
	.state('start', {
		url: '/landing',
	    templateUrl: 'assets/landing.html',
	   	controller: 'mainController',
	    controllerAs: 'Ctrl'
  	})

	.state('start.engage', {
		url: '/:city/:lat/:long',
	    views: {
	      'weather': {
	        templateUrl: 'assets/weather.html',
	        controller: 'weatherController',
	        controllerAs: 'wCtrl'
	      },
	      'news': {
	        templateUrl: 'assets/news.html',
	        controller: 'newsController',
	        controllerAs: 'nCtrl'
	      },
	      'toDo': {
	        templateUrl: 'assets/news.html',
	        controller: 'todoController',
	        controllerAs: 'tdCtrl'
	      }
	    }
	})
})
