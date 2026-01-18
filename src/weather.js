import axios from "axios";

const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_msg');
const cityName = document.querySelector('h2.city');
const weatherImg = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const weatherDesc = document.querySelector('p.weather_description');
const feelsLike = document.querySelector('span.feels_like');
const humidity = document.querySelector('span.humidity');
const pressure = document.querySelector('span.pressure');
const windSpeed = document.querySelector('span.wind_speed');
const visibility = document.querySelector('span.visibility');
const clouds = document.querySelector('span.clouds');
const PM25Img = document.querySelector('img.pm25_img');
const PM25Value = document.querySelector('p.pm25_value');

const APIinfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '&appid=7dc1e3959907f252891451585f715299',
    units: '&units=metric',
    lang: '&lang=pl'
}

const getWeatherInfo = () => {
    const APIcity = input.value.trim();
    const URL = `${APIinfo.link}${APIcity}${APIinfo.key}${APIinfo.units}${APIinfo.lang}`;
    // console.log(URL);

    axios.get(URL).then((response) => {
        // console.log(response.data);
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        weatherDesc.textContent = `${response.data.weather[0].description}`;
        temp.textContent = `${Math.round(response.data.main.temp)}℃`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)} ℃`;
        humidity.textContent = `${response.data.main.humidity} %`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        clouds.textContent = `${response.data.clouds.all} %`;
        errorMsg.textContent = '';
        weatherDesc.classList.add('description_background')

        const apiURLpollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${APIinfo.key}`;

        axios.get(apiURLpollution).then((res) => {
            console.log(res);
            PM25Value.textContent = `${res.data.list[0].components.pm2_5}`;

            const pollutionValueNum = res.data.list[0].components.pm2_5
            if (pollutionValueNum < 10) {
                PM25Img.style.backgroundColor = '#51b728ff';
            } else if (pollutionValueNum >= 10 && pollutionValueNum < 25) {
                PM25Img.style.backgroundColor = '#95dc19ff';
            } else if (pollutionValueNum >= 25 && pollutionValueNum < 50) {
                PM25Img.style.backgroundColor = '#f5ee17ff';
            } else if (pollutionValueNum >= 50 && pollutionValueNum < 75) {
                PM25Img.style.backgroundColor = '#da960dff';
            } else {
                PM25Img.style.backgroundColor = '#da0d0dff';
            }
        })

    }).catch((error) => {
        console.log(error);
        errorMsg.textContent = `${error.response.data.message}`;
        [cityName, temp, weatherDesc, feelsLike, pressure, humidity, windSpeed, visibility, clouds, PM25Value].forEach((el) => {
            el.textContent = '';
        })
        weatherImg.src = '';
        PM25Img.style.backgroundColor = 'transparent';
        weatherDesc.classList.remove('description_background');

    }).finally(() => {
        input.value = '';
    })
}

const getWeatherInfoByEnter = (e) => {
    if (e.key === 'Enter') {
        getWeatherInfo();
    }
}

input.addEventListener('keydown', getWeatherInfoByEnter)
button.addEventListener('click', getWeatherInfo);
