const searchInput = document.querySelector('#searchBox input');
const searchButton = document.querySelector('#searchBox button');
const searchBox = document.querySelector('#searchBox');
const weatherBox = document.getElementById('weatherBox');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherBoxNotFind = document.getElementById('weatherBoxNotFind');
const weatherBoxImage = document.querySelector('#weatherBox img');

searchButton.addEventListener('click', () => {
    const APIKey = '6a12fe7797fa3d04dc40e2f2a664b088';
    const city = searchInput.value;
    if (city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        console.log("It is true")
        if (json.cod == '404') {
            weatherBox.classList.remove('fade-in');
            weatherBox.classList.add('hidden');
            weatherBoxNotFind.classList.add('fade-in');
            weatherBoxNotFind.classList.remove('hidden');
            searchBox.classList.add('h-[705px]')
            return;
        }
        weatherBoxNotFind.classList.add('hidden');
        weatherBoxNotFind.classList.remove('fade-in');
        searchBox.classList.remove('h-[705px]');
        // weatherBox.classList.add('hidden');



        const temprature = document.querySelector('#temprature');
        const detail = document.querySelector('#detail');

        switch (json.weather[0].main) {
            case 'Clear':
                weatherBoxImage.src = 'assets/image/clear.png';
                break;
            case 'Snow':
                weatherBoxImage.src = 'assets/image/snow.png';
                break;
            case 'Rain':
                weatherBoxImage.src = 'assets/image/rain.png';
                break;

            case 'Clouds':
                weatherBoxImage.src = 'assets/image/cloud.png';
                break;

            case 'Haze':
                weatherBoxImage.src = 'assets/image/haze.png';
                break;
            default:
                weatherBoxImage.src = '';
        }
        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        detail.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        windSpeed.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        searchBox.classList.add('h-[705px]')
        weatherBox.classList.add('fade-in');
        weatherBox.classList.remove('hidden');
    })

})