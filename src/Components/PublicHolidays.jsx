import { useState, useEffect } from "react";
import YearInfo from "./YearInfo";
import axios from "axios";

const PublicHolidays = () => {
  const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
  const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
    "holiday@group.v.calendar.google.com";
  const API_KEY = process.env.REACT_APP_API_KEY;
  const CALENDAR_REGION = "en.hong_kong.official"; // This variable refers to region whose holidays do we need to fetch
  const timeMin = new Date("2023-01-01").toISOString();
  const timeMax = new Date("2023-12-31").toISOString();

  const [publicHolidays, setPublicHolidays] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`
      )
      .then((response) => {
        //response.data.items is an array of nested objects
        //each object has info about one public holiday
        const formattedResponse = response.data.items.map(
          //destructure what we want from object
          //return an array of objects with obj having two properties
          ({ summary, start: { date } }) => ({ summary, date })
        );
        setPublicHolidays(formattedResponse);
      });
  }, []);

  //public holidays is an array of objects with obj having two properties
  //summary and date
  //want to modify date via below loop
  for (let i = 0; i < publicHolidays.length; i++) {
    const temp = publicHolidays[i].date;
    let a = (publicHolidays[i].date = new Date(temp).toDateString());
  }

  //JSX to be rendered on the screen
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
  return (
    <div className="App">
      {publicHolidayList}
      <YearInfo publicHolidays={publicHolidays} />
    </div>
  );
};

export default PublicHolidays;
