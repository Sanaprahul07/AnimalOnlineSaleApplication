import { useParams } from "react-router-dom";

function AnimalDetails() {

    const { id } = useParams();

    return (
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="text-success">
                        Animal Details
                    </h2>

                    <p>
                        Animal ID: <strong>{id}</strong>
                    </p>

                    <p>
                        Animal details will be displayed here.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AnimalDetails;