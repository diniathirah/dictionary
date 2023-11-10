function buttonClicked() {
    var country = document.getElementById("serchData").value; // get the searched value
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9fd7a449d055dba26a982a3220f32aa2`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("country").innerHTML = `Country: ${data.name}`;
        document.getElementById("desc").innerHTML = `Description: ${data.weather[0].description}`;
        document.getElementById("tempK").innerHTML = `Temperature: ${data.main.temp} Kelvin`;
  
        var celcius = data.main.temp - 273.15;
        document.getElementById("tempC").innerHTML = `Temperature: ${celcius.toFixed(2)} Celcius`;
      });
  }
  