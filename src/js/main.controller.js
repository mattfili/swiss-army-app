angular.module('swiss')

.controller('mainController', function($scope, $http, GEOCODE, $timeout, Auth, $firebaseAuth, LocalStorage, $rootScope, $state) {
	var vm = this;

	vm.display = true;
	vm.auth = Auth;


	vm.auth.$onAuth(function (authData) {
		if (authData) {
			vm.profile = authData;
			console.log('logged in as' + authData);
		} else {
			console.log('logged out');
			$state.go('start');
		}
	})



	vm.queryChanged = _.debounce(function () {
		$http
		.get(GEOCODE, {
			params: {address: vm.query}
		})
		.success(function(data){
			vm.cities = data.results
			vm.display = false;
		})

	}, 2000);

	vm.check = {
		weather: false,
		news: false,
		toDo: false
	}

	$rootScope.$on('$stateChangeSuccess', function (event, toState) {
		vm.cities = null;
	})

})

.controller('weatherController', function($scope, $timeout, Weather, WeatherData, currentAuth) {
	var vm = this;

	_.debounce(function() {
		Weather.getWeather()
		Weather.date()
		vm.date = WeatherData.formatdate.toString()
		vm.data = WeatherData
	},2000)();


})

.controller('newsController', function(Hacker, paperBoy, $scope, $timeout, currentAuth, $sce, FB, $firebaseObject) {
	var vm = this;
	Hacker.topNews();
	Hacker.askStories();
	Hacker.showStories();
	vm.hackerNews = paperBoy.hackerNews;

	vm.isActive = false;

	vm.favorite = function () {
		FB.$save()
	}


})

.controller('todoController', function($scope, $timeout, currentAuth) {
	var vm = this;

})

