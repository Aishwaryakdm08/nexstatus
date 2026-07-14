import { useEffect, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { getRecentIncidents } from "../services/dashboardService";

import {
    FaSearch,
    FaCalendarAlt,
    FaExclamationTriangle,
    FaEye,
    FaTimes
} from "react-icons/fa";

import "../styles/incidents.css";

function Incidents() {

    const [incidents, setIncidents] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedDate, setSelectedDate] = useState("");

    const [selectedIncident, setSelectedIncident] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    useEffect(() => {

        loadIncidents();

    }, []);

    const loadIncidents = async () => {

        try {

            const data = await getRecentIncidents();

            setIncidents(data);

            setFiltered(data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        let data = [...incidents];

        if (search !== "") {

            data = data.filter((item) =>
                item.api_name.toLowerCase().includes(search.toLowerCase()) ||
                item.message.toLowerCase().includes(search.toLowerCase())
            );

        }

        if (statusFilter !== "ALL") {

            data = data.filter(
                (item) => item.status === statusFilter
            );

        }

        if (selectedDate !== "") {

            data = data.filter((item) => {

                const incidentDate =
                    new Date(item.created_at)
                        .toISOString()
                        .split("T")[0];

                return incidentDate === selectedDate;

            });

        }

        setFiltered(data);

        setCurrentPage(1);

    }, [
        search,
        statusFilter,
        selectedDate,
        incidents
    ]);

    const totalPages = Math.ceil(
        filtered.length / itemsPerPage
    );

    const start =
        (currentPage - 1) * itemsPerPage;

    const end =
        start + itemsPerPage;

    const currentIncidents =
        filtered.slice(start, end);

    const openCount =
        incidents.filter(
            i => i.status === "OPEN"
        ).length;

    const resolvedCount =
        incidents.filter(
            i => i.status === "RESOLVED"
        ).length;

    const getSeverity = (message) => {

        const msg = message.toLowerCase();

        if (
            msg.includes("timeout") ||
            msg.includes("down") ||
            msg.includes("500")
        ) {
            return "HIGH";
        }

        if (
            msg.includes("404") ||
            msg.includes("unauthorized")
        ) {
            return "MEDIUM";
        }

        return "LOW";

    };

    const clearFilters = () => {

        setSearch("");

        setStatusFilter("ALL");

        setSelectedDate("");

    };
        return (

        <MainLayout>

            <div className="incidents-page">

                <div className="page-header">

                    <div>

                        <h1>Incident History</h1>

                        <p>
                            View all API failures detected by NexStatus.
                        </p>

                    </div>

                </div>

                {/* Summary */}

                <div className="incident-summary">

                    <div className="summary-card">

                        <h3>Total</h3>

                        <span>{incidents.length}</span>

                    </div>

                    <div className="summary-card open">

                        <h3>Open</h3>

                        <span>{openCount}</span>

                    </div>

                    <div className="summary-card resolved">

                        <h3>Resolved</h3>

                        <span>{resolvedCount}</span>

                    </div>

                </div>

                {/* Filters */}

                <div className="filter-bar">

                    <div className="search-box">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search API or Message..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    <div className="date-box">

                        <FaCalendarAlt />

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) =>
                                setSelectedDate(e.target.value)
                            }
                        />

                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >

                        <option value="ALL">
                            All Status
                        </option>

                        <option value="OPEN">
                            OPEN
                        </option>

                        <option value="RESOLVED">
                            RESOLVED
                        </option>

                    </select>

                    <button
                        className="clear-btn"
                        onClick={clearFilters}
                    >

                        Clear

                    </button>

                </div>

                {/* Table */}

                <div className="table-card">

                    <table>

                        <thead>

                            <tr>

                                <th>API</th>

                                <th>Status</th>

                                <th>Severity</th>

                                <th>Message</th>

                                <th>Date</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentIncidents.length === 0 ? (

                                <tr>

                                    <td colSpan="6">

                                        No incidents found.

                                    </td>

                                </tr>

                            ) : (

                                currentIncidents.map((item, index) => (

                                    <tr key={index}>

                                        <td>

                                            {item.api_name}

                                        </td>

                                        <td>

                                            <span
                                                className={`status ${item.status.toLowerCase()}`}
                                            >

                                                {item.status}

                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={`severity ${getSeverity(item.message).toLowerCase()}`}
                                            >

                                                <FaExclamationTriangle />

                                                {" "}

                                                {getSeverity(item.message)}

                                            </span>

                                        </td>

                                        <td>

                                            {item.message}

                                        </td>

                                        <td>

                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}

                                        </td>

                                        <td>

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    setSelectedIncident(item)
                                                }
                                            >

                                                <FaEye />

                                                View

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}

                <div className="pagination">

                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(currentPage - 1)
                        }
                    >

                        Previous

                    </button>

                    <span>

                        Page {currentPage} of {totalPages || 1}

                    </span>

                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() =>
                            setCurrentPage(currentPage + 1)
                        }
                    >

                        Next

                    </button>

                </div>

                {/* Modal */}

                {selectedIncident && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <button
                                className="close-btn"
                                onClick={() =>
                                    setSelectedIncident(null)
                                }
                            >

                                <FaTimes />

                            </button>

                            <h2>

                                Incident Details

                            </h2>

                            <p>

                                <strong>API:</strong>{" "}

                                {selectedIncident.api_name}

                            </p>

                            <p>

                                <strong>Status:</strong>{" "}

                                {selectedIncident.status}

                            </p>

                            <p>

                                <strong>Severity:</strong>{" "}

                                {getSeverity(selectedIncident.message)}

                            </p>

                            <p>

                                <strong>Message:</strong>{" "}

                                {selectedIncident.message}

                            </p>

                            <p>

                                <strong>Created:</strong>{" "}

                                {new Date(
                                    selectedIncident.created_at
                                ).toLocaleString()}

                            </p>

                            {selectedIncident.resolved_at && (

                                <p>

                                    <strong>Resolved:</strong>{" "}

                                    {new Date(
                                        selectedIncident.resolved_at
                                    ).toLocaleString()}

                                </p>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </MainLayout>

    );

}

export default Incidents;