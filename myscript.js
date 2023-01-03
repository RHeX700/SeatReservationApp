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
        chair.addEventListener('mouseover', hoverSeat);
        chair.addEventListener('mouseout', unhoverSeat);
    });

    document.querySelectorAll("#seating section div").forEach((chair) => {
        if(chair.innerHTML === "R" || chair.className == "label"){
            chair.removeEventListener('click', selectSeat);
            chair.removeEventListener("mouseover", hoverSeat);
            chair.removeEventListener("mouseout", unhoverSeat);
        }
        
    });

    function selectSeat(event){
        let chair_id = event.target.getAttribute('id');
        console.log(chair_id);
        selectedSeats.push(chair_id);
        console.log(selectedSeats);
        event.target.removeEventListener("click", selectSeat);
        event.target.addEventListener('click', unselectSeat);
        event.target.style.backgroundImage = "url('svg/chair-s.svg')"; 
        event.target.removeEventListener("mouseover", hoverSeat);
        event.target.removeEventListener("mouseout", unhoverSeat); 

    }

    function unselectSeat(event){
        let chair_id = event.target.getAttribute("id");
        let index = selectedSeats.indexOf(chair_id);
        console.log(index);
        selectedSeats = selectedSeats
            .slice(0, index)
            .concat(selectedSeats.slice(index + 1));
        console.log(selectedSeats);
        event.target.removeEventListener("click", unselectSeat);
        event.target.addEventListener('click', selectSeat);
        event.target.addEventListener("mouseover", hoverSeat);
        event.target.addEventListener("mouseout", unhoverSeat);
        event.target.style.backgroundImage = "url('svg/chair-a.svg')";
        
    }

    function hoverSeat(event){
        event.target.style.backgroundImage = "url('svg/chair-h.svg')";
    }

    function unhoverSeat(event){
        event.target.style.backgroundImage = "url('svg/chair-a.svg')";
    }

    document.getElementById('reserve').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('resform').style.display = 'block';
        manageConfirmForm();
    });

    document.getElementById('cancel').addEventListener('click', event => {
        event.preventDefault();
        document.getElementById("resform").style.display = "none";
    });

    function manageConfirmForm() {
        if(selectedSeats.length === 0){
            document.getElementById("confirmres").style.display = "none";
            document.getElementById("selectedseats").innerHTML = 
            'You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one';
            document
              .getElementById("error")
              .addEventListener("click", (event) => {
                event.preventDefault();
                document.getElementById("resform").style.display = "none";
              });
        }else{
            document.getElementById("confirmres").style.display = "block";
            if (selectedSeats.length === 1) {
                document.getElementById("selectedseats").innerHTML =
                  `You have selected seat ${selectedSeats.toString()}`;
            } else {
                document.getElementById("selectedseats").innerHTML = `You have selected seats ${selectedSeats.toString()}`;
            }
            
        }
    }

    document.getElementById("confirmbtn").addEventListener("click", (event) => {
      event.preventDefault();
      processReservation();
    });

    let processReservation = () => {
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        let counter = 1;
        let nextRecord = '';

        selectedSeats.forEach(eachSeat => {
            let thisSeat = document.getElementById(eachSeat);
            thisSeat.style.backgroundImage = "url('svg/chair-r.svg')";
            thisSeat.innerText = "R";
            thisSeat.removeEventListener("click", selectSeat);
            thisSeat.removeEventListener("mouseover", hoverSeat);
            thisSeat.removeEventListener("mouseout", unhoverSeat);

            nextRecord = `record${hardCodeRecords + counter}`;
            reservedSeats[nextRecord] = {
                seat:eachSeat,
                owner: {
                    fname:fname,
                    lname:lname
                }
            }
            counter++;    
        });
        document.getElementById("resform").style.display = "none";
        selectedSeats = [];
    };
 }());
