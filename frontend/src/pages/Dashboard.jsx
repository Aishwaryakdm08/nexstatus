import { useEffect, useState } from "react";
import {
    FaServer,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaBolt,
    FaSyncAlt,
    FaPlus,
    FaChartLine
} from "react-icons/fa";

import MainLayout from "../components/Layout/MainLayout";

import ResponseChart from "../components/charts/ResponseChart";
import StatusChart from "../components/charts/StatusChart";
import IncidentChart from "../components/charts/IncidentChart";

import {
    getSummary,
    getStatistics,
    getRecentChecks,
    getRecentIncidents,
    getResponseTimeChart,
    getStatusChart,
    getIncidentChart
} from "../services/dashboardService";

import "../styles/dashboard.css";

function Dashboard() {

    const [summary, setSummary] = useState({});
    const [statistics, setStatistics] = useState({});
    const [checks, setChecks] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [responseChart, setResponseChart] = useState([]);
    const [statusChart, setStatusChart] = useState({});
    const [incidentChart, setIncidentChart] = useState([]);
    
    const fetchDashboard = async () => {

    try {

        const summaryData = await getSummary();
        const statisticsData = await getStatistics();

        const checksData = await getRecentChecks();
        const incidentsData = await getRecentIncidents();

        const responseData = await getResponseTimeChart();
        const statusData = await getStatusChart();
        const incidentData = await getIncidentChart();

        setSummary(summaryData);
        setStatistics(statisticsData);

        setChecks(checksData);
        setIncidents(incidentsData);

        setResponseChart(responseData);
        setStatusChart(statusData);
        setIncidentChart(incidentData);

    } catch (error) {

        console.log(error);
        console.log("Response Chart:", responseChart);
        console.log("Status Chart:", statusChart);
        console.log("Incident Chart:", incidentChart);

    }

};

    useEffect(() => {

        fetchDashboard();

        const interval = setInterval(() => {

            fetchDashboard();

        }, 15000);

        return () => clearInterval(interval);

    }, []);

    return (

        <MainLayout>

            {/* Header */}
           
            <div className="dashboard-header">

                <div>

                    <h1>Dashboard</h1>

                    <p>
                        Monitor all your APIs in one place.
                    </p>

                </div>

            </div>

            {/* System Banner */}

            <div className="system-banner">

                {summary.open_incidents > 0 ?

                    <>
                        🔴 {summary.open_incidents} Active Incident(s)
                    </>

                    :

                    <>
                        🟢 All Systems Operational
                    </>

                }

            </div>

            {/* Summary Cards */}

            <div className="summary-grid">

                <div className="summary-card">

                    <FaServer className="card-icon"/>

                    <h4>Total APIs</h4>

                    <h2>{summary.total_apis ?? 0}</h2>

                </div>

                <div className="summary-card up">

                    <FaCheckCircle className="card-icon"/>

                    <h4>UP Checks</h4>

                    <h2>{summary.up_checks ?? 0}</h2>

                </div>

                <div className="summary-card down">

                    <FaTimesCircle className="card-icon"/>

                    <h4>DOWN Checks</h4>

                    <h2>{summary.down_checks ?? 0}</h2>

                </div>

                <div className="summary-card">

                    <FaExclamationTriangle className="card-icon"/>

                    <h4>Open Incidents</h4>

                    <h2>{summary.open_incidents ?? 0}</h2>

                </div>

            </div>

            {/* Statistics */}

            <div className="summary-grid">

                <div className="summary-card">

                    <FaChartLine className="card-icon"/>

                    <h4>Uptime</h4>

                    <h2>{statistics.uptime_percentage}%</h2>

                </div>

                <div className="summary-card">

                    <FaBolt className="card-icon"/>

                    <h4>Avg Response</h4>

                    <h2>{statistics.average_response_time} ms</h2>

                </div>

                <div className="summary-card">

                    <FaSyncAlt className="card-icon"/>

                    <h4>Total Checks</h4>

                    <h2>{statistics.total_checks}</h2>

                </div>

                <div className="summary-card">

                    <FaTimesCircle className="card-icon"/>

                    <h4>Failed Checks</h4>

                    <h2>{statistics.failed_checks}</h2>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="quick-actions">

                <button>

                    <FaPlus />

                    Add API

                </button>

                <button>

                    <FaSyncAlt />

                    Run Checks

                </button>

                <button onClick={fetchDashboard}>

                    Refresh

                </button>

            </div>

             <div className="charts-grid">

    <div className="chart-card">

    <h2>Response Time</h2>

    <ResponseChart
        data={responseChart}
    />

</div>

    <div className="chart-card">

        <h2>

            API Status Distribution

        </h2>

        <StatusChart

            data={statusChart}

        />

    </div>

</div>

<div className="chart-card">

    <h2>

        Incident Timeline

    </h2>

    <IncidentChart

        data={incidentChart}

    />

</div>
            
            {/* Tables */}

            <div className="dashboard-grid">

                {/* Recent Checks */}

                <div className="table-card">

                    <div className="table-header">

                        <h2>Recent API Checks</h2>

                    </div>

                    <div className="table-scroll">

                        <table className="dashboard-table">

                            <thead>

                                <tr>

                                    <th>API</th>

                                    <th>Status</th>

                                    <th>Code</th>

                                    <th>Response</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    checks.map((check,index)=>(

                                        <tr key={index}>

                                            <td>{check.api_name}</td>

                                            <td>

                                                <span
                                                    className={
                                                        check.status==="UP"
                                                        ?
                                                        "badge-up"
                                                        :
                                                        "badge-down"
                                                    }
                                                >

                                                    {check.status}

                                                </span>

                                            </td>

                                            <td>{check.status_code}</td>

                                            <td>{check.response_time_ms} ms</td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Incidents */}

                <div className="incident-box">

                    <h2>Recent Incidents</h2>

                    <div className="incident-scroll">

                        {

                            incidents.length===0 ?

                            <p>No incidents.</p>

                            :

                            incidents.map((incident,index)=>(

                                <div
                                    key={index}
                                    className="incident-card"
                                >

                                    <h4>{incident.api_name}</h4>

                                    <p>{incident.message}</p>

                                    <small>{incident.status}</small>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}


export default Dashboard;

