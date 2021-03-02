//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key:"36ed3f7897e2d27a24a1151252502b73",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.querySelector("#input-box");

//event listener function on keypress
searchInputBox.addEventListener('keypress',srchdata);

function srchdata(){
    if(event.keyCode==13){
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
    }
}
//get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`) 
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);   
}

//show weather report
function showWeatherReport(weather){
    let city = document.querySelector("#city");
    city.innerText=`${weather.name},${weather.sys.country}`;

    let temp = document.querySelector("#temp");
    temp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.querySelector("#min-max");
    minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C(min)/${Math.ceil(weather.main.temp_max)}&deg;C(max)`;

    let weatherType = document.querySelector("#weather");
    weatherType.innerHTML=`${weather.weather[0].main}`;

    let date = document.querySelector("#date");
    let todayDate= new Date(); 
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){

        document.body.style.backgroundImage = "url('images/clear.jpg')";

    }else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } 

}

//date manage
function dateManage(dateArg){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} ${day}, ${year}`;
}