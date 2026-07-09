import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

function ResponseChart({ data }) {

    const chartData = {

        labels: data.map(item => item.time),

        datasets: [

            {

                label: "Response Time (ms)",

                data: data.map(item => item.response_time),

                borderColor: "#2563eb",

                backgroundColor: "rgba(37,99,235,.15)",

                fill: true,

                tension: 0.4,

                pointRadius: 4

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            }

        }

    };

    return (

        <div className="chart-container">

            <Line
                data={chartData}
                options={options}
            />

        </div>

    );

}

export default ResponseChart;