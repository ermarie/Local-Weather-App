$(document).ready(function(){
 
  //Object of Skycons external script
 var icons = new Skycons({"color": "white"});
 
  //Object containing all weather background images based on Dark Sky API -> data.currently.icons
 var url = {
   CLEAR_DAY: "http://wallpaper-gallery.net/images/sunny-images/sunny-images-2.jpg",
   CLEAR_NIGHT: "http://i.imgur.com/HF3Xxg1.jpg",
   RAIN: "http://52.24.98.51/wp-content/uploads/2017/03/rain.jpg",
   SLEET: "https://www.disclosurenewsonline.com/wp-content/uploads/2013/02/sleet-1.jpeg",
   SNOW: "http://media.idownloadblog.com/wp-content/uploads/2016/01/bokeh-snow-flare-water-white-splash-pattern-9-wallpaper.jpg",
   WIND: "http://organic4greenlivings.com/wp-content/uploads/2016/06/Wind-Turbines-Windmill-Farm.jpg",
   FOG: "http://unsplash.com/photos/zyiKqZCzHsY/download",
   CLOUDY: "http://cdn.wallpapersafari.com/57/33/aBDeRK.jpg",
   PARTLY_CLOUDY_DAY: "http://www.aluminarium.com/wp-content/uploads/2013/08/partly-cloudy.jpg",
   PARTLY_CLOUDY_NIGHT: "http://cdn.weatheravenue.com/img/background/background-night.jpg"
 };
 
  /**
  *  Displays the icon and background image
  **/
 function displayIconAndBackground(data)
  {
    //Contains the weather icon text 
    var iconData = data.currently.icon.toUpperCase().replace(/-/g, "_");
    
    //Sets icons then plays them
    icons.set("icon", Skycons[iconData]);
    icons.play();
    
    //Sets background image
    $("#bg").css('background-image', 'url(' + url[iconData] + ')');
  }
  
  /**
  *  Updates display of farenheit temperature. 
  *  Updates the icon & background.
  **/
  function displayF(data)
  {  
    $("#temp").text(Math.round(data.currently.temperature) + " °F").hide().fadeIn('slow');
    displayIconAndBackground(data);
  }
  
  /**
  *  Updates display of celcius temperature. 
  *  Updates the icon & background.
  **/
  function displayC(data)
  {
    $("#temp").text(Math.round((data.currently.temperature-32)*(5/9)) + " °C").hide().fadeIn('slow');
    displayIconAndBackground(data);
  }
  
/**
*  Contains GET call from darksky
**/
function getWeather(callback){
  
//GETs latitude and longitude of location
if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position){
 var latitude = position.coords.latitude;
 var longitude = position.coords.longitude;

//GETs weather using longitude and latitude   
$.ajax({
    url: "https://crossorigin.me/https://api.darksky.net/forecast/55405fea53ba2380b7bb2b045a95ddbc/" + latitude + "," + longitude,
  dataType: 'json',
  //If success, calls callback function passed as parameter
  success: callback,
  error: function(){
    //If error, attempts GET again
    getWeather(displayF);
  }
});
})
}
}
  
  //Sets weather when document is ready
  getWeather(displayF);
  
  
  /**
  *  Runs when F/C button is clicked. 
  *  Will update the display according to the current display.
  *  If display shows farenheit, change to celcius & vice versa
  **/
  $("#f-c").click(function(){
  
  var temperature = document.getElementById("temp").innerHTML;
    
    $("#temp").text("\t");
    
    //Checks if the display is showing celcius or farenheit
    if(temperature.includes("C"))
      {
        getWeather(displayF);
      }
    else{
      getWeather(displayC);
    }
  })
});