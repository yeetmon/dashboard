import React from "react";

import { Line } from "react-chartjs-2";


const HistoricalChart = ({data}) => {

    const formattedData = [];
    for (const time in data) { 
        formattedData.push({t: time, y: data[time]});
    }

    const lineChartData = {
        labels: [],
        datasets: [{
            type: "line",
            label: "stack size",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderWidth: "2",
            lineTension: 0,
            data: formattedData
        }]
    }

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [{
                type: 'time'
            }]
        }
    }
    return <Line data={lineChartData} options={lineChartOptions} />;
};


export default HistoricalChart;