angular.module('swiss', ['ui.router','foundation', 'foundation.common', 'ngAnimate', 'mm.foundation', 'firebase', 'wu.masonry'])

.constant('GEOCODE', 'https://maps.googleapis.com/maps/api/geocode/json')

.constant('FIRE_URL', 'https://swa.firebaseio.com/')

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
	    },
	    resolve: {
	    	'currentAuth': function (Auth) {
	    		return Auth.$waitForAuth();
	    	}
	    }
	})
})


.run(function($rootScope, $state) {
	$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  		if (error === "AUTH_REQUIRED") {
    		$state.go('/landing');
  		}
	});
})

