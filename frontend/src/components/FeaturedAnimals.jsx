import { useEffect, useState } from "react";
import { getAllAnimals } from "../services/AnimalService";
import AnimalCard from "./AnimalCard";

function FeaturedAnimals() {

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAnimals = async () => {
        try {
            const response = await getAllAnimals();
            setAnimals(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load animals.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnimals();
    }, []);

    if (loading) {
        return (
            <section className="py-5">
                <div className="container text-center">
                    <h4>Loading Animals...</h4>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5 bg-light">

            <div className="container">

                <h2 className="text-center fw-bold mb-5">
    Latest Animals
</h2>

                <div className="row">

                    {animals.length > 0 ? (

                        animals.map((animal) => (

                            <div
                                className="col-lg-3 col-md-6 col-sm-12 mb-4"
                                key={animal.id}
                            >
                                <AnimalCard animal={animal} />
                            </div>

                        ))

                    ) : (

                        <div className="text-center">
                            <h5>No Animals Available.</h5>
                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default FeaturedAnimals;