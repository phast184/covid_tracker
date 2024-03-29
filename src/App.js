import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import { useGlobalContext } from "./context/context";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import Map from "./components/Map/Map";
import LineGraph from "./components/LineGraph";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";

function App() {
  // const [country, setCountry] = useState("worldwide");
  const {
    country,
    countries,
    countryInput,
    setCountryInput,
    setCaseType,
    caseType,
    typeInputData,
    typeInput,
    setTypeInput,
  } = useGlobalContext();

  console.log(typeInput);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app_dropDown">
            <Select
              variant="outlined"
              value={countryInput}
              onChange={(e) => setCountryInput(e)}
            >
              <MenuItem value="worldwide" selected="selected">
                Worldwide
              </MenuItem>
              {countries.map((country, index) => {
                return (
                  <MenuItem value={country.countryInfo.iso2} key={index}>
                    {country.country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <p className="note">
          *Click on one of the three tags below to see the data of different
          case type.
        </p>
        <p className="note">
          *Click on the drop down menu to see data of different countries.
        </p>
        <div className="app__stat">
          <InfoBox
            title="Today Coronavirus Cases"
            onClick={(e) => setCaseType("cases")}
            active={caseType === "cases"}
            cases={numeral(country.todayCases).format("0.0a")}
            total={numeral(country.cases).format("0.0a")}
            isRed
          />
          <InfoBox
            title="Today Recovered People"
            cases={numeral(country.todayRecovered).format("0.0a")}
            onClick={(e) => setCaseType("recovered")}
            active={caseType === "recovered"}
            total={numeral(country.recovered).format("0.0a")}
          />
          <InfoBox
            title="Today Death"
            cases={numeral(country.todayDeaths).format("0.0a")}
            onClick={(e) => setCaseType("deaths")}
            active={caseType === "deaths"}
            total={numeral(country.deaths).format("0.0a")}
            isRed
          />
        </div>
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <div className="app__right__header">
              <div id="title_header">
                <h4>Live Stats By Country</h4>
                <p className = 'title note'>*Select to see data on <br /> different case type</p>
              </div>
              <FormControl className="app_dropDown">
                <Select
                  variant="outlined"
                  value={typeInput}
                  onChange={(e) => setTypeInput(e)}
                >
                  {typeInputData.map((typeInput, index) => {
                    return (
                      <MenuItem value={typeInput.type} key={index}>
                        {typeInput.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <Table></Table>
            <h4 className = 'graph-header'>{countryInput} line graph</h4>
            <LineGraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
