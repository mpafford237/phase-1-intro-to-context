// Your code here
function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayedArrays) {
    let employeeRecords = arrayedArrays.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp) {
   let dateArray = dateStamp.split(" ")
   let YMD = dateArray[0]
   let time = dateArray[1]
   let hourInt = parseInt(time, 10)
   let timeIn = {
    type : "TimeIn",
    hour : hourInt,
    date : YMD
   }
   employeeRecord.timeInEvents.push(timeIn)
   return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
   let dateArray = dateStamp.split(" ")
   let YMD = dateArray[0]
   let time = dateArray[1]
   let hourInt = parseInt(time, 10)
   let timeOut = {
    type : "TimeOut",
    hour : hourInt,
    date : YMD
   }
   employeeRecord.timeOutEvents.push(timeOut)
   return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, date) {
    let inEvent = employeeRecord.timeInEvents.find(e => e.date === date)
    let outEvent = employeeRecord.timeOutEvents.find(e => e.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let payable = employeeRecord.timeInEvents.map(e => wagesEarnedOnDate(employeeRecord, e.date))
    return payable.reduce((memo, d) => memo + d)
}

function calculatePayroll(employeeRecordsArray) {
    return employeeRecordsArray.reduce((memo, rec) => memo + allWagesFor(rec), 0)
}