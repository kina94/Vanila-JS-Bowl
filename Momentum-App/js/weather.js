const API_KEYS = '9a50fbf17c0f2ffc8b9c3759e0799776'

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.querySelector('.weather')
            const locationName = weatherContainer.querySelector('span:first-child')
            const locationWeather = weatherContainer.querySelector('span:last-child')
            const name = data.name;
            const weather = data.weather[0].main;
            const temp = data.main.temp;
            locationName.innerText=name
            locationWeather.innerText=`${weather} / ${temp}`
            console.log(data)

        })
}
function onGeoError() {
    alert('좌표를 찾을 수 없습니다.')
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
