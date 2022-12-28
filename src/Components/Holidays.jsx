import { useState, useEffect } from "react";
import axios from "axios";

const Holidays = () => {
  //variables need to call the API
  //CREATE .ENV FILE LATER to store API KEY
  const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
  const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
    "holiday@group.v.calendar.google.com";
  const API_KEY = process.env.REACT_APP_API_KEY;
  const CALENDAR_REGION = "en.hong_kong.official"; // This variable refers to region whose holidays do we need to fetch
  const timeMin = new Date("2023-01-01").toISOString();
  const timeMax = new Date("2023-12-31").toISOString();

  const [publicHolidays, setHolidays] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}&timeMin=${timeMin}&timeMa x=${timeMax}`
      )
      .then((response) => {
        //response.data.items is an array of nested objects
        //each object has info about one public holiday
        const formattedResponse = response.data.items.map(
          //destructure what we want from object
          //return an array of objects with obj having two properties
          ({ summary, start: { date } }) => ({ summary, date })
        );
        setHolidays(formattedResponse);
      });
  }, []);

  for (let i = 0; i < publicHolidays.length; i++) {
    const temp = publicHolidays[i].date;
    publicHolidays[i].date = new Date(temp).toDateString();
  }

  const publicHolidayList = (
    <ol>
      {publicHolidays.map((holiday, index) => (
        <li key={index}>
          <strong>{holiday.date}</strong> {holiday.summary}
        </li>
        //if you want can refactor above JSX by creating another component - good exercise to attempt in the future
        //test
      ))}
    </ol>
  );

  const getDatesArray = (startDate, endDate) => {
    const datesArray = new Array();
    let dateObject = new Date(startDate);
    while (dateObject <= endDate) {
      datesArray.push(dateObject.toDateString());
      dateObject.setDate(dateObject.getDate() + 1);
    }
    return datesArray;
  };

  let startDate = new Date("2023-01-01");
  let endDate = new Date("2023-12-31");
  const datesArray = getDatesArray(startDate, endDate);

  const getDatesInfoArray = (datesArray, publicHolidays) => {
    const datesInfoArray = [];
    for (let i = 0; i < datesArray.length; i++) {
      const dateInfoObject = {};
      //filling date
      dateInfoObject.date = datesArray[i];
      //filling type
      if (
        new Date(datesArray[i]).getDay() === 0 ||
        new Date(datesArray[i]).getDay() === 6
      ) {
        dateInfoObject.type = "weekend";
        dateInfoObject.isHoliday = true;
      } else {
        dateInfoObject.type = "weekday";
        dateInfoObject.isHoliday = false;
      }
      datesInfoArray.push(dateInfoObject);
    }
    for (let i = 0; i < publicHolidays.length; i++) {
      if (datesInfoArray[i].date === publicHolidays[i].date) {
        datesInfoArray[i].isHoliday = true;
        datesInfoArray[i].type = publicHolidays[i].summary;
      }
    }
    return datesInfoArray;
  };

  let datesInfoArray = getDatesInfoArray(datesArray, publicHolidays);
  console.log(datesInfoArray);

  return <div className="App">{publicHolidayList}</div>;
};

export default Holidays;
