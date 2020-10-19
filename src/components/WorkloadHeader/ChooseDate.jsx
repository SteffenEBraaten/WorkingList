import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";

const myLocale = {
  // months list by order
  months: [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Monday',
      short: 'M',
    },
    {
      name: 'Tuesday',
      short: 'T',
    },
    {
      name: 'Wednesday',
      short: 'W',
    },
    {
      name: 'Thursday',
      short: 'T',
    },
    {
      name: 'Friday',
      short: 'F',
    },
    {
      name: 'Saturday',
      short: 'S',
      isWeekend: true,
    },
    {
        name: 'Sunday', 
        short: 'S',
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

  // texts in the date picker
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',

  // used for input value when multi dates are selected
  digitSeparator: ',',
}

const ChooseDate = (props) => {
    const [selectedDay, setSelectedDay] = useState(utils().getToday());

    // formats the text of the input field
    const formatInputValue = () => {
      if (!selectedDay) return '';
      if (selectedDay.day === utils().getToday().day && selectedDay.month === utils().getToday().month && selectedDay.year === utils().getToday().year) {
        return 'Today';
      }
      return `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`;
    };

    // style calendar 
    const renderCustomInput = ({ ref }) => (
      <input
        readOnly
        ref={ref} 
        value={formatInputValue()}
        style={{
          textAlign: 'center',
          padding: '0.5rem 1rem',
          border: '1px solid black',
          width: '17.5em',
          margin: '1em 0 0',
          color: 'grey700',
          fontSize: '14px',
        }}
      />
    )
    
    return (
      <DatePicker
        value={selectedDay}
        //value={props.selectedDay}
        onChange={setSelectedDay}
        /* onChange={function onChange(value) {
          props.selectedDayToggle(value)
        }} */
        inputPlaceholder="Select a day"
        shouldHighlightWeekends
        locale={myLocale}
        minimumDate={utils().getToday()}
        renderInput={renderCustomInput}
      />
    );
  };

export default ChooseDate;