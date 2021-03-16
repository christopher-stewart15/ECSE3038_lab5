function createTankCard(tank) {
    var tank_Card_Div = document.createElement("DIV");
    tank_Card_Div.classList.add("tank_card");

    var tank_location_Div = document.createElement("DIV");
    tank_location_Div.classList.add("tank_location");

    var tank_location_span = document.createElement("SPAN");
    tank_location_span.classList.add("tank-location");
    tank_location_span.innerHTML = tank.location;
    tank_location_Div.appendChild(tank_location_span);

    var tank_latitude_Div = document.createElement("DIV");
    tank_latitude_Div.classList.add("tank_latitude");
    
    var tank_latitude_span = document.createElement("SPAN");
    tank_latitude_span.classList.add("tank-latitude");
    tank_latitude_span.innerHTML = tank.lat;
    tank_latitude_Div.appendChild(tank_latitude_span);

    var tank_longitude_Div = document.createElement("DIV");
    tank_longitude_Div.classList.add("tank_longitude");
    
    var tank_longitude_span = document.createElement("SPAN");
    tank_longitude_span.classList.add("tank-longitude");
    tank_longitude_span.innerHTML = tank.long;
    tank_longitude_Div.appendChild(tank_longitude_span);


    var tank_percent_Div = document.createElement("DIV");
    tank_percent_Div.classList.add("tank_percent");

    var tank_percent_span = document.createElement("SPAN");
    tank_percent_span.classList.add("tank-percent");
    tank_percent_span.innerHTML = tank.percentage_full;
    tank_percent_Div.appendChild(tank_longitude_span);
    
    tankInfoDiv.appendChild(tank_location_Div);
    tankInfoDiv.appendChild(tank_latitude_Div);
    tankInfoDiv.appendChild(tank_longitude_Div);
    tankInfoDiv.appendChild(tank_percent_Div);

    tank_Card_Div.append(tankInfoDiv);

    return dishCardDiv;
  }

  function getTanks() {
    return fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((json) => json);
  }

  document.getElementById("submit_button").addEventListener("click", function(event){
    event.preventDefault();
    let tankLocation = document.getElementById("tank_location").value;
    let tankLat = document.getElementById("tank_latitude").value;
    let tankLong = document.getElementById("tank-longitude").value;
    let tankpful = document.getElementById("tank-percentage").value;

    let postbody = {
        location: tankLocation,
        lat: tankLat,
        long: tankLong,
        percentage_full: tankpful,
    }

    fetch("http://localhost:3000/data", {
        method: "POST",
        body: JSON.stringify(postbody),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
  });

  async function draw() {
    let tanks = await getTanks();
    console.log(tanks);
    tanks.forEach((tank) => {
      var container = document.querySelector(".container");
      container.appendChild(createTankCard(tank));
    });

    
  }

  var container = document.querySelector(".container");

  window.onload = function () {
    draw();
  };