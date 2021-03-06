'use strict';

angular.module('swiss', ['ui.router', 'foundation', 'foundation.common', 'ngAnimate', 'mm.foundation', 'firebase', 'wu.masonry']).constant('GEOCODE', 'https://maps.googleapis.com/maps/api/geocode/json').constant('FIRE_URL', 'https://swa.firebaseio.com/').constant('WEATHER_URL', 'https://api.forecast.io/forecast/a47fe05b83da643fd561f7e57e4ca650/').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.when('', '/landing');
	$urlRouterProvider.otherwise('/landing');

	$locationProvider.html5Mode({
		enabled: false,
		requireBase: false
	});

	$stateProvider.state('start', {
		url: '/landing',
		templateUrl: 'assets/landing.html',
		controller: 'mainController',
		controllerAs: 'Ctrl'
	}).state('start.news', {
		url: '/yComb',
		views: {
			'news': {
				templateUrl: 'assets/news.html',
				controller: 'newsController',
				controllerAs: 'nCtrl'
			}
		},
		resolve: {
			'currentAuth': function currentAuth(Auth) {
				return Auth.$waitForAuth();
			}
		}
	}).state('start.weathers', {
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
			'currentAuth': function currentAuth(Auth) {
				return Auth.$waitForAuth();
			}
		}
	});
}).run(function ($rootScope, $state) {
	$rootScope.$on("$routeChangeError", function (event, next, previous, error) {
		if (error === "AUTH_REQUIRED") {
			$state.go('/landing');
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9tYWluLmNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUUvSCxRQUFRLENBQUMsU0FBUyxFQUFFLG1EQUFtRCxDQUFDLENBRXhFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsNkJBQTZCLENBQUMsQ0FFbkQsUUFBUSxDQUFDLGFBQWEsRUFBRSxvRUFBb0UsQ0FBQyxDQUU3RixNQUFNLENBQUMsVUFBVSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUU7QUFDeEUsbUJBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4QyxtQkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXpDLGtCQUFpQixDQUFDLFNBQVMsQ0FBQztBQUMzQixTQUFPLEVBQUUsS0FBSztBQUNkLGFBQVcsRUFBRSxLQUFLO0VBQ2xCLENBQUMsQ0FBQzs7QUFFSCxlQUFjLENBQ2IsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNmLEtBQUcsRUFBRSxVQUFVO0FBQ1osYUFBVyxFQUFFLHFCQUFxQjtBQUNsQyxZQUFVLEVBQUUsZ0JBQWdCO0FBQzVCLGNBQVksRUFBRSxNQUFNO0VBQ3JCLENBQUMsQ0FFRCxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQ3RCLEtBQUcsRUFBRSxRQUFRO0FBQ1YsT0FBSyxFQUFFO0FBQ04sU0FBTSxFQUFFO0FBQ0wsZUFBVyxFQUFFLGtCQUFrQjtBQUMvQixjQUFVLEVBQUUsZ0JBQWdCO0FBQzVCLGdCQUFZLEVBQUUsT0FBTztJQUN0QjtHQUNGO0FBQ0QsU0FBTyxFQUFFO0FBQ1IsZ0JBQWEsRUFBRSxxQkFBVSxJQUFJLEVBQUU7QUFDOUIsV0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0I7R0FDRDtFQUNGLENBQUMsQ0FFSCxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7QUFDeEIsS0FBRyxFQUFFLG1CQUFtQjtBQUNyQixPQUFLLEVBQUU7QUFDTCxZQUFTLEVBQUU7QUFDVCxlQUFXLEVBQUUscUJBQXFCO0FBQ2xDLGNBQVUsRUFBRSxtQkFBbUI7QUFDL0IsZ0JBQVksRUFBRSxPQUFPO0lBQ3RCO0FBQ0QsU0FBTSxFQUFFO0FBQ04sZUFBVyxFQUFFLGtCQUFrQjtBQUMvQixjQUFVLEVBQUUsZ0JBQWdCO0FBQzVCLGdCQUFZLEVBQUUsUUFBUTtJQUN2QjtHQUNGO0FBQ0QsU0FBTyxFQUFFO0FBQ1IsZ0JBQWEsRUFBRSxxQkFBVSxJQUFJLEVBQUU7QUFDOUIsV0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0I7R0FDRDtFQUNKLENBQUMsQ0FBQTtDQUNGLENBQUMsQ0FHRCxHQUFHLENBQUMsVUFBUyxVQUFVLEVBQUUsTUFBTSxFQUFFO0FBQ2pDLFdBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBUyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDeEUsTUFBSSxLQUFLLEtBQUssZUFBZSxFQUFFO0FBQzdCLFNBQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDdkI7RUFDSCxDQUFDLENBQUM7Q0FDSCxDQUFDLENBQUEiLCJmaWxlIjoic3JjL2pzL21haW4uY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3N3aXNzJywgWyd1aS5yb3V0ZXInLCdmb3VuZGF0aW9uJywgJ2ZvdW5kYXRpb24uY29tbW9uJywgJ25nQW5pbWF0ZScsICdtbS5mb3VuZGF0aW9uJywgJ2ZpcmViYXNlJywgJ3d1Lm1hc29ucnknXSlcblxuLmNvbnN0YW50KCdHRU9DT0RFJywgJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24nKVxuXG4uY29uc3RhbnQoJ0ZJUkVfVVJMJywgJ2h0dHBzOi8vc3dhLmZpcmViYXNlaW8uY29tLycpXG5cbi5jb25zdGFudCgnV0VBVEhFUl9VUkwnLCAnaHR0cHM6Ly9hcGkuZm9yZWNhc3QuaW8vZm9yZWNhc3QvYTQ3ZmUwNWI4M2RhNjQzZmQ1NjFmN2U1N2U0Y2E2NTAvJylcblxuLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblx0JHVybFJvdXRlclByb3ZpZGVyLndoZW4oJycsICcvbGFuZGluZycpO1xuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbGFuZGluZycpO1xuXG5cdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XG5cdFx0ZW5hYmxlZDogZmFsc2UsXG5cdFx0cmVxdWlyZUJhc2U6IGZhbHNlXG5cdH0pO1xuXG5cdCRzdGF0ZVByb3ZpZGVyXG5cdC5zdGF0ZSgnc3RhcnQnLCB7XG5cdFx0dXJsOiAnL2xhbmRpbmcnLFxuXHQgICAgdGVtcGxhdGVVcmw6ICdhc3NldHMvbGFuZGluZy5odG1sJyxcblx0ICAgXHRjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInLFxuXHQgICAgY29udHJvbGxlckFzOiAnQ3RybCdcbiAgXHR9KVxuXG4gIFx0LnN0YXRlKCdzdGFydC5uZXdzJywge1xuXHRcdHVybDogJy95Q29tYicsXG5cdCAgICB2aWV3czoge1xuXHQgICAgICduZXdzJzoge1xuXHQgICAgICAgIHRlbXBsYXRlVXJsOiAnYXNzZXRzL25ld3MuaHRtbCcsXG5cdCAgICAgICAgY29udHJvbGxlcjogJ25ld3NDb250cm9sbGVyJyxcblx0ICAgICAgICBjb250cm9sbGVyQXM6ICduQ3RybCdcblx0ICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHJlc29sdmU6IHtcblx0ICAgIFx0J2N1cnJlbnRBdXRoJzogZnVuY3Rpb24gKEF1dGgpIHtcblx0ICAgIFx0XHRyZXR1cm4gQXV0aC4kd2FpdEZvckF1dGgoKTtcblx0ICAgIFx0fVxuXHQgICAgfVxuICBcdH0pXG5cblx0LnN0YXRlKCdzdGFydC53ZWF0aGVycycsIHtcblx0XHR1cmw6ICcvOmNpdHkvOmxhdC86bG9uZycsXG5cdCAgICB2aWV3czoge1xuXHQgICAgICAnd2VhdGhlcic6IHtcblx0ICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fzc2V0cy93ZWF0aGVyLmh0bWwnLFxuXHQgICAgICAgIGNvbnRyb2xsZXI6ICd3ZWF0aGVyQ29udHJvbGxlcicsXG5cdCAgICAgICAgY29udHJvbGxlckFzOiAnd0N0cmwnXG5cdCAgICAgIH0sXG5cdCAgICAgICd0b0RvJzoge1xuXHQgICAgICAgIHRlbXBsYXRlVXJsOiAnYXNzZXRzL25ld3MuaHRtbCcsXG5cdCAgICAgICAgY29udHJvbGxlcjogJ3RvZG9Db250cm9sbGVyJyxcblx0ICAgICAgICBjb250cm9sbGVyQXM6ICd0ZEN0cmwnXG5cdCAgICAgIH1cblx0ICAgIH0sXG5cdCAgICByZXNvbHZlOiB7XG5cdCAgICBcdCdjdXJyZW50QXV0aCc6IGZ1bmN0aW9uIChBdXRoKSB7XG5cdCAgICBcdFx0cmV0dXJuIEF1dGguJHdhaXRGb3JBdXRoKCk7XG5cdCAgICBcdH1cblx0ICAgIH1cblx0fSlcbn0pXG5cblxuLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUpIHtcblx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgcHJldmlvdXMsIGVycm9yKSB7XG4gIFx0XHRpZiAoZXJyb3IgPT09IFwiQVVUSF9SRVFVSVJFRFwiKSB7XG4gICAgXHRcdCRzdGF0ZS5nbygnL2xhbmRpbmcnKTtcbiAgXHRcdH1cblx0fSk7XG59KVxuXG4iXX0=
