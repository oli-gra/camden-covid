import React, { useState, useEffect } from "react";
import "./App.css";
import { VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from "victory";
import axios from "axios";

function App() {
  const [covid, setRow] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://data.london.gov.uk/api/table/s8c9t_j4fs2?area_name=Camden&$where=new_cases>0&$order=date desc&$limit=5000"
      )
      .then(({ data }) => setRow(data.rows));
  }, []);

  return (
    <div className="App">
      <VictoryChart theme={VictoryTheme.grayscale}>
        <VictoryLabel x={25} y={20} text="Covid in Camden" />
        <VictoryLabel x={25} y={35} text={"Daily new cases"} />
        <VictoryLine
          data={covid}
          sortOrder="descending"
          interpolation="basis"
          scale={{ x: "time", y: "linear" }}
          standalone={false}
          x="date"
          y="new_cases"
          style={{
            data: {
              stroke: "#CD212A",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
    </div>
  );
}

export default App;
