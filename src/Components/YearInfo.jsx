import React from "react";

const YearInfo = (props) => {
  let { startDate, endDate, publicHolidays } = props;

  const getYearDates = (startDate, endDate) => {
    const yearDates = new Array();
    let dateObject = new Date(startDate);
    while (dateObject <= endDate) {
      yearDates.push(dateObject.toDateString());
      dateObject.setDate(dateObject.getDate() + 1);
    }
    return yearDates;
  };

  let startDateObject = new Date(startDate);
  let endDateObject = new Date(endDate);
  //array of 365 elements, each element is a day + date
  const yearDates = getYearDates(startDateObject, endDateObject);

  const getYearDatesInfo = (yearDates, publicHolidays) => {
    const yearDatesInfo = [];
    for (let i = 0; i < yearDates.length; i++) {
      const dateInfo = {};
      //filling date
      dateInfo.date = yearDates[i];
      //filling type
      if (
        new Date(yearDates[i]).getDay() === 0 ||
        new Date(yearDates[i]).getDay() === 6
      ) {
        dateInfo.type = "weekend";
        dateInfo.isHoliday = true;
      } else {
        dateInfo.type = "weekday";
        dateInfo.isHoliday = false;
      }
      yearDatesInfo.push(dateInfo);
    }
    for (let i = 0; i < yearDatesInfo.length; i++) {
      for (let j = 0; j < publicHolidays.length; j++) {
        if (yearDatesInfo[i].date === publicHolidays[j].date) {
          yearDatesInfo[i].isHoliday = true;
          yearDatesInfo[i].type = publicHolidays[j].summary;
        }
      }
    }
    return yearDatesInfo;
  };
  //array of 365 objects
  //each object has date,type, and isHoliday property
  let yearDatesInfo = getYearDatesInfo(yearDates, publicHolidays);
  console.log(yearDatesInfo);

  // //ALGO STARTS
  // const getLeavePeriod = (yearDatesInfo, leaves) => {
  //   let ans = 0;

  //   let j = -1;
  //   let count = 0;
  //   for (let i = 0; i < yearDatesInfo.length; i++) {
  //     if (yearDatesInfo[i].isHoliday === false) {
  //       count++;
  //     }
  //     while (count > leaves) {
  //       j++;
  //       if (yearDatesInfo[i].isHoliday === false) {
  //         j--;
  //       }
  //     }
  //     let len = i - j;
  //     if (len > ans) {
  //       ans = len;
  //     }
  //     console.log(ans);
  //   }
  //   return ans;
  // };

 

  return <div>hi</div>;
};

export default YearInfo;
