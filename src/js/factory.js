angular.module('swiss')

.factory('Weather', function ( WeatherData, $http, $stateParams, WEATHER_URL) {
return {

  date: function() {
    var day = new Date().toDateString().substring(0, 3)
    var month = new Date().toDateString().substring(3)
    if (day === 'Tue') {
      day = 'Tuesday'
    } else if (day ==='Wed') {
      day = 'Wednesday'
    } else if (day ==='Thur') {
      day = 'Thursday'
    } else if (day ==='Fri') {
      day = 'Friday'
    } else if (day ==='Sat') {
      day = 'Saturday'
    } else if (day ==='Sun') {
      day = 'Sunday'
    } else if (day ==='Mon') {
      day = 'Monday'
    }
    var datemonth = day + ',' + month

    WeatherData.formatdate = datemonth
  },

  getWeather: function() {
    $http
      .jsonp(WEATHER_URL + $stateParams.lat + ',' + $stateParams.long + '?callback=JSON_CALLBACK')
      .success(function (data){

        WeatherData.dataPush(data.currently, data.daily, data.hourly) 
        
        var iconFrame = data.hourly.data



        for (var i =0; i < iconFrame.length; i++)

          if (iconFrame[i].icon  === 'clear-day') {
            WeatherData.iconPush('sun.svg', i)

          } else if (iconFrame[i].icon ==='clear-night') {
            WeatherData.iconPush('moonPhase.svg', i)

          } else if (iconFrame[i].icon ==='rain' && iconFrame[i].summary==='Rain') {
            WeatherData.iconPush('cloudRain.svg', i)

          } else if (iconFrame[i].summary === 'Light Rain') {
            WeatherData.iconPush('cloudDrizzleAlt.svg', i)

          } else if (iconFrame[i].icon === 'rain' && iconFrame[i].summary==='Drizzle') {
            WeatherData.iconPush('cloudDrizzle.svg', i)

          } else if (iconFrame[i].icon ==='snow') {
            WeatherData.iconPush('cloudSnow.svg', i)

          } else if (iconFrame[i].icon ==='sleet') {
            WeatherData.iconPush('cloudSnowAlt.svg', i)

          } else if (iconFrame[i].icon ==='wind') {
            WeatherData.iconPush('wind.svg', i)

          } else if (iconFrame[i].icon ==='fog') {
            WeatherData.iconPush('cloudFog.svg', i)

          } else if (iconFrame[i].icon ==='cloudy') {
            WeatherData.iconPush('cloud.svg', i)

          } else if (iconFrame[i].icon ==='partly-cloudy-day') {
            WeatherData.iconPush('cloudSun.svg', i)

          } else if (iconFrame[i].icon ==='partly-cloudy-night') {
            WeatherData.iconPush('cloudMoon.svg', i)
          }

        

        var colorTime = data.hourly.data

        for (var i=0; i < colorTime.length; i++) {
          var unUnixDate = new Date(colorTime[i].time *1000)
          var formattedDate = unUnixDate.getHours();

        if (formattedDate >= 0 && formattedDate <=2 || formattedDate === 23) {
            WeatherData.colorPush('#071826', i);
          } else if (formattedDate >=3 && formattedDate <= 5){
            WeatherData.colorPush('#071940', i);
          } else if (formattedDate === 6 ){
            WeatherData.colorPush('#FA6551', i);
          } else if (formattedDate >= 7 && formattedDate <=11 ){
            WeatherData.colorPush('#2A91CF', i);
          } else if (formattedDate >= 12 && formattedDate <= 15){
            WeatherData.colorPush('#9DDEFF', i);
          } else if (formattedDate >= 16 && formattedDate <= 18){
            WeatherData.colorPush('#2A91CF', i);
          } else if (formattedDate === 19){
            WeatherData.colorPush('#FA6A67', i);
          } else if (formattedDate >= 20 && formattedDate <= 22){
            WeatherData.colorPush('#133778', i);
          } 
      }

    })


  }

}
})

.filter('Time', function () {
return function(input) {
    var unUnixDate = new Date(input*1000)
    var formattedDate = unUnixDate.getHours();
      if (formattedDate <= 23 && formattedDate >= 13) {
        var output = formattedDate-12 + 'pm'
      } else if (formattedDate === 0){
        var output = formattedDate+12 + 'am'
      } else if (formattedDate === 12){
        var output = formattedDate + 'pm'
      } else {
        var output = formattedDate + 'am'
      }
      return output;
    }
})

.filter('Percent', function () {
return function(input) {
    var output = input * 100
    return output + '%'
    console.log(output)
}
})

.factory('Hacker', function ($http, paperBoy, $stateParams) {
  return {
    topNews: function () {
      $http
      .get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(function(result) {
        var idArray = result.data
        angular.forEach(idArray, function (storyId, i) {
          if (i > 25) {return}
          $http.get('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json?print=pretty')
            .success(function(story) {
              paperBoy.dataPush(story)
            })
        })
      })
    },
    askStories: function () {
      $http
      .get('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
      .then(function(result) {
        var idArray = result.data
        angular.forEach(idArray, function (storyId, i) {
          if (i > 25) {return}
          $http.get('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json?print=pretty')
            .success(function(ask) {
              paperBoy.askPush(ask)
            })
        })
      })
    },
    showStories: function () {
      $http
      .get('https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty')
      .then(function(result) {
        var idArray = result.data
        angular.forEach(idArray, function (storyId, i) {
          if (i > 25) {return}
          $http.get('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json?print=pretty')
            .success(function(show) {
              paperBoy.showPush(show)
            })
        })
      })
    }
  }
})
.factory('Auth', function (FIRE_URL, $firebaseAuth) {
    var ref = new Firebase(FIRE_URL);
    return $firebaseAuth(ref);
})

.factory('FB', function (FIRE_URL, $firebaseObject) {
    var ref = new Firebase(FIRE_URL);
    var favoriteRef = ref.child('/favorite')
    return $firebaseObject(favoriteRef);
})