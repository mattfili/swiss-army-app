angular.module('swiss', ['ui.router','foundation', 'foundation.common', 'ngAnimate', 'mm.foundation', 'firebase', 'wu.masonry'])

.constant('GEOCODE', 'https://maps.googleapis.com/maps/api/geocode/json')

.constant('FIRE_URL', 'https://swa.firebaseio.com/')

.constant('WEATHER_URL', 'https://api.forecast.io/forecast/a47fe05b83da643fd561f7e57e4ca650/')

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

  	.state('start.news', {
		url: '/yComb',
	    views: {
	     'news': {
	        templateUrl: 'assets/news.html',
	        controller: 'newsController',
	        controllerAs: 'nCtrl'
	      }
	    },
	    resolve: {
	    	'currentAuth': function (Auth) {
	    		return Auth.$waitForAuth();
	    	}
	    }
  	})

	.state('start.weathers', {
		url: '/:city/:lat/:long',
	    views: {
	      'weather': {
	        templateUrl: 'assets/weather.html',
	        controller: 'weatherController',
	        controllerAs: 'wCtrl'
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

