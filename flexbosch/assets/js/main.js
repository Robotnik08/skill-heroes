const moreinfobuttons = document.getElementsByClassName("more-info-button");
const dialogs = document.getElementsByClassName("detail");

const daybuttons = document.getElementsByClassName('day');
const daydetails = document.getElementsByClassName('day-details');


for (let b in moreinfobuttons) {
    if (isNaN(b)) break;
    moreinfobuttons[b].addEventListener("click", () => opendialog(b))
}

for (let d in daybuttons) {
    if (isNaN(d)) break;
    daybuttons[d].addEventListener("click", () => openday(d));
}

function opendialog (i) {
    for (let d in dialogs) {
        if (d == i) {
            dialogs[d].showModal();
        }
    }
}

function openday (i) {
    for (let d in daydetails) {
        if (d % 7 == i) {
            daydetails[d].classList.remove('hidden');
            daydetails[d].classList.add('flex');
        } else {
            daydetails[d].classList.add('hidden');
            daydetails[d].classList.remove('flex');
        }
    } 
}