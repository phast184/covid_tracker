import React from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { useGlobalContext } from "./context/context";
import './LineGraph.css'

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType }) {
  const { historicalCountry } = useGlobalContext();

  return (
    <div className = 'graph'>
      {historicalCountry?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: historicalCountry,
              },
            ],
          }}
          options={options}
        />
      )}

        {historicalCountry.message && (<h3>No data available for this country</h3>)}
    </div>
  );
}

export default LineGraph;
