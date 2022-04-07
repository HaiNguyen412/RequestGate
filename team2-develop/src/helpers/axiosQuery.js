import axiosInstance from "./axiosInstance";

export const getRequest = (URL) => {
  return axiosInstance.get(`/${URL}`).then((response) => response);
};
export const postRequest = (URL, payload) => {
  return axiosInstance.post(`/${URL}`, payload).then((response) => response);
};
export const putRequest = (URL, payload) => {
  return axiosInstance.put(`/${URL}`, payload).then((response) => response);
};
export const deleteRequest = (URL, payload) => {
  return axiosInstance.delete(`/${URL}`, payload).then((response) => response);
};
export const patchRequest = (URL, payload) => {
  return axiosInstance.patch(`/${URL}`, payload).then((response) => response);
};
