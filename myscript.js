var reservedSeats = {
  record1: {
    seat: "b19",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record2: {
    seat: "b20",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },

    record3 : {
        seat : "b21",
        owner : {
            fname : "Joe",
            lname : "Smith"
        },
    },

    record4 : {
        seat : "b22",
        owner : {
            fname : "Joe",
            lname : "Smith"
        },
    }
};

const nextChar = char => String.fromCharCode(char.charCodeAt(0) + 1);

let currentLabel = '`'
const leftSection = document.getElementById("left");
const middleSection = document.getElementById("middle");
const rightSection = document.getElementById("right");

for(i = 0; i < 20; i++){
    currentLabel = nextChar(currentLabel);
    leftSection.innerHTML += `<div class="label">${currentLabel.toUpperCase()}</div>`;
    for(j = 0; j < 3; j++){
        leftSection.innerHTML += `<div id="${currentLabel}${15 * i + j + 1}">${
          15 * i + j + 1
        }</div>`;
    }

    for(j = 3; j < 12; j++){
        middleSection.innerHTML += `<div id="${currentLabel}${
          15 * i + j + 1
        }">${15 * i + j + 1}</div>`;
    }

    for(j = 12; j < 15; j++){
        rightSection.innerHTML += `<div id="${currentLabel}${15 * i + j + 1}">${
          15 * i + j + 1
        }</div>`;
    }

    rightSection.innerHTML += `<div class="label">${currentLabel.toUpperCase()}</div>`;
}

(function () { 

    "use strict";

    for (const key in reservedSeats){
        var chair = document.getElementById(reservedSeats[key].seat);
        // chair.className = 'r';
        chair.style.backgroundImage = "url('svg/chair-r.svg')";
        chair.innerText = "R";
    }

    var selectedSeats = [];

    document.querySelectorAll("#seating section div").forEach(chair =>{
        chair.addEventListener('click', selectSeat);
    });

    document.querySelectorAll("#seating section div").forEach((chair) => {
        if(chair.innerHTML === "R"){
            chair.removeEventListener('click', selectSeat);
        }
        
    });

    function selectSeat(event){
        if(event.target.innerHTML !== "R"){
            let chair_id = event.target.getAttribute('id');
            if(selectedSeats.includes(chair_id)){
                
            }else{
                console.log(chair_id);
                selectedSeats.push(chair_id);
                console.log(selectedSeats);
                event.target.addEventListener('click', unselectSeat);
                event.target.style.backgroundImage = "url('svg/chair-s.svg')";  
            }

        }
    }

    function unselectSeat(event){
        if (event.target.innerHTML !== "R") {
          let chair_id = event.target.getAttribute("id");
          if (selectedSeats.includes(chair_id)) {
            let index = selectedSeats.indexOf(chair_id);
            console.log(index);
            selectedSeats = selectedSeats
              .slice(0, index)
              .concat(selectedSeats.slice(index + 1));
            console.log(selectedSeats);
            event.target.addEventListener('click', selectSeat);
            event.target.style.backgroundImage = "url('svg/chair-a.svg')";
          }
        }        
    }
 }());
