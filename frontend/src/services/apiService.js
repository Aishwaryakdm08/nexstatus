import api from "./api";

export const getApis = async () => {
    const response = await api.get("/apis");
    return response.data;
};

export const addApi = async (data) => {
    const response = await api.post("/apis", data);
    return response.data;
};

export const updateApi = async (id, data) => {
    const response = await api.put(`/apis/${id}`, data);
    return response.data;
};

export const deleteApi = async (id) => {
    const response = await api.delete(`/apis/${id}`);
    return response.data;
};