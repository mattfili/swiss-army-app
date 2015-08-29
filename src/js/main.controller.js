angular.module('swiss')

.controller('mainController', function($scope, $http, GEOCODE, $timeout) {
	var vm = this;

	vm.display = true;

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

})

.controller('weatherController', function($scope, $timeout, Weather, WeatherData) {
	var vm = this;

		_.debounce(function() {
		Weather.getWeather()
		Weather.date()
		$scope.date = WeatherData.formatdate.toString()
		$scope.data = WeatherData
	},2000)();


})

.controller('newsController', function($scope, $timeout) {
	var vm = this;

})

.controller('todoController', function($scope, $timeout) {
	var vm = this;

})

