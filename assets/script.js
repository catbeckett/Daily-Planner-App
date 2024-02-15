function setCurrentDay() {
    const currentDayStr = dayjs().format("dddd MMMM DD");
    const currentDayEl = $("#currentDay");

    currentDayEl.text(currentDayStr);
}

function getCurrentHour() {
    const currentHour = dayjs().format("H");
    return parseInt(currentHour, 10);
}

function initialisePage() {
    setCurrentDay();

    const currentHour = getCurrentHour();

    const timetableEl = $("#timetable");
    for (let hour = 8; hour <= 18; hour++) {
        timetableEl.append(createRow(hour, "", currentHour));
    }
}

function createRow(rowHour, savedText, currentHour) {
    var newRow = $("<div>").addClass("row");
    var hourCol = $("<div>").addClass("col hour").text(formatHourNumber(rowHour));
    var textCol = $("<textarea>").addClass("col time-block").text(savedText);
    var buttonCol = $("<button>").addClass("col saveBtn").text("save"); 
    newRow.append(hourCol, textCol, buttonCol);

    textCol.on("input", function () {
        localStorage.setItem(`savedText_${rowHour}`, textCol.val());
    });

    buttonCol.on("click", function () {
        localStorage.setItem(`savedText_${rowHour}`, textCol.val());
    });

    updateTimeBlockClass(newRow, rowHour, currentHour);

    return newRow;
}

function updateTimeBlockClass(rowElement, rowHour, currentHour) {
    if (rowHour < currentHour) {
        rowElement.addClass("past");
    } else if (rowHour === currentHour) {
        rowElement.addClass("present");
    } else {
        rowElement.addClass("future");
    }
}

function formatHourNumber(hourNumber) {
    var hourString = "";
    if (hourNumber > 12) {
        hourNumber = hourNumber - 12;
        hourString = hourNumber.toString();
        hourString = hourString + "PM";
    } else if (hourNumber == 12) {
        hourString = "12PM";
    } else if (hourNumber == 0) {
        hourString = "12AM";
    } else {
        hourString = hourNumber.toString();
        hourString = hourString + "AM";
    }
    return hourString;
}

initialisePage();
