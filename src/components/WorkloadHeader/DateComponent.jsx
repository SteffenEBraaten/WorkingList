import React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const myLocale = {
  // months list by order
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],

  // week days by order
  weekDays: [
    {
      name: "Monday",
      short: "M",
    },
    {
      name: "Tuesday",
      short: "T",
    },
    {
      name: "Wednesday",
      short: "W",
    },
    {
      name: "Thursday",
      short: "T",
    },
    {
      name: "Friday",
      short: "F",
    },
    {
      name: "Saturday",
      short: "S",
      isWeekend: true,
    },
    {
      name: "Sunday",
      short: "S",
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 6,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },
};

const DateComponent = ({ toggleDate, dateSelected }) => {
  return (
    <Calendar
      value={dateSelected}
      onChange={function onChange(to, from) {
        toggleDate(to, from);
      }}
      shouldHighlightWeekends
      locale={myLocale}

      colorPrimary="#00695C"
      colorPrimaryLight="#b2dfdb"
      box-shadow="0 1em 3em #E8EDF2"
    />
  );
};

export default DateComponent;
