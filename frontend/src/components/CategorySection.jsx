import cowImg from "../assets/cowimg.png";
import buffaloImg from "../assets/buffal.jpg";
import goatImg from "../assets/goat1.jpg";
import sheepImg from "../assets/sheep.jpg";
import horseImg from "../assets/MarwariHorse.png";
import dogImg from "../assets/Dog.png";
import catImg from "../assets/Cat.png";

function CategorySection() {

    const categories = [
        {
            name: "Cow",
            image: cowImg,
        },
        {
            name: "Buffalo",
            image: buffaloImg,
        },
        {
            name: "Goat",
            image: goatImg,
        },
        {
            name: "Sheep",
            image: sheepImg,
        },
        {
            name: "Horse",
            image: horseImg,
        },
        {
            name: "Dog",
            image: dogImg,
        },
        {
            name: "Cat",
            image: catImg,
        },
    ];

    return (

        <section className="py-5 bg-white">

            <div className="container">

                {/* ================================
                        SECTION TITLE
                ================================= */}

                <div className="text-center mb-4">

                    <h2 className="fw-bold mb-1">
                        Animal Categories
                    </h2>

                    <p className="text-muted mb-0">
                        Browse animals by category
                    </p>

                </div>


                {/* ================================
                        CATEGORY GRID
                ================================= */}

                <div className="row g-3 justify-content-center">

                    {categories.map((category) => (

                        <div
                            className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12"
                            key={category.name}
                        >

                            <div
                                className="card h-100 border-0 shadow-sm text-center"
                                style={{
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}
                            >

                                {/* ==========================
                                        ANIMAL IMAGE
                                =========================== */}

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="card-img-top"
                                    style={{
                                        width: "100%",
                                        height: "145px",
                                        objectFit: "cover"
                                    }}
                                />


                                {/* ==========================
                                        CARD BODY
                                =========================== */}

                                <div className="card-body py-2">

                                    <h6 className="fw-semibold mb-2">
                                        {category.name}
                                    </h6>


                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm px-3"
                                    >
                                        View Animals
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

export default CategorySection;