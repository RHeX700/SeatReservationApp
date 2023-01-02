const nextChar = char => String.fromCharCode(char.charCodeAt(0) + 1);

let currentLabel = '`'
const leftSection = document.getElementById("left");
const middleSection = document.getElementById("middle");
const rightSection = document.getElementById("right");

for(i = 0; i < 20; i++){
    currentLabel = nextChar(currentLabel);
    leftSection.innerHTML += `<div class="label">${currentLabel.toUpperCase()}</div>`;
    for(j = 0; j < 3; j++){
        leftSection.innerHTML += `<div id="${currentLabel}${j+1}">${(15 * i) + j + 1}</div>`;
    }

    for(j = 3; j < 12; j++){
        middleSection.innerHTML += `<div id="${currentLabel}${j+1}">${(15 * i) + j + 1}</div>`;
    }

    for(j = 12; j < 15; j++){
        rightSection.innerHTML += `<div id="${currentLabel}${j+1}">${(15 * i) + j + 1}</div>`;
    }

    rightSection.innerHTML += `<div class="label">${currentLabel.toUpperCase()}</div>`;
}