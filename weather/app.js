const KEY = '96b947a45d33d7dc1c49af3203966408'
const API = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
const information = document.querySelector('.information')
const search = document.querySelector('#search')
const forms = document.querySelector('.form')
const span = document.querySelector('.span')
const loader = document.querySelector('.loader')

search.focus()

const getData = async (city) => {
    loader.classList.remove('dNone')
    const first = 'https://api.openweathermap.org/data/2.5/weather'
    const second = `?q=${city}&units=metric&appid=${KEY}`
    const resoult = await fetch(first + second)
    if(resoult.status !== 200){
        loader.classList.add('dNone')
        information.classList.add('dNone')
        span.classList.add('dNone')
        throw new Error('Not found page Error 404')
    }
    information.classList.remove('dNone')
    span.classList.remove('dNone')
    loader.classList.add('dNone')
    const data = await resoult.json()
    return await data
}

forms.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = search.value.trim()
    getData(data)
    .then((data) => { salom(data) })
    .catch((error) => { console.log(error.message) })
})

function salom(info){
    console.log(info)
    information.innerHTML = `
    <h2>${info.name}, ${info.sys.country}</h2>
    <h3>${info.weather[0].main}</h3>
    <p>${info.main.temp} °C</p>
    <img src='https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png' alt="weather image" class="image">`
}



