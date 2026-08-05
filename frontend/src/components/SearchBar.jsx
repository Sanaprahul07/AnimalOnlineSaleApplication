import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="bg-white shadow-sm py-3 border-bottom">

      <div className="container">

        <div className="row g-3 align-items-center">

          {/* Location */}

          <div className="col-lg-3">

            <div className="input-group">

              <span className="input-group-text bg-white">
                <FaMapMarkerAlt />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Select Location"
              />

            </div>

          </div>

          {/* Search */}

          <div className="col-lg-9">

            <div className="input-group">

              <input
                type="text"
                className="form-control"
                placeholder="Search Cow, Goat, Buffalo..."
              />

              <button className="btn btn-dark px-4">

                <FaSearch />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchBar;