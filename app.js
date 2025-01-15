// API key a2ea048190f8464e762727a110f31730

// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=a2ea048190f8464e762727a110f31730

// https://api.openweathermap.org/data/2.5/weather?q=Budaun&appid=a2ea048190f8464e762727a110f31730

// https://openweathermap.org/img/wn/10d.png for icon


let closeWhetherContainer=document.querySelector('.closeWhetherContainer');
let whetherMainContainer=document.querySelector(".whetherMainContainer");
let HowSky=document.querySelector(".HowSky");
let tempreture=document.querySelector(".tempreture");
let feelsLikeinKelvin=document.querySelector(".feelsLikeinKelvin");
let feelslikedata=document.querySelector(".feelslikedata");
let humiditydata=document.querySelector(".humiditydata");
let airPressureData=document.querySelector(".airPressureData");
let visibilityData=document.querySelector(".visibilityData");
let sunriseSpan=document.querySelector(".sunriseSpan");
let sunsetSpan=document.querySelector(".sunsetSpan");
let SearchBtn=document.querySelector(".SearchBtn"); 
let inputData=document.querySelector(".inputData");
let locationName=document.querySelector(".locationName");
async function getResponse(){
    let inputValue=inputData.value;
    if(inputValue===""){
        alert("Please Type Some Valid Location ");
        return;
    }
    else{ 
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=a2ea048190f8464e762727a110f31730`);
    let data=await response.json();
    let sunrise=data.sys.sunrise;
    let sunset=data.sys.sunset;
    let visibility=data.visibility;
    let feels_like=data.main.feels_like;
    let tempreture=data.main.temp;
    let pressure=data.main.pressure;
    let humidity=data.main.humidity;
    let weatherMsg=data.weather[0].description;
    let location=data.name;
    const completeData={
       sunrise:unixTimeampForSunrise(sunrise),
       sunset:unixTimeampForSunset(sunset),
       visibility:visibilityConvertor(visibility),       
       feels_likeInRead:feelsLikeConvertor(feels_like),
       feels_likeInKelvin:feels_like,
       weatherMsg:weatherMsg,
       humidity:humidity,
       pressure:pressure,
       location:location,
       tempreture:tempretureConvertor(tempreture),
    }
    console.log(data);
    return completeData;
    }
}
SearchBtn.addEventListener("click", async (event)=>{
    event.preventDefault();
    let completeData= await getResponse();
    if(inputData.value==""){
       return;   
    }
    else if(whetherMainContainer.classList.contains("hideWhetherContainer")){
        whetherMainContainer.classList.remove("hideWhetherContainer");
        whetherMainContainer.classList.add("visiableWhetherContainer");        
    }else{
        whetherMainContainer.classList.remove("hideWhetherContainer");
        whetherMainContainer.classList.add("visiableWhetherContainer");
    }
    // Now Add Data Dynamically 
    locationName.textContent=completeData.location;
    tempreture.textContent=completeData.tempreture;
    HowSky.textContent=completeData.weatherMsg;
    feelsLikeinKelvin.textContent = `Feels Like : ${completeData.feels_likeInKelvin}K (${completeData.feels_likeInRead}°C)`;
    feelslikedata.textContent=completeData.feels_likeInRead;
    humiditydata.textContent=completeData.humidity+'%';
    airPressureData.textContent=completeData.pressure+'hpa';
    sunriseSpan.textContent=completeData.sunrise;
    sunsetSpan.textContent=completeData.sunset;
    visibilityData.textContent=completeData.visibility;
});


function unixTimeampForSunrise(sunrise){
    let date=new Date(sunrise*1000);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    hours=hours%12||12;
    let minutesFormate=minutes<10?'0'+minutes:minutes;
    const ampm=hours>=12?'pm':'am';
    const finalTime=`${hours}:${minutesFormate} ${ampm}`;
    return finalTime;
}
function unixTimeampForSunset(sunset){
  let date=new Date(sunset*1000);
  let hours=date.getHours();
  let minutes=date.getMinutes();
  hours=hours%12||12;
  const ampm=hours>=12?'pm':'am';
  const minutesFormate=minutes<10?'0'+minutes:minutes;
  const finalTime=`${hours}:${minutesFormate} ${ampm}`;
  return finalTime;
}
function visibilityConvertor(visibility){
    let accurateVisibility=visibility/1000;
    return accurateVisibility;
}
function feelsLikeConvertor(feels_like){
    let celcius=feels_like-273.15;
    let finalCelcius=celcius.toFixed(2);
    return finalCelcius;
}
function tempretureConvertor(tempreture){
    let celcius=tempreture-273.15;
    return celcius.toFixed(2);
}

closeWhetherContainer.addEventListener("click",()=>{
    if(whetherMainContainer.classList.contains("visiableWhetherContainer")){
        whetherMainContainer.classList.remove("visiableWhetherContainer");
        whetherMainContainer.classList.add("hideWhetherContainer");       
    }else{
        whetherMainContainer.classList.remove("hideWhetherContainer");
    }
})

function getUserCurrentLocation(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((position)=>{
         const latitude=position.coords.latitude;
         const longnitude=position.coords.longitude;
         console.log(`Latitude  : ${latitude} and  Longnitude  ${longnitude}`);
        }),
        (error)=>{
            console.log("Error to getting user Location  : ");
        }
    }else{
        console.log("GeoLocation is not supported by your browser : ");
    }
}
getUserCurrentLocation();