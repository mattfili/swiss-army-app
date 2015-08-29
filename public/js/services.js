'use strict';

angular.module('swiss').service('WeatherData', function () {
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
		this.hourly.data[i].color = color;
	};

	this.iconPush = function (icon, i) {
		this.hourly.data[i].icon = icon;
	};
}).factory('Settings', function () {
	return {
		scale: 'F',
		precision: 1
	};
}).factory('LocalStorage', function () {
	return {
		storeScale: function storeScale(data) {
			localStorage.scale = data;
		},
		storePrecision: function storePrecision(data) {
			localStorage.precision = data;
		}

	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBRXRCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBVztBQUNsQyxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQixLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixLQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7QUFFZCxLQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDakQsTUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7QUFDekIsTUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7RUFDckIsQ0FBQzs7QUFFRixLQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsS0FBSyxFQUFFLENBQUMsRUFBRTtBQUNwQyxNQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0VBQ2pDLENBQUM7O0FBRUYsS0FBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUU7QUFDbEMsTUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtFQUMvQixDQUFDO0NBRUYsQ0FBQyxDQUVELE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBVTtBQUM5QixRQUFPO0FBQ04sT0FBSyxFQUFFLEdBQUc7QUFDVixXQUFTLEVBQUUsQ0FBQztFQUNaLENBQUE7Q0FDRCxDQUFDLENBRUQsT0FBTyxDQUFDLGNBQWMsRUFBRSxZQUFZO0FBQ3BDLFFBQU87QUFDTixZQUFVLEVBQUUsb0JBQVMsSUFBSSxFQUFFO0FBQzFCLGVBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0dBQ3pCO0FBQ0QsZ0JBQWMsRUFBRSx3QkFBUyxJQUFJLEVBQUU7QUFDOUIsZUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7R0FDN0I7O0VBRUQsQ0FBQTtDQUNELENBQUMsQ0FBQSIsImZpbGUiOiJzcmMvanMvc2VydmljZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnc3dpc3MnKVxuXG4uc2VydmljZSgnV2VhdGhlckRhdGEnLCBmdW5jdGlvbigpIHtcblx0dGhpcy5jdXJyZW50bHkgPSB7fTtcblx0dGhpcy5ob3VybHkgPSB7fTtcblx0dGhpcy5kYWlseSA9IHt9O1xuXHR0aGlzLmZvcm1hdGRhdGUgPSB7fTtcblx0dGhpcy5pbWcgPSB7fTtcblxuXHR0aGlzLmRhdGFQdXNoID0gZnVuY3Rpb24gKGN1cnJlbnQsIGRhaWx5LCBob3VybHkpIHtcblx0XHR0aGlzLmN1cnJlbnRseSA9IGN1cnJlbnQ7XG5cdFx0dGhpcy5kYWlseSA9IGRhaWx5O1xuXHRcdHRoaXMuaG91cmx5ID0gaG91cmx5O1xuXHR9O1xuXG5cdHRoaXMuY29sb3JQdXNoID0gZnVuY3Rpb24gKGNvbG9yLCBpKSB7XG5cdFx0dGhpcy5ob3VybHkuZGF0YVtpXS5jb2xvciA9IGNvbG9yXG5cdH07XG5cblx0dGhpcy5pY29uUHVzaCA9IGZ1bmN0aW9uIChpY29uLCBpKSB7XG5cdFx0dGhpcy5ob3VybHkuZGF0YVtpXS5pY29uID0gaWNvblxuXHR9O1xuXG59KVxuXG4uZmFjdG9yeSgnU2V0dGluZ3MnLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHNjYWxlOiAnRicsXG5cdFx0cHJlY2lzaW9uOiAxXG5cdH1cbn0pXG5cbi5mYWN0b3J5KCdMb2NhbFN0b3JhZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XG5cdFx0c3RvcmVTY2FsZTogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNjYWxlID0gZGF0YVxuXHRcdH0sXG5cdFx0c3RvcmVQcmVjaXNpb246IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5wcmVjaXNpb24gPSBkYXRhXG5cdFx0fVxuXG5cdH1cbn0pIl19
