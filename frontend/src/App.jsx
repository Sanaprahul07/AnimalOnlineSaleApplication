import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnimalList from "./pages/AnimalList";
import AnimalDetails from "./pages/AnimalDetails";

// Seller Layout
import SellerLayout from "./components/seller/SellerLayout";

// Seller Pages
import SellerLogin from "./pages/seller/SellerLogin";
import SellerRegister from "./pages/seller/SellerRegister";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProfile from "./pages/seller/SellerProfile";
import MyAnimals from "./pages/seller/MyAnimals";
import AddAnimal from "./pages/seller/AddAnimal";
import EditAnimal from "./pages/seller/EditAnimal";

function App() {

    return (

        <Routes>

            {/* =========================
                    PUBLIC ROUTES
            ========================= */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/animals/:category"
                element={<AnimalList />}
            />

            <Route
                path="/animal/:id"
                element={<AnimalDetails />}
            />

            {/* =========================
                    SELLER ROUTES
            ========================= */}

            <Route
                path="/seller/login"
                element={<SellerLogin />}
            />

            <Route
                path="/seller/register"
                element={<SellerRegister />}
            />

            <Route
                path="/seller/dashboard"
                element={
                    <SellerLayout>
                        <SellerDashboard />
                    </SellerLayout>
                }
            />

            <Route
                path="/seller/profile"
                element={
                    <SellerLayout>
                        <SellerProfile />
                    </SellerLayout>
                }
            />

            <Route
                path="/seller/animals"
                element={
                    <SellerLayout>
                        <MyAnimals />
                    </SellerLayout>
                }
            />

            <Route
                path="/seller/add-animal"
                element={
                    <SellerLayout>
                        <AddAnimal />
                    </SellerLayout>
                }
            />

            <Route
                path="/seller/edit-animal/:id"
                element={
                    <SellerLayout>
                        <EditAnimal />
                    </SellerLayout>
                }
            />

        </Routes>

    );

}

export default App;