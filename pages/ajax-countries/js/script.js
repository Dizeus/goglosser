const btnSearch = document.querySelector(".btn-search");
const btnUserPosition = document.querySelector(".btn-where");
const tabs = document.querySelector(".tabs");

async function getUserPosition(){
    const userPosition = await new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    return userPosition.coords;
}

async function getCountryByPosition(lat,long){
    try{
        const responce = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
        if (!responce.ok) {
            throw new Error(`Country not found: ${responce.status}`)
        }
        
        let data = await responce.json();
        showCountry(data.countryName);
    }
    catch (error) {
        console.log(`Ooops... Something went wrong: ${error}`)
    };
}

async function showCountry(countryName){
    try{
        const responce = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!responce.ok) {
            throw new Error(`Country not found: ${responce.status}`)
        }
        [data] = await responce.json();
        let pop = (data.population / 1000000).toFixed(1) + ' millions';
        let languages = Object.values(data.languages).join(', ');
        let currencyName = Object.values(data.currencies)[0].name;
        let currencySymbol = Object.values(data.currencies)[0].symbol;
        let html = `        
                <div class="card">
                    <img src="${data.flags.svg}" alt="Country Flag" class="card__img">
                    <div class="card__text">
                        <div class="card__name">${countryName}</div>
                        <div class="card__population">👥 ${pop}</div>
                        <div class="card__languages">🗣 ${languages}</div>
                        <div class="card__currency">💰${currencySymbol} ${currencyName}</div>
                        <div class="card__area">🌐${data.area}</div>
                    </div>
                </div>`
        let container = document.querySelector(".result");
        container.insertAdjacentHTML("afterbegin", html);
    }
    catch(error){
        console.log(`Ooops... Something went wrong: ${error}`)
    };
}

btnSearch.addEventListener('click', function() {
    const res = document.querySelector("#country");
    if(res.parentElement.classList == 'visible'){
        showCountry(res.value);
    }else{
        const lat = document.getElementById('latitude').value;
        const long = document.getElementById('longitude').value;
        getCountryByPosition(lat, long);
    }
})

btnUserPosition.addEventListener('click', function () {
    const coords = getUserPosition();
    getCountryByPosition(coords.latitude, coords.logitude);
})


tabs.addEventListener('click', function (event){
    if(!event.target.closest('.active')){
        let curractive = document.querySelector(".active");
        let visible = document.querySelector(".visible");
        let hidden = document.querySelector(".hidden");
        visible.classList.remove('visible');
        visible.classList.add('hidden');
        hidden.classList.add('visible');
        hidden.classList.remove('hidden');
        curractive.classList.toggle('active');
        event.target.classList.toggle('active');
    }
})


/* btn.addEventListener('click', function () {
    const lat = 47.824748;//document.getElementById('latitude').value;
    const long = 31.067170;//document.getElementById('longtitude').value;

    if (lat && long) {
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
            .then(responce => {
                if (!responce.ok) {
                    throw new Error(`Country not found: ${responce.status}`)
                }
                return responce.json();
            })
            .then(data => {
                //console.log(`You are in ${data.city}, ${data.countryName}`)
                return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
            })
            .then(responce => {
                if (!responce.ok) {
                    throw new Error(`Country not found: ${responce.status}`)
                }
                return responce.json();
            })
            .then(data => {
                data = data[0];
                let pop = (data.population / 1000000).toFixed(1) + ' millions';
                let languages = Object.values(data.languages).join(', ');
                let currencyName = Object.values(data.currencies)[0].name;
                let currencySymbol = Object.values(data.currencies)[0].symbol;
                let html = `        
            <div class="card">
                <img src="${data.flags.svg}" alt="Country Flag" class="card__img">
                <div class="card__text">
                    <div class="card__population">${pop}</div>
                    <div class="card__languages">${languages}</div>
                    <div class="card__currency">${currencySymbol} ${currencyName}</div>
                    <div class="card__area">${data.area}</div>
                </div>
            </div>`
                let container = document.querySelector(".result");
                container.insertAdjacentHTML("afterbegin", html);
                return data;
            })
            .catch(error => console.log(`Ooops... Something went wrong: ${error}`));
    }
}) */