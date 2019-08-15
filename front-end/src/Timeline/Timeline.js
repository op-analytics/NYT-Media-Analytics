import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Timeline() {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  const [datasets] = useState([
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      pointBorderColor: "rgba(172,75,125,0.8)",
      pointBackgroundColor: "rgba(172,75,125,1)",
      pointBorderWidth: 1.5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderWidth: 2,
      pointHitRadius: 10,
      data: [
        {
          year: 1980,
          word: "boat",
          rank: 1525,
          count: 3223,
          y: 0.0126
        },
        { year: 1981, word: "boat", rank: 1400, count: 3400, y: 0.013 },
        { year: 1982, word: "boat", rank: 1420, count: 3375, y: 0.01352324 },
        { year: 1983, word: "boat", rank: 1475, count: 4000, y: 0.01145463 },
        { year: 1984, word: "boat", rank: 1600, count: 3955, y: 0.012745 }
      ]
    }
  ]);

  const [labels] = useState(["1980", "1981", "1982", "1983", "1984"]);

  useEffect(() => {
    setData(data => {
      return { ...data, datasets, labels };
    });
  }, [datasets, labels]);

  const createLabels = labels => {
    return function(tooltipItem, data) {
      return labels.reduce(
        (accum, { key, value }) =>
          accum.concat(
            key + data["datasets"][0]["data"][tooltipItem["index"]][value]
          ),
        []
      );
    };
  };

  const [word, setWord] = useState("example");
  const [startYear, setStartYear] = useState("1970");
  const [endYear, setStartWord] = useState("2018");

  return (
    <div>
      <form className="input-form"> 
        <label>Word:</label>
        <input className="input-field"
          value={word}
          type="text"
          onChange={e => setWord(e.target.value)}
        />
        <label>Start year:</label>
        <input className="input-field"
          value={startYear}
          type="text"
          onChange={e => setWord(e.target.value)}
        />
         <label>End year:</label>
         <input className="input-field"
          value={endYear}
          type="text"
          onChange={e => setWord(e.target.value)}
        />
      </form>
      <Line
        data={data}
        width={500}
        height={300}
        options={{
          maintainAspectRatio: false,
          responsive: false,
          tooltips: {
            callbacks: {
              title: function(tooltipItem, data) {
                const response = data.datasets[0].data[tooltipItem[0].index];
                return response["year"] + " - " + response["word"];
              },
              label: createLabels([
                { key: "Frequency: ", value: "y" },
                { key: "Count: ", value: "count" },
                { key: "Rank: ", value: "rank" }
              ])
            }
          }
        }}
      />
    </div>
  );
}