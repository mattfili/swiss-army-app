angular.module('swiss')

.service('WeatherData', function() {
	this.currently = {};
	this.hourly = {};
	this.daily = {};
	this.formatdate = {};
	this.img = {};

	this.dataPush = function (current, daily, hourly) {
		this.currently = current;
		this.daily = daily;
		this.hourly = hourly;
	};

	this.colorPush = function (color, i) {
		this.hourly.data[i].color = color
	};

	this.iconPush = function (icon, i) {
		this.hourly.data[i].icon = icon
	};

})

.factory('Settings', function(){
	return {
		scale: 'F',
		precision: 1
	}
})

.factory('LocalStorage', function () {
	return {
		storeProfile: function(data) {
			localStorage.profile = data
		},
		storePrecision: function(data) {
			localStorage.precision = data
		}

	}
})

.service('paperBoy', function() {
	this.hackerNews = {
		news: [],
		ask: [],
		show: []
	}

	this.dataPush = function (news) {
		this.hackerNews.news.push(news);
	}

	this.askPush = function (ask) {
		this.hackerNews.ask.push(ask)
	}

	this.showPush = function (show) {
		this.hackerNews.show.push(show)
	}

})