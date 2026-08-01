import axios from "axios";

const BASE_URL = "http://localhost:8080/api/animal";

export const getAllAnimals = () => {
    return axios.get(`${BASE_URL}/getAll`);
};

export const getAnimalById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const addAnimal = (animal) => {
    return axios.post(`${BASE_URL}/add`, animal);
};

export const updateAnimal = (id, animal) => {
    return axios.put(`${BASE_URL}/update/${id}`, animal);
};

export const deleteAnimal = (id) => {
    return axios.delete(`${BASE_URL}/delete/${id}`);
};