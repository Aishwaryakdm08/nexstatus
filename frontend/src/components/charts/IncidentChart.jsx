import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function IncidentChart({ data }) {

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: "Incidents",
                data: data.map(item => item.count),
                backgroundColor: "#f59e0b"
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
            <Bar
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default IncidentChart;