'use strict';

angular.module('swiss').factory('Weather', function (WeatherData, $http, $stateParams) {
  return {

    date: function date() {
      var day = new Date().toDateString().substring(0, 3);
      var month = new Date().toDateString().substring(3);
      if (day === 'Tue') {
        day = 'Tuesday';
      } else if (day === 'Wed') {
        day = 'Wednesday';
      } else if (day === 'Thur') {
        day = 'Thursday';
      } else if (day === 'Fri') {
        day = 'Friday';
      } else if (day === 'Sat') {
        day = 'Saturday';
      } else if (day === 'Sun') {
        day = 'Sunday';
      } else if (day === 'Mon') {
        day = 'Monday';
      }
      var datemonth = day + ',' + month;

      WeatherData.formatdate = datemonth;
    },

    getWeather: function getWeather() {
      $http.jsonp('/api/forecast/' + $stateParams.lat + ',' + $stateParams.long + '?callback=JSON_CALLBACK').success(function (data) {

        WeatherData.dataPush(data.currently, data.daily, data.hourly);

        var iconFrame = data.hourly.data;

        for (var i = 0; i < iconFrame.length; i++) if (iconFrame[i].icon === 'clear-day') {
          WeatherData.iconPush('sun.svg', i);
        } else if (iconFrame[i].icon === 'clear-night') {
          WeatherData.iconPush('moonPhase.svg', i);
        } else if (iconFrame[i].icon === 'rain' && iconFrame[i].summary === 'Rain') {
          WeatherData.iconPush('cloudRain.svg', i);
        } else if (iconFrame[i].summary === 'Light Rain') {
          WeatherData.iconPush('cloudDrizzleAlt.svg', i);
        } else if (iconFrame[i].icon === 'rain' && iconFrame[i].summary === 'Drizzle') {
          WeatherData.iconPush('cloudDrizzle.svg', i);
        } else if (iconFrame[i].icon === 'snow') {
          WeatherData.iconPush('cloudSnow.svg', i);
        } else if (iconFrame[i].icon === 'sleet') {
          WeatherData.iconPush('cloudSnowAlt.svg', i);
        } else if (iconFrame[i].icon === 'wind') {
          WeatherData.iconPush('wind.svg', i);
        } else if (iconFrame[i].icon === 'fog') {
          WeatherData.iconPush('cloudFog.svg', i);
        } else if (iconFrame[i].icon === 'cloudy') {
          WeatherData.iconPush('cloud.svg', i);
        } else if (iconFrame[i].icon === 'partly-cloudy-day') {
          WeatherData.iconPush('cloudSun.svg', i);
        } else if (iconFrame[i].icon === 'partly-cloudy-night') {
          WeatherData.iconPush('cloudMoon.svg', i);
        }

        var colorTime = data.hourly.data;

        for (var i = 0; i < colorTime.length; i++) {
          var unUnixDate = new Date(colorTime[i].time * 1000);
          var formattedDate = unUnixDate.getHours();

          if (formattedDate >= 0 && formattedDate <= 2 || formattedDate === 23) {
            WeatherData.colorPush('#071826', i);
          } else if (formattedDate >= 3 && formattedDate <= 5) {
            WeatherData.colorPush('#071940', i);
          } else if (formattedDate === 6) {
            WeatherData.colorPush('#FA6551', i);
          } else if (formattedDate >= 7 && formattedDate <= 11) {
            WeatherData.colorPush('#2A91CF', i);
          } else if (formattedDate >= 12 && formattedDate <= 15) {
            WeatherData.colorPush('#9DDEFF', i);
          } else if (formattedDate >= 16 && formattedDate <= 18) {
            WeatherData.colorPush('#2A91CF', i);
          } else if (formattedDate === 19) {
            WeatherData.colorPush('#FA6A67', i);
          } else if (formattedDate >= 20 && formattedDate <= 22) {
            WeatherData.colorPush('#133778', i);
          }
        }
      });
    }

  };
}).filter('Time', function () {
  return function (input) {
    var unUnixDate = new Date(input * 1000);
    var formattedDate = unUnixDate.getHours();
    if (formattedDate <= 23 && formattedDate >= 13) {
      var output = formattedDate - 12 + 'pm';
    } else if (formattedDate === 0) {
      var output = formattedDate + 12 + 'am';
    } else if (formattedDate === 12) {
      var output = formattedDate + 'pm';
    } else {
      var output = formattedDate + 'am';
    }
    return output;
  };
}).filter('Percent', function () {
  return function (input) {
    var output = input * 100;
    return output + '%';
    console.log(output);
  };
}).factory('Hacker', function ($http, paperBoy, $stateParams) {
  return {
    topNews: function topNews() {
      $http.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(function (result) {
        var idArray = result.data;
        angular.forEach(idArray, function (storyId, i) {
          if (i > 15) {
            return;
          }
          $http.get('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json?print=pretty').success(function (story) {
            paperBoy.dataPush(story);
          });
        });
      });
    },
    askStories: function askStories() {
      $http.get('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty').then(function (result) {
        var idArray = result.data;
        angular.forEach(idArray, function (storyId, i) {
          if (i > 15) {
            return;
          }
          $http.get('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json?print=pretty').success(function (ask) {
            paperBoy.askPush(ask);
          });
        });
      });
    },
    showStories: function showStories() {
      $http.get('https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty').then(function (result) {
        var idArray = result.data;
        angular.forEach(idArray, function (storyId, i) {
          if (i > 15) {
            return;
          }
          $http.get('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json?print=pretty').success(function (show) {
            paperBoy.showPush(show);
          });
        });
      });
    }
  };
}).factory('Auth', function (FIRE_URL, $firebaseAuth) {
  var ref = new Firebase(FIRE_URL);
  return $firebaseAuth(ref);
});
//# sourceMappingURL=data:application/json;base64,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T0FBTyxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQ3JCLG9CQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1dBQ3RCLENBQUMsQ0FBQTtTQUNMLENBQUMsQ0FBQTtPQUNILENBQUMsQ0FBQTtLQUNIO0FBQ0QsZUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLFdBQUssQ0FDSixHQUFHLENBQUMscUVBQXFFLENBQUMsQ0FDMUUsSUFBSSxDQUFDLFVBQVMsTUFBTSxFQUFFO0FBQ3JCLFlBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7QUFDekIsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsQ0FBQyxFQUFFO0FBQzdDLGNBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTtBQUFDLG1CQUFNO1dBQUM7QUFDcEIsZUFBSyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsR0FBRyxPQUFPLEdBQUcsb0JBQW9CLENBQUMsQ0FDdEYsT0FBTyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQ3RCLG9CQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1dBQ3hCLENBQUMsQ0FBQTtTQUNMLENBQUMsQ0FBQTtPQUNILENBQUMsQ0FBQTtLQUNIO0dBQ0YsQ0FBQTtDQUNGLENBQUMsQ0FDRCxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsUUFBUSxFQUFFLGFBQWEsRUFBRTtBQUNoRCxNQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxTQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM3QixDQUFDLENBQUEiLCJmaWxlIjoic3JjL2pzL2ZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnc3dpc3MnKVxuXG4uZmFjdG9yeSgnV2VhdGhlcicsIGZ1bmN0aW9uICggV2VhdGhlckRhdGEsICRodHRwLCAkc3RhdGVQYXJhbXMpIHtcbnJldHVybiB7XG5cbiAgZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRheSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDMpXG4gICAgdmFyIG1vbnRoID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKS5zdWJzdHJpbmcoMylcbiAgICBpZiAoZGF5ID09PSAnVHVlJykge1xuICAgICAgZGF5ID0gJ1R1ZXNkYXknXG4gICAgfSBlbHNlIGlmIChkYXkgPT09J1dlZCcpIHtcbiAgICAgIGRheSA9ICdXZWRuZXNkYXknXG4gICAgfSBlbHNlIGlmIChkYXkgPT09J1RodXInKSB7XG4gICAgICBkYXkgPSAnVGh1cnNkYXknXG4gICAgfSBlbHNlIGlmIChkYXkgPT09J0ZyaScpIHtcbiAgICAgIGRheSA9ICdGcmlkYXknXG4gICAgfSBlbHNlIGlmIChkYXkgPT09J1NhdCcpIHtcbiAgICAgIGRheSA9ICdTYXR1cmRheSdcbiAgICB9IGVsc2UgaWYgKGRheSA9PT0nU3VuJykge1xuICAgICAgZGF5ID0gJ1N1bmRheSdcbiAgICB9IGVsc2UgaWYgKGRheSA9PT0nTW9uJykge1xuICAgICAgZGF5ID0gJ01vbmRheSdcbiAgICB9XG4gICAgdmFyIGRhdGVtb250aCA9IGRheSArICcsJyArIG1vbnRoXG5cbiAgICBXZWF0aGVyRGF0YS5mb3JtYXRkYXRlID0gZGF0ZW1vbnRoXG4gIH0sXG5cbiAgZ2V0V2VhdGhlcjogZnVuY3Rpb24oKSB7XG4gICAgJGh0dHBcbiAgICAgIC5qc29ucCgnL2FwaS9mb3JlY2FzdC8nICsgJHN0YXRlUGFyYW1zLmxhdCArICcsJyArICRzdGF0ZVBhcmFtcy5sb25nICsgJz9jYWxsYmFjaz1KU09OX0NBTExCQUNLJylcbiAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKXtcblxuICAgICAgICBXZWF0aGVyRGF0YS5kYXRhUHVzaChkYXRhLmN1cnJlbnRseSwgZGF0YS5kYWlseSwgZGF0YS5ob3VybHkpIFxuICAgICAgICBcbiAgICAgICAgdmFyIGljb25GcmFtZSA9IGRhdGEuaG91cmx5LmRhdGFcblxuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9MDsgaSA8IGljb25GcmFtZS5sZW5ndGg7IGkrKylcblxuICAgICAgICAgIGlmIChpY29uRnJhbWVbaV0uaWNvbiAgPT09ICdjbGVhci1kYXknKSB7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5pY29uUHVzaCgnc3VuLnN2ZycsIGkpXG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGljb25GcmFtZVtpXS5pY29uID09PSdjbGVhci1uaWdodCcpIHtcbiAgICAgICAgICAgIFdlYXRoZXJEYXRhLmljb25QdXNoKCdtb29uUGhhc2Uuc3ZnJywgaSlcblxuICAgICAgICAgIH0gZWxzZSBpZiAoaWNvbkZyYW1lW2ldLmljb24gPT09J3JhaW4nICYmIGljb25GcmFtZVtpXS5zdW1tYXJ5PT09J1JhaW4nKSB7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5pY29uUHVzaCgnY2xvdWRSYWluLnN2ZycsIGkpXG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGljb25GcmFtZVtpXS5zdW1tYXJ5ID09PSAnTGlnaHQgUmFpbicpIHtcbiAgICAgICAgICAgIFdlYXRoZXJEYXRhLmljb25QdXNoKCdjbG91ZERyaXp6bGVBbHQuc3ZnJywgaSlcblxuICAgICAgICAgIH0gZWxzZSBpZiAoaWNvbkZyYW1lW2ldLmljb24gPT09ICdyYWluJyAmJiBpY29uRnJhbWVbaV0uc3VtbWFyeT09PSdEcml6emxlJykge1xuICAgICAgICAgICAgV2VhdGhlckRhdGEuaWNvblB1c2goJ2Nsb3VkRHJpenpsZS5zdmcnLCBpKVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChpY29uRnJhbWVbaV0uaWNvbiA9PT0nc25vdycpIHtcbiAgICAgICAgICAgIFdlYXRoZXJEYXRhLmljb25QdXNoKCdjbG91ZFNub3cuc3ZnJywgaSlcblxuICAgICAgICAgIH0gZWxzZSBpZiAoaWNvbkZyYW1lW2ldLmljb24gPT09J3NsZWV0Jykge1xuICAgICAgICAgICAgV2VhdGhlckRhdGEuaWNvblB1c2goJ2Nsb3VkU25vd0FsdC5zdmcnLCBpKVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChpY29uRnJhbWVbaV0uaWNvbiA9PT0nd2luZCcpIHtcbiAgICAgICAgICAgIFdlYXRoZXJEYXRhLmljb25QdXNoKCd3aW5kLnN2ZycsIGkpXG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGljb25GcmFtZVtpXS5pY29uID09PSdmb2cnKSB7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5pY29uUHVzaCgnY2xvdWRGb2cuc3ZnJywgaSlcblxuICAgICAgICAgIH0gZWxzZSBpZiAoaWNvbkZyYW1lW2ldLmljb24gPT09J2Nsb3VkeScpIHtcbiAgICAgICAgICAgIFdlYXRoZXJEYXRhLmljb25QdXNoKCdjbG91ZC5zdmcnLCBpKVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChpY29uRnJhbWVbaV0uaWNvbiA9PT0ncGFydGx5LWNsb3VkeS1kYXknKSB7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5pY29uUHVzaCgnY2xvdWRTdW4uc3ZnJywgaSlcblxuICAgICAgICAgIH0gZWxzZSBpZiAoaWNvbkZyYW1lW2ldLmljb24gPT09J3BhcnRseS1jbG91ZHktbmlnaHQnKSB7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5pY29uUHVzaCgnY2xvdWRNb29uLnN2ZycsIGkpXG4gICAgICAgICAgfVxuXG4gICAgICAgIFxuXG4gICAgICAgIHZhciBjb2xvclRpbWUgPSBkYXRhLmhvdXJseS5kYXRhXG5cbiAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgY29sb3JUaW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHVuVW5peERhdGUgPSBuZXcgRGF0ZShjb2xvclRpbWVbaV0udGltZSAqMTAwMClcbiAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0ZSA9IHVuVW5peERhdGUuZ2V0SG91cnMoKTtcblxuICAgICAgICBpZiAoZm9ybWF0dGVkRGF0ZSA+PSAwICYmIGZvcm1hdHRlZERhdGUgPD0yIHx8IGZvcm1hdHRlZERhdGUgPT09IDIzKSB7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5jb2xvclB1c2goJyMwNzE4MjYnLCBpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlZERhdGUgPj0zICYmIGZvcm1hdHRlZERhdGUgPD0gNSl7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5jb2xvclB1c2goJyMwNzE5NDAnLCBpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlZERhdGUgPT09IDYgKXtcbiAgICAgICAgICAgIFdlYXRoZXJEYXRhLmNvbG9yUHVzaCgnI0ZBNjU1MScsIGkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0dGVkRGF0ZSA+PSA3ICYmIGZvcm1hdHRlZERhdGUgPD0xMSApe1xuICAgICAgICAgICAgV2VhdGhlckRhdGEuY29sb3JQdXNoKCcjMkE5MUNGJywgaSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZWREYXRlID49IDEyICYmIGZvcm1hdHRlZERhdGUgPD0gMTUpe1xuICAgICAgICAgICAgV2VhdGhlckRhdGEuY29sb3JQdXNoKCcjOURERUZGJywgaSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZWREYXRlID49IDE2ICYmIGZvcm1hdHRlZERhdGUgPD0gMTgpe1xuICAgICAgICAgICAgV2VhdGhlckRhdGEuY29sb3JQdXNoKCcjMkE5MUNGJywgaSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZWREYXRlID09PSAxOSl7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5jb2xvclB1c2goJyNGQTZBNjcnLCBpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlZERhdGUgPj0gMjAgJiYgZm9ybWF0dGVkRGF0ZSA8PSAyMil7XG4gICAgICAgICAgICBXZWF0aGVyRGF0YS5jb2xvclB1c2goJyMxMzM3NzgnLCBpKTtcbiAgICAgICAgICB9IFxuICAgICAgfVxuXG4gICAgfSlcblxuXG4gIH1cblxufVxufSlcblxuLmZpbHRlcignVGltZScsIGZ1bmN0aW9uICgpIHtcbnJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuICAgIHZhciB1blVuaXhEYXRlID0gbmV3IERhdGUoaW5wdXQqMTAwMClcbiAgICB2YXIgZm9ybWF0dGVkRGF0ZSA9IHVuVW5peERhdGUuZ2V0SG91cnMoKTtcbiAgICAgIGlmIChmb3JtYXR0ZWREYXRlIDw9IDIzICYmIGZvcm1hdHRlZERhdGUgPj0gMTMpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdHRlZERhdGUtMTIgKyAncG0nXG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlZERhdGUgPT09IDApe1xuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0dGVkRGF0ZSsxMiArICdhbSdcbiAgICAgIH0gZWxzZSBpZiAoZm9ybWF0dGVkRGF0ZSA9PT0gMTIpe1xuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0dGVkRGF0ZSArICdwbSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXR0ZWREYXRlICsgJ2FtJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59KVxuXG4uZmlsdGVyKCdQZXJjZW50JywgZnVuY3Rpb24gKCkge1xucmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgdmFyIG91dHB1dCA9IGlucHV0ICogMTAwXG4gICAgcmV0dXJuIG91dHB1dCArICclJ1xuICAgIGNvbnNvbGUubG9nKG91dHB1dClcbn1cbn0pXG5cbi5mYWN0b3J5KCdIYWNrZXInLCBmdW5jdGlvbiAoJGh0dHAsIHBhcGVyQm95LCAkc3RhdGVQYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3BOZXdzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkaHR0cFxuICAgICAgLmdldCgnaHR0cHM6Ly9oYWNrZXItbmV3cy5maXJlYmFzZWlvLmNvbS92MC90b3BzdG9yaWVzLmpzb24/cHJpbnQ9cHJldHR5JylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICB2YXIgaWRBcnJheSA9IHJlc3VsdC5kYXRhXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpZEFycmF5LCBmdW5jdGlvbiAoc3RvcnlJZCwgaSkge1xuICAgICAgICAgIGlmIChpID4gMTUpIHtyZXR1cm59XG4gICAgICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2hhY2tlci1uZXdzLmZpcmViYXNlaW8uY29tL3YwL2l0ZW0vJyArIHN0b3J5SWQgKyAnLmpzb24/cHJpbnQ9cHJldHR5JylcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHN0b3J5KSB7XG4gICAgICAgICAgICAgIHBhcGVyQm95LmRhdGFQdXNoKHN0b3J5KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBhc2tTdG9yaWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkaHR0cFxuICAgICAgLmdldCgnaHR0cHM6Ly9oYWNrZXItbmV3cy5maXJlYmFzZWlvLmNvbS92MC9hc2tzdG9yaWVzLmpzb24/cHJpbnQ9cHJldHR5JylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICB2YXIgaWRBcnJheSA9IHJlc3VsdC5kYXRhXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpZEFycmF5LCBmdW5jdGlvbiAoc3RvcnlJZCwgaSkge1xuICAgICAgICAgIGlmIChpID4gMTUpIHtyZXR1cm59XG4gICAgICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2hhY2tlci1uZXdzLmZpcmViYXNlaW8uY29tL3YwL2l0ZW0vJyArIHN0b3J5SWQgKyAnLmpzb24/cHJpbnQ9cHJldHR5JylcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGFzaykge1xuICAgICAgICAgICAgICBwYXBlckJveS5hc2tQdXNoKGFzaylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgc2hvd1N0b3JpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICRodHRwXG4gICAgICAuZ2V0KCdodHRwczovL2hhY2tlci1uZXdzLmZpcmViYXNlaW8uY29tL3YwL3Nob3dzdG9yaWVzLmpzb24/cHJpbnQ9cHJldHR5JylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICB2YXIgaWRBcnJheSA9IHJlc3VsdC5kYXRhXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpZEFycmF5LCBmdW5jdGlvbiAoc3RvcnlJZCwgaSkge1xuICAgICAgICAgIGlmIChpID4gMTUpIHtyZXR1cm59XG4gICAgICAgICAgJGh0dHAuZ2V0KCdodHRwczovL2hhY2tlci1uZXdzLmZpcmViYXNlaW8uY29tL3YwL2l0ZW0vJyArIHN0b3J5SWQgKyAnLmpzb24/cHJpbnQ9cHJldHR5JylcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNob3cpIHtcbiAgICAgICAgICAgICAgcGFwZXJCb3kuc2hvd1B1c2goc2hvdylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcbi5mYWN0b3J5KCdBdXRoJywgZnVuY3Rpb24gKEZJUkVfVVJMLCAkZmlyZWJhc2VBdXRoKSB7XG4gICAgdmFyIHJlZiA9IG5ldyBGaXJlYmFzZShGSVJFX1VSTCk7XG4gICAgcmV0dXJuICRmaXJlYmFzZUF1dGgocmVmKTtcbn0pIl19
