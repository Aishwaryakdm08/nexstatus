import api from "./api";

export const getSummary = async () => {
    const response = await api.get("/dashboard/summary");
    return response.data;
};

export const getStatistics = async () => {
    const response = await api.get("/dashboard/statistics");
    return response.data;
};

export const getRecentChecks = async () => {
    const response = await api.get("/dashboard/recent-checks");
    return response.data;
};

export const getRecentIncidents = async () => {
    const response = await api.get("/dashboard/incidents");
    return response.data;
};

export const getResponseTimeChart = async () => {
    const response = await api.get("/dashboard/chart/response-time");
    return response.data;
};

export const getStatusChart = async () => {
    const response = await api.get("/dashboard/chart/status");
    return response.data;
};

export const getIncidentChart = async () => {
    const response = await api.get("/dashboard/chart/incidents");
    return response.data;
};