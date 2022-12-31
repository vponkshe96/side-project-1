import { useState } from "react";
import PublicHolidays from "./Components/PublicHolidays";

const App = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="App">
      <label>Start Date </label>
      <input type="date" onSelect={(e) => setStartDate(e.target.value)} />
      <br />
      <br />
      <label>End Date </label>
      <input type="date" onSelect={(e) => setEndDate(e.target.value)} />
      {startDate !== "" && endDate !== "" && (
        <PublicHolidays startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default App;
