import React, { useState, useEffect } from "react";
import "./App.css";
import { VictoryChart, VictoryLabel, VictoryAxis, VictoryLine, VictoryTheme } from "victory";
import axios from "axios";

const URL = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla&areaName=Bournemouth, Christchurch and Poole&structure={"date":"date","newCases":"newCasesBySpecimenDate", "rate":"cumCasesBySpecimenDateRate"}`

function App() {
  const [covid, setData] = useState([]);

  useEffect(() => {
    axios.get(URL).then(({ data }) => {
      const result = data.data.map((e) => ({...e, date: new Date(e.date).toLocaleDateString()} ))
      setData(result)
    }).catch(e => console.error(e))
  }, []);


  return (
    <div className="App">
      {console.log(covid)}
      <VictoryChart theme={VictoryTheme.greyscale}>
        <VictoryLabel x={25} y={20} text="Covid in Bournemouth, Christchurch and Poole" />
        <VictoryLabel x={25} y={35} text={"Daily new cases"} />
        <VictoryLine
          data={covid.slice(-90)}
          sortOrder="descending"
          interpolation="basis"
          scale={{ x: "time", y: "linear" }}
          standalone={false}
          x="date"
          y="newCases"
          style={{
            data: {
              stroke: "#CD212A",
              strokeWidth: 1,
            },
          }}
        />
        <VictoryAxis fixLabelOverlap={true} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    </div>
  );
}

export default App;
