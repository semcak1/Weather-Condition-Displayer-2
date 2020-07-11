
var weatherTable=document.getElementById('weatherTable');
const cities=document.querySelectorAll('.btn');


cities.forEach(city => {

    city.addEventListener('mouseover',()=>{
       
        weatherTable.innerHTML="";
       apiConnection(city.innerHTML)

    });

    city.addEventListener('mouseout',()=>{
        weatherTable.innerHTML="";
    })

   
    
});


// Api bağlantısı
function apiConnection(cityName){
    var url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=6a79d8348b6a616a6a13fc5d5b60ce94`;

    //XMLHttpRequest nesnesi türetip apiye bağlanıyoruz.
        const xhr=new XMLHttpRequest();
        xhr.open('GET',url,true)
    
        xhr.onload=function (){
            if(this.status===200)
            {
                let responseJson=JSON.parse(this.responseText);
                

                //html de göstereceğimiz fonksiyonu burda çalıştırdık.
                showCityWeather(responseJson);
                
            }
            else{
                console.log('hata')
            }
        }
    
        xhr.send();
    
}






//hava durumunu gösterecek olan fonksiyon.
function showCityWeather(responseJson){        
    let len=responseJson.list.length;
    let howManyDays=len/5;
    var html="";
    var headerHtml=` <h3 style="opacity:0.5"> ${responseJson.city.name} </h3>`


// 3 günlük hava durumunu göstermek için for döngüsü kullandık.
    for(let i =0;i<3;i++){
        // Kelvin i Celcius a dönüştürür.
        let temp=Math.floor(responseJson.list[i*howManyDays].main.temp-273);
        let feels_like=Math.floor(responseJson.list[i*howManyDays].main.feels_like-273);
        let humidity=Math.floor(responseJson.list[i*howManyDays].main.humidity);

        //tarihi gösterrir.
        let date=responseJson.list[i*howManyDays].dt_txt;  
        let dateNow=new Date(date);
        let day=dateNow.getDate();           
        let dayName=showDayName(dateNow);
        let monthName=showMonthName(dateNow);
       

        // hava durumu iconunu gösterir
        let weather=responseJson.list[i*howManyDays].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + weather + ".png";
       

        // ekranda gösterilecek olan html .
        html+=`
        <div style ="display:inline-block" class="">
           
            <div id="icon"><img id="wicon" src="${iconurl}" alt="weather icon"></div>
            <div><label > <b style="font-size:35px">${day}</b> ${monthName} ${dayName}  </label></div>
            <div><label>Sıcaklık : ${temp} °C</label></div>
            <div><label>Hissedilen : ${feels_like} °C</label></div>
            <div><label>Nem : % ${humidity}</label></div>
        </div>
        `;;
            

    }

    // html in gösterileceği yer
    weatherTable.innerHTML=headerHtml+html 
     
}



// Tarihi gün olarak yazıdırır
function showDayName(date){       
    let day=date.getDay()
    const days=["Pzr","Pzts","Salı","Çrş","Prş","Cum","Cts"]
    for(let i = 0;i<7;i++)
    if (day===i){
        return days[i]
    }
    
}
// Tarihi ay olarak yazıdırır
function showMonthName(date){
    let month = date.getMonth();
    const months=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"]
    for(let i =0;i<12;i++){
        if(month===i){
            return months[i];
        }
    }
}






// const buttons = document.getElementsByClassName('btn');
// Classname lere göre erişim yapınca Foreach ve map fonksiyonları elementlere erişmek için kullanılamadı o yüzden for döngüsü çalıştırdım.

// for(let i = 0; i<len;i++)
// {
//     console.log(buttons[i]);

//     buttons[i].addEventListener('mouseover',showCityWeather)


// }
