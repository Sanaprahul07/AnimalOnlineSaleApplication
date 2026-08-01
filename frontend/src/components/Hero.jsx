function Hero() {
    return (
        <section className="bg-light py-5">
            <div className="container">

                <div className="row align-items-center">

                    {/* Left Side */}

                    <div className="col-md-6">

                        <h1 className="display-4 fw-bold">

                            Buy & Sell Healthy Animals Online

                        </h1>

                        <p className="lead mt-3">

                            Find Cows, Buffaloes, Goats, Sheep and other farm animals
                            from trusted sellers across India.

                        </p>

                        <button className="btn btn-success btn-lg me-3">

                            Explore Animals

                        </button>

                        <button className="btn btn-outline-dark btn-lg">

                            Become Seller

                        </button>

                    </div>

                    {/* Right Side */}

                    <div className="col-md-6 text-center">

                        <img
                            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=700"
                            className="img-fluid rounded shadow"
                            alt="Animal"
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;