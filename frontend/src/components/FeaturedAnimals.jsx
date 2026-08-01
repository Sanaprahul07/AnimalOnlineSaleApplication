import { useEffect, useState } from "react";
import { getAllAnimals } from "../services/AnimalService";

function FeaturedAnimals() {

    // State
    const [animals, setAnimals] = useState([]);

    // Backend API Call
    function loadAnimals() {

        getAllAnimals()
            .then((response) => {

                console.log(response.data);
                setAnimals(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }

    // Page Load झाल्यावर Call होईल
    useEffect(() => {

        loadAnimals();

    }, []);

    return (

        <section className="py-5 bg-light">

            <div className="container">

                <h2 className="text-center mb-5">
                    Featured Animals
                </h2>

                <div className="row">

                    {animals.map((animal) => (

                        <div className="col-md-4 mb-4" key={animal.id}>

                            <div className="card shadow h-100">

                                <img
                                    src="https://via.placeholder.com/400x250"
                                    className="card-img-top"
                                    height="250"
                                    alt={animal.animalName}
                                />

                                <div className="card-body">

                                    <h4>{animal.animalName}</h4>

                                    <p>
                                        <strong>Breed :</strong> {animal.breed}
                                    </p>

                                    <p>
                                        <strong>Category :</strong> {animal.category}
                                    </p>

                                    <p>
                                        <strong>Location :</strong> {animal.location}
                                    </p>

                                    <h5 className="text-success">
                                        ₹ {animal.price}
                                    </h5>

                                    <button className="btn btn-success w-100">
                                        View Details
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}

export default FeaturedAnimals;