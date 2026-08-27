import axios from "axios";

const BASE_URL =
    "http://localhost:8080/api/animal";

// =====================================
// GET ALL ANIMALS
// =====================================

export const getAllAnimals = () => {

    return axios.get(
        `${BASE_URL}/getAll`
    );

};


// =====================================
// GET ANIMALS BY CATEGORY
// =====================================

export const getAnimalsByCategory = (
    category
) => {

    return axios.get(
        `${BASE_URL}/category/${category}`
    );

};


// =====================================
// GET ANIMAL BY ID
// =====================================

export const getAnimalById = (
    id
) => {

    return axios.get(
        `${BASE_URL}/${id}`
    );

};


// =====================================
// GET ANIMALS BY SELLER
// =====================================

export const getAnimalsBySeller = (
    sellerId
) => {

    return axios.get(
        `${BASE_URL}/seller/${sellerId}`
    );

};


// =====================================
// ADD ANIMAL
// =====================================

export const addAnimal = (
    animal
) => {

    return axios.post(
        `${BASE_URL}/add`,
        animal
    );

};


// =====================================
// UPDATE ANIMAL
// =====================================

export const updateAnimal = (
    id,
    animal
) => {

    return axios.put(
        `${BASE_URL}/update/${id}`,
        animal
    );

};


// =====================================
// DELETE ANIMAL
// =====================================

export const deleteAnimal = (
    id
) => {

    return axios.delete(
        `${BASE_URL}/delete/${id}`
    );

};


// =====================================
// UPLOAD 3 ANIMAL PHOTOS
// =====================================

export const uploadAnimalPhotos = (
    frontPhoto,
    sidePhoto,
    backPhoto
) => {

    const formData = new FormData();

    formData.append(
        "frontPhoto",
        frontPhoto
    );

    formData.append(
        "sidePhoto",
        sidePhoto
    );

    formData.append(
        "backPhoto",
        backPhoto
    );

    return axios.post(
        `${BASE_URL}/images/upload`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    );
};