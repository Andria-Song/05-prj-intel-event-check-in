//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Track Attendance
let count = 0;
const maxCount = 50;

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
  const attendanceCount = document.getElementById("attendeeCount");
  attendanceCount.textContent = count;

  if (parseInt(teamCounter.textContent, 10) >= 17) {
    welcomeMessage.textContent = `CONGRATULATIONS! ${teamName} has the most attendees!`;
  }


  


  form.reset();
});
