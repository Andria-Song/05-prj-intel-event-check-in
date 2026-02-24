//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendanceCount = document.getElementById("attendeeCount");

//Track Attendance
let count = 0;
const maxCount = 50;
const storageKey = "checkInCounts";

function loadCounts() {
  const savedCounts = localStorage.getItem(storageKey);

  if (!savedCounts) {
    return;
  }

  const parsedCounts = JSON.parse(savedCounts);
  count = parsedCounts.totalCount || 0;

  attendanceCount.textContent = count;
  progressBar.style.width = `${Math.round((count / maxCount) * 100)}%`;

  const waterCount = document.getElementById("waterCount");
  const zeroCount = document.getElementById("zeroCount");
  const powerCount = document.getElementById("powerCount");
  const waterList = document.getElementById("waterList");
  const zeroList = document.getElementById("zeroList");
  const powerList = document.getElementById("powerList");

  const savedNames = parsedCounts.teamNames || {
    water: [],
    zero: [],
    power: [],
  };

  waterCount.textContent = parsedCounts.teamCounts.water || 0;
  zeroCount.textContent = parsedCounts.teamCounts.zero || 0;
  powerCount.textContent = parsedCounts.teamCounts.power || 0;

  waterList.innerHTML = "";
  zeroList.innerHTML = "";
  powerList.innerHTML = "";

  let i = 0;
  for (i = 0; i < savedNames.water.length; i++) {
    const attendeeItem = document.createElement("li");
    attendeeItem.textContent = savedNames.water[i];
    waterList.appendChild(attendeeItem);
  }

  for (i = 0; i < savedNames.zero.length; i++) {
    const attendeeItem = document.createElement("li");
    attendeeItem.textContent = savedNames.zero[i];
    zeroList.appendChild(attendeeItem);
  }

  for (i = 0; i < savedNames.power.length; i++) {
    const attendeeItem = document.createElement("li");
    attendeeItem.textContent = savedNames.power[i];
    powerList.appendChild(attendeeItem);
  }
}

function saveCounts() {
  const waterCount = parseInt(
    document.getElementById("waterCount").textContent,
    10,
  );
  const zeroCount = parseInt(
    document.getElementById("zeroCount").textContent,
    10,
  );
  const powerCount = parseInt(
    document.getElementById("powerCount").textContent,
    10,
  );

  const countsToSave = {
    totalCount: count,
    teamCounts: {
      water: waterCount,
      zero: zeroCount,
      power: powerCount,
    },
    teamNames: {
      water: getNamesFromList("waterList"),
      zero: getNamesFromList("zeroList"),
      power: getNamesFromList("powerList"),
    },
  };

  localStorage.setItem(storageKey, JSON.stringify(countsToSave));
}

function getNamesFromList(listId) {
  const list = document.getElementById(listId);
  const names = [];

  let i = 0;
  for (i = 0; i < list.children.length; i++) {
    names.push(list.children[i].textContent);
  }

  return names;
}

//Load saved counts when the page opens
loadCounts();

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); //Prevent form from submitting normally (refreshing the page)

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text; //Get the text of the selected option

  console.log(name, teamName); //For testing purposes, log the values to the console

  //Increment count
  count++;
  console.log(`Total Check-Ins: ${count}`); //Log the current count to the console

  //Update Progress Bar
  const percentage = Math.round((count / maxCount) * 100) + "%"; //Calculate percentage
  console.log(`Progress: ${percentage}`); //Log the percentage to the console
  const progressBar = document.getElementById("progressBar"); //Get the progress bar element
  progressBar.style.width = percentage; //Update the width of the progress bar to reflect the current percentage

  //Update team counter
  const teamCounter = document.getElementById(team + "Count"); //Get the counter element for the selected team
  teamCounter.textContent = parseInt(teamCounter.textContent, 10) + 1;

  const teamList = document.getElementById(team + "List");
  const attendeeItem = document.createElement("li");
  attendeeItem.textContent = name;
  teamList.appendChild(attendeeItem);

  //Show welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  console.log(message); //Log the welcome message to the console
  const welcomeMessage = document.getElementById("greeting");
  welcomeMessage.textContent = message; //Update the welcome message on the page
  welcomeMessage.style.display = "block";
  welcomeMessage.classList.add("success-message");

  //Tracking Attendace
  attendanceCount.textContent = count;

  saveCounts();

  if (parseInt(teamCounter.textContent, 10) >= 17) {
    welcomeMessage.textContent = `CONGRATULATIONS! ${teamName} has the most attendees!`;
  }

  form.reset();
});
