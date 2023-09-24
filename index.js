
let userTab = document.querySelector(".user-tab");
let searchTab = document.querySelector(".search-tab");
let grantBtn = document.querySelector(".btn-access");
let city = document.querySelector(".searchCity");

let weatherContainer = document.querySelector(".weather-data");
let searchContainer = document.querySelector(".search-weather");
let loadingContainer = document.querySelector(".loading");
let errorContainer = document.querySelector(".error");
let locationContainer = document.querySelector(".grant-access");
let form=document.querySelector(".form");
let searchBtn=document.querySelector(".search-btn");

let searchCity=document.querySelector(".city");
let flag=document.querySelector(".city-icon");
let description=document.querySelector(".description");
let weatherIcon=document.querySelector(".weather-icon");
let temperature=document.querySelector(".temperature");
let WindSpeed=document.querySelector(".WindSpeed");
let humidity=document.querySelector(".humidity");
let clouds=document.querySelector(".clouds");

const APIKEY="b35a3c0e2208d8eedcb0c0309f053d5b";
var coords;


 function getFromSession(){
  console.log("come");
  const localCoords=sessionStorage.getItem("userCoords");
  if(!localCoords)
  {
    locationContainer.classList.add("active");
  }
  else
  {
    console.log("coords",localCoords);
    coords=JSON.parse(localCoords);
    renderUserWeather();
  }
}






form.addEventListener("submit",(event)=>
{
    event.preventDefault();
    if(city.value)
    {
        renderSearchWeather();
    }
    else 
    {
        alert("Please Enter a value");
    }
})




let currenTab = userTab;
currenTab.classList.add("current-tab");
// kaik baki chhe
getFromSession();

userTab.addEventListener("click", () => switchTab(userTab));
searchTab.addEventListener("click", () => switchTab(searchTab));
grantBtn.addEventListener("click",()=>getCoords());














function switchTab(selectedTab) {
  if (currenTab != selectedTab) {
    currenTab.classList.remove("current-tab");
    currenTab = selectedTab;
    currenTab.classList.add("current-tab");
  }
  if (searchTab.classList.contains("current-tab")) {
    weatherContainer.classList.remove("active");
    locationContainer.classList.remove("active");
    loadingContainer.classList.remove("active");
    errorContainer.classList.remove("active");
    searchContainer.classList.add("active");
  } else {
    if (coords) {
      weatherContainer.classList.remove("active");
      searchContainer.classList.remove("active");
      loadingContainer.classList.remove("active");
      errorContainer.classList.remove("active");
      console.log("here : ",coords);
      renderUserWeather();
    } else {
      weatherContainer.classList.remove("active");
      searchContainer.classList.remove("active");
      loadingContainer.classList.remove("active");
      errorContainer.classList.remove("active");
      locationContainer.classList.add("active");
      getFromSession();
    }
  }
}

async function renderSearchWeather()
{
    errorContainer.classList.remove("active");
    loadingContainer.classList.add("active");
    searchContainer.classList.remove("active");

    try
    {
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${APIKEY}&units=metric`);
    let data=await response.json();
    loadingContainer.classList.remove("active");
    weatherContainer.classList.add("active");
    fillData(data);
    }
    catch(err)
    {
      weatherContainer.classList.remove("active");
      errorContainer.classList.add("active");
      searchContainer.classList.add("active");
    }    
}

async function renderUserWeather()
{
  coords=JSON.parse(sessionStorage.getItem("userCoords"));
  locationContainer.classList.remove("active");
  loadingContainer.classList.add("active");
    // console.log("here : ", coords);
    try
    {
    let {lat,long} = coords;
    console.log(lat," : ",long);
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`);
    let data=await response.json();
    // console.log(data);
    fillData(data);
}
catch(err)
{
  console.log(err);    
}
  loadingContainer.classList.remove("active");
    weatherContainer.classList.add("active");
}


async function getCoords()
{
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        alert("Geolocation not supported");
    }
}
function showPosition(position)
{
  let coords={
    lat:position.coords.latitude,
    long:position.coords.longitude
}
// console.log(coords);
sessionStorage.setItem("userCoords",JSON.stringify(coords));
renderUserWeather();
// console.log(JSON.parse(sessionStorage.getItem("userCoords")));
}



function fillData(data)
{
    searchCity.innerText=`${data.name}`;
    flag.src="https://flagcdn.com/144x108/"+`${data?.sys.country.toLowerCase()}`+".png";
    description.innerText=`${data?.weather?.[0].description}`;
    weatherIcon.src="https://openweathermap.org/img/wn/"+`${data?.weather?.[0].icon}`+"@2x.png";
    temperature.innerText=`${data?.main.temp} °C`;
    WindSpeed.innerText=`${data?.wind.speed} m/s`;
    humidity.innerText=`${data?.main.humidity} %`;
    clouds.innerText=`${data?.clouds.all} %`;
}



// function getFromSession()
// {
//     coords= JSON.parse(sessionStorage.getItem("userCoords"));
// }
// getFromSession();