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
            borderWidth: "2",
            lineTension: 0,
            data: formattedData,
            backgroundColor: 'rgba(247, 26, 255, 0.21)',
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
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