function setCurrentDay() { 
    const currentDayStr = dayjs().format("dddd MMMM DD")
const currentDayEl = $("#currentDay")

currentDayEl.text(currentDayStr)
}

function initialisePage() {
    setCurrentDay()
    
    const timetableEl=$("#timetable")
    timetableEl.append(createRow(10,"",12))
}

function createRow (rowHour, savedText, currentHour) {
var newRow = $("<div>").addClass("row") 

var hourCol = $("<div>").addClass("col hour").text(formatHourNumber(rowHour))


var textCol = $("<textarea>").addClass("col time-block").text(savedText)
var buttonCol = $("<button>").addClass("col saveBtn")
newRow.append(hourCol,textCol,buttonCol)
return newRow

}

function formatHourNumber (hourNumber) {
    var hourString=""
if (hourNumber>12) {
    hourNumber=hourNumber-12
    hourString=hourNumber.toString()
    hourString=hourString+"PM"
}

else if (hourNumber==12) {
    hourString= "12PM"
}

else if (hourNumber==0) {
    hourString= "12AM"
}

else {
    hourString=hourNumber.toString()
    hourString=hourString+ "AM"

}
return hourString

}

initialisePage()