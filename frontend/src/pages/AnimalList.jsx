import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimalsByCategory } from "../services/AnimalService";
import AnimalCard from "../components/AnimalCard";

function AnimalList() {

    const { category } = useParams();

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAnimals = async () => {

            try {

                setLoading(true);

                const response = await getAnimalsByCategory(category);

                setAnimals(response.data);

            } catch (error) {

                console.log(error);

                setError("Unable to load animals.");

            } finally {

                setLoading(false);

            }

        };

        fetchAnimals();

    }, [category]);

    if (loading) {

        return (
            <div className="container text-center py-5">
                <h3>Loading...</h3>
            </div>
        );

    }

    if (error) {

        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );

    }

    return (

        <div className="container py-5">

            <h2 className="text-success mb-4">
                {category} Animals
            </h2>

            <div className="row">

                {animals.length > 0 ? (

                    animals.map((animal) => (

                        <div
                            className="col-lg-3 col-md-4 col-sm-6 mb-4"
                            key={animal.id}
                        >
                            <AnimalCard animal={animal} />
                        </div>

                    ))

                ) : (

                    <div className="text-center">
                        <h4>No Animals Found</h4>
                    </div>

                )}

            </div>

        </div>

    );

}

export default AnimalList;