import api from "./axios.config.js";

export const getAttendances = (data) => {
    return api.get("attendances/", data)
};

export const getUser = (data) => {
    return api.get("user/list/", data)
};

export const getTrainingTypes = () => {
    return api.get("training-types/")
};

export const getTrainers = () => {
    return api.get("user/staff/", {
        params: {
            group: "Тренери"
        }
    })
};

export const getMassagist = () => {
    return api.get("user/staff/", {
        params: {
            group: "Масажист"
        }
    })
};

export const fetchByUrl = (url, data) => {
    return api.get(url, data)
};