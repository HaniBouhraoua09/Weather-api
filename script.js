
const weatherform = document.querySelector('.weatherform');
const cityinput = document.querySelector('.cityinput');
const card = document.querySelector('.card');
const apikey = 'a09719b78c67fcbee675894ef9c7d5d3' ;


weatherform.addEventListener("submit" , async event => {

    event.preventDefault();  // to avoid refresh 
    const city = cityinput.value ;

    if (city) {
        try {
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo (WeatherData) ;
        } 
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError('Please Enter a City !!!')
    }
}); 

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    response  = await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error("Please Enter Valid Region !!! ");
    }

    // we use await key word here
    // to ensure that the function waits for the response.json() operation to complete before returning the result.
    return await response.json();
}

function displayWeatherInfo(data) {

    // destructuring 
    const { name : city ,
            main : {temp , humidity},
            weather : [{description , id}]}  =  data ;  // data is the returned json file

    const cityDispaly = document.querySelector('.cityDispaly');
    const tempDisplay = document.querySelector('.tempDisplay');
    const humidityDisplay = document.querySelector('.humidityDisplay');
    const descriptionDisplay = document.querySelector('.descriptionDisplay');
    const weatherEmoji = document.querySelector('.weatherEmoji');
    
    cityDispaly.textContent = city ;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C` ;
    humidityDisplay.textContent = `Humidity : ${humidity}%` ;
    descriptionDisplay.textContent = description ;
    weatherEmoji.textContent = displayWeatherEmoji(id) ;
    card.style.display = 'flex' ;
}

function displayWeatherEmoji(weatherID) {

    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return "Thunderstorm";
            break;
        case (weatherID >= 300 && weatherID < 400):
            return "Drizzle";
            break;
        case (weatherID >= 500 && weatherID < 600):
            return "Rain";
            break;
        case (weatherID >= 600 && weatherID < 700):
            return "Snow";
            break;
        case (weatherID >= 700 && weatherID < 800):
            return "Atmosphere";
            break;
        case (weatherID === 800):
            return "Clear";
            break;
        case (weatherID >= 801 && weatherID < 810):
            return "Clouds";
            break;
        default:
            return '❓'
            break;
    }
}

function displayError (message) {

    const errorDispaly = document.createElement('p');
    errorDispaly.textContent = message ;
    errorDispaly.classList.add("errorDisplay");
    
    card.textContent = '';
    card.style.display = 'block' ;
    card.appendChild(errorDispaly);
}



