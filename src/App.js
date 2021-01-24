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
import InfoBox from "./InfoBox";
import Table from "./Table";
import Map from "./Map";
import LineGraph from './LineGraph'
import numeral from "numeral";
import "leaflet/dist/leaflet.css"

function App() {
  // const [country, setCountry] = useState("worldwide");
  const {
    country,
    countries,
    countryInput,
    setCountryInput,
    setCaseType,
    caseType
  } = useGlobalContext();

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

        <div className="app__stat">
          <InfoBox
            title="Today Coronavirus Cases"
            onClick={(e) => setCaseType('cases')}
            active = {caseType === 'cases'}
            cases={numeral(country.todayCases).format("0.0a")}
            total={numeral(country.cases).format("0.0a")}
            isRed
          />
          <InfoBox
            title="Today Recovered People"
            cases={numeral(country.todayRecovered).format("0.0a")}
            onClick={(e) => setCaseType("recovered")}
            active = {caseType === 'recovered'}
            total={numeral(country.recovered).format("0.0a")}
          />
          <InfoBox
            title="Today Death"
            cases={numeral(country.todayDeaths).format("0.0a")}
            onClick={(e) => setCaseType("deaths")}
            active = {caseType === 'deaths'}
            total={numeral(country.deaths).format("0.0a")}
            isRed
          />
        </div>
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases By Country</h3>
            <Table></Table>
            <h3 style = {{textTransform: 'capitalize'}}>{countryInput} line graph</h3>
            <LineGraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
