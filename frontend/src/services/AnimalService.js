import axios from "axios";

const BASE_URL = "http://localhost:8080/api/animal";

export const getAllAnimals = () => {
    return axios.get(`${BASE_URL}/getAll`);
};

export const getAnimalsByCategory = (category) => {
    return axios.get(`${BASE_URL}/category/${category}`);
};

export const getAnimalById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const getAnimalsBySeller = (sellerId) => {
    return axios.get(`${BASE_URL}/seller/${sellerId}`);
};

// ADD ANIMAL
export const addAnimal = (animal) => {
    return axios.post(`${BASE_URL}/add`, animal);
};

export const updateAnimal = (id, animal) => {
    return axios.put(`${BASE_URL}/update/${id}`, animal);
};

export const deleteAnimal = (id) => {
    return axios.delete(`${BASE_URL}/delete/${id}`);
};

export const uploadAnimalPhotos = (
    frontPhoto,
    sidePhoto,
    backPhoto
) => {
    const formData = new FormData();

    formData.append("frontPhoto", frontPhoto);
    formData.append("sidePhoto", sidePhoto);
    formData.append("backPhoto", backPhoto);

    return axios.post(
        `${BASE_URL}/images/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};