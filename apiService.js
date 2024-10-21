import api from "./axios.config.js";

export const getAttendances = ( data, userId) => {
    if (userId) return api.get(`attendances/?user_id=${userId}`, data)
    return api.get("attendances/", data)
};

export const getTrainings = ( data ) => {
    return api.get("trainings/", data)
}

export const getParticipants = ( trainingId ) => {
    return api.get(`trainings-users/?training_id=${trainingId}`)
}

export const getUserTrainings = (data, userId) => {
    if (userId) return api.get(`trainings-users/?user_id=${userId}`, data)
    return api.get("trainings-users/", data)
};

export const getUserSubscriptions = (data, userId) => {
    if (userId) return api.get(`subscriptions-users/?user_id=${userId}`, data)
    return api.get("subscriptions-users/", data)
};

export const getUser = (data) => {
    return api.get("user/list/", data)
};

export const patchUser = (id, data) => {
  return api.patch(`user/${id}/`, data)
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
            group: "Масажисти"
        }
    })
};

export const fetchByUrl = (url, data) => {
    return api.get(url, data)
};