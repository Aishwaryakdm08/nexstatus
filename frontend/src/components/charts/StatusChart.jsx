import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function StatusChart({ data }) {

    const chartData = {
        labels: ["UP", "DOWN"],
        datasets: [
            {
                data: [
                    data.up || 0,
                    data.down || 0
                ],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (
        <div className="chart-container">
            <Doughnut
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default StatusChart;