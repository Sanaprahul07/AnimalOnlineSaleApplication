import cowImg from "../assets/cowimg.png";
import buffaloImg from "../assets/buffal.jpg";
import goatImg from "../assets/goat1.jpg";
import sheepImg from "../assets/sheep.jpg";
// import heroBanner from "../assets/hero-banner.jpg";

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
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-5">
          Animal Categories
        </h2>

        <div className="row">

          {categories.map((category, index) => (

            <div className="col-md-3 mb-4" key={index}>

              <div className="card shadow text-center">

                <img
                  src={category.image}
                  className="card-img-top"
                  height="220"
                  alt={category.name}
                />

                <div className="card-body">

                  <h5>{category.name}</h5>

                  <button className="btn btn-success mt-2">
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