import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";

const App = () => {
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");

  const processAndDisplayResult = (event) => {
    event.preventDefault();
    var dateDict = convertDateToString(date);
    var dateVariations = getAllDateVariations(dateDict);
    var flag = 0;
    dateVariations.forEach((date) => {
      if (isPalindrome(date)) {
        flag = 1;
      }
    });
    if (flag === 1) {
      setResult("Yay! Your birthday is palindrome!");
    } else {
      var nearestPalindromeDate = getNextPalindromeDate(date);
      var output =
        nearestPalindromeDate[1].slice(0, 2) +
        "-" +
        nearestPalindromeDate[1].slice(3, 4) +
        "-" +
        nearestPalindromeDate[1].slice(4);

      setResult(
        "The nearest palindrome date is " +
          output +
          ", you missed by " +
          nearestPalindromeDate[0] +
          " days."
      );
    }
  };

  const getAllDateVariations = (dateDict) => {
    var dateVariations = [];

    var ddmmyyyy = dateDict.day + dateDict.month + dateDict.year;
    var mmddyyyy = dateDict.month + dateDict.day + dateDict.year;
    var yyyymmdd = dateDict.year + dateDict.month + dateDict.day;
    var ddmmyy = dateDict.day + dateDict.month + dateDict.year.slice(-2);
    var mmddyy = dateDict.month + dateDict.day + dateDict.year.slice(-2);
    var yyddmm = dateDict.year.slice(-2) + dateDict.day + dateDict.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  };

  const convertDateToString = (date) => {
    var dateStr = date.toString().split("-");
    var dateDict = { day: "", month: "", year: "" };

    dateDict["day"] = dateStr[2];
    dateDict["month"] = dateStr[1];
    dateDict["year"] = dateStr[0];
    return dateDict;
  };

  var isPalindrome = (date) => {
    var n = date.length - 1;
    for (var i = 0, j = n; i <= n / 2; i++, j--) {
      if (date[i] != date[j]) {
        return false;
      }
    }
    return true;
  };

  function isLeapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
  }

  function getNextDate(date) {
    let day = parseInt(date.day) + 1;
    let month = parseInt(date.month);
    let year = parseInt(date.year);
    var nextDate = { day: "", month: "", year: "" };
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      } else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }
    nextDate["day"] = convertToTwoDigits(day.toString());
    nextDate["month"] = convertToTwoDigits(month.toString());
    nextDate["year"] = year.toString();
    return nextDate;
  }

  const convertToTwoDigits = (num) => {
    if (num.length == 2) return num;
    else return "0" + num;
  };

  function getNextPalindromeDate(date) {
    var nextDate = getNextDate(convertDateToString(date));
    var resultDate = "";
    var ctr = 0;
    var flag = 0;
    while (1) {
      ctr++;
      var dateVariations = getAllDateVariations(nextDate);
      dateVariations.forEach((date) => {
        if (isPalindrome(date)) {
          flag = 1;
          resultDate = dateVariations[0];
        }
      });
      if (flag == 1) return [ctr, resultDate];
      else {
        nextDate = getNextDate(nextDate);
      }
    }
  }

  return (
    <div className="main-container">
      <div className="conainer">
        <form className="ui form" onSubmit={processAndDisplayResult}>
          <h2>Palindrome Birthday</h2>
          <div className="field">
            <label className="label" for="datePicer">
              <h3>Enter your birthday date:</h3>
            </label>
            <input
              id="datePicker"
              type="date"
              required=""
              onChange={(event) => {
                setDate(event.target.value);
              }}
            ></input>
          </div>
          <button className="showBtn">show</button>
          <div className="output">
            <h2>{result}</h2>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default App;
