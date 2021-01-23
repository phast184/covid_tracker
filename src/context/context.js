/**STEPS TO BUILD A CONTEXT FOLDER
 * 1) CREATE AN INITIAL STATE OUTSIDE THE FUNCTION COMPONENT
 * 2) CREATE CONTEXT
 * 3) CREATE A PROVIDER FUNCTION
 * 4) CREATE A CUSTOM USE CONTEXT
 */

import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/reducer";
import { fetchThings, buildChartData } from "../utils/helpers";
import {
  LOAD_DATA_COUNTRIES,
  LOAD_DATA_ALL,
  LOAD_DATA_COUNTRY,
  SORT_COUNTRIES,
  SET_COUNTRY_INPUT,
  LOAD_HISTORICAL_COUNTRY,
  SET_CASE_TYPE,
} from "./actions";

const initialState = {
  all: [],
  caseType: "cases",
  countries: [],
  country: {},
  countryInput: "worldwide",
  sortedCountries: [],
  historicalCountry: {},
};
const GlobalContext = React.createContext();
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCountries = async () => {
    let url = "https://disease.sh/v3/covid-19/countries";
    const data = await fetchThings(url);
    dispatch({ type: LOAD_DATA_COUNTRIES, payload: data });
  };

  const fetchAll = async () => {
    let url = "https://disease.sh/v3/covid-19/all";
    const data = await fetchThings(url);
    dispatch({ type: LOAD_DATA_ALL, payload: data });
  };

  const sortCountries = () => {
    dispatch({ type: SORT_COUNTRIES });
  };

  const setCountryInput = (e) => {
    dispatch({ type: SET_COUNTRY_INPUT, payload: e.target.value });
  };

  const setCaseType = (type) => {
    dispatch({ type: SET_CASE_TYPE, payload: type });
  };

  console.log(state.historicalCountry);
  /**Every time there is a change in inputCountry load new country data */
  useEffect(() => {
    dispatch({ type: LOAD_DATA_COUNTRY });
    const fetchHistorical = async () => {
      let url = "";
      let chartData;
      try {
        if (state.countryInput === "worldwide") {
          url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
          const data = await fetchThings(url);
          chartData = buildChartData(data, state.caseType);
        } else {
          url = `https://disease.sh/v3/covid-19/historical/${state.countryInput}?lastdays=120`;
          const data = await fetchThings(url);
          chartData = buildChartData(data.timeline, state.caseType);
        }
        dispatch({ type: LOAD_HISTORICAL_COUNTRY, payload: chartData });
      } catch (error) {
          console.log(error)
      }
    };
    fetchHistorical();
  }, [state.countryInput, state.country, state.caseType]);

  useEffect(() => {
    fetchAll();
    fetchCountries();
    sortCountries();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ ...state, sortCountries, setCountryInput, setCaseType }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
