// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  
  // For current day in the header 
  var today = moment().format("dddd, MMMM Do YYYY ");
  var now = moment().format("H A")

  $("#currentDay").text(today);

  //For time scheduler for the whole workday
  var planWorkDay = [
    { time: "9 AM",
        event: ""},
    { time: "10 AM",
        event: ""},
    { time: "11 AM",
        event: ""},
    { time: "12 PM",
        event: ""},
    { time: "1 PM",
        event: ""},
    { time: "2 PM",
        event: ""},
    { time: "3 PM",
        event: ""},
    { time: "4 PM",
        event: ""},
    { time: "5 PM",
        event: ""},
  ]; 

//For Local Storage to make sure everything stays saved
var workPlan = JSON.parse(localStorage.getItem("workDay"));
if(workPlan) {
  planWorkDay = workPlan;
}

//Current Day
$("#currentDay").text(today);

/* Creating rows with bootstrap */ 
planWorkDay.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

    /*Adding rows to the container class */
  	$(".container-lg").append(row);
});


//Adding function to make rows change color on the appropiate time/ current time 
function colorRow(time) {
  var planNow = moment(now, "H A")
  var planEntry = moment(time, "H A")
  if (planNow.isBefore(planEntry) === true) {
    return "future";
  } else if (planNow.isAfter(planEntry) === true) {
    return "past";
  } else {
    return "present";
  }
}

/* Saving Events by the user */
$("saveBtn").on("click", function() {
  var blockID = parseInt(
    $(this)
      .closest("time-block")
      .attr("id")
  );
  var userEntry = $.trim(
    $(this)
      .parent()
      .siblings()
      .val()
  );
  planWorkDay[blockID].event = userEntry;

localStorage.setItem("workDay", JSON.stringify(planWorkDay));

})
