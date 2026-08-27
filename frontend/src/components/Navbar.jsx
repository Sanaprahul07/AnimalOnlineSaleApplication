import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "./Icons";

// =====================================================
// CATEGORY NAV STRIP  (below the top header)
// =====================================================

function Navbar() {
    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);

    // Quick links shown inline on the strip.
    const quickLinks = [
        "Cow",
        "Buffalo",
        "Goat",
        "Sheep",
        "Horse",
        "Dog",
        "Cat",
        "Birds"
    ];

    // Grouped categories for the "All Categories" mega-menu.
    const groups = [
        {
            title: "🐄 Farm Animals",
            items: ["Cow", "Buffalo", "Ox", "Bull", "Goat", "Sheep", "Horse", "Donkey", "Camel"]
        },
        {
            title: "🐕 Pets",
            items: ["Dog", "Cat", "Rabbit", "Pig"]
        },
        {
            title: "🐔 Poultry & Birds",
            items: ["Chicken", "Duck", "Turkey", "Goose", "Pigeon", "Parrot", "Peacock", "Quail"]
        },
        {
            title: "⭐ Special Animals",
            items: ["Elephant", "Deer", "Yak", "Mule"]
        },
        {
            title: "🐟 Aquatic & Reptiles",
            items: ["Fish", "Turtle"]
        },
        {
            title: "🐦 Other Animals",
            items: ["Ostrich", "Emu", "Guinea Fowl"]
        }
    ];

    // Navigate to the category list page (path param — matches the route).
    const handleCategoryClick = (category) => {
        setShowCategories(false);
        navigate(`/animals/${encodeURIComponent(category)}`);
    };

    return (
        <nav className="as-catnav">
            <div className="container">
                <div className="as-catnav-inner">

                    {/* ALL CATEGORIES TOGGLE */}
                    <button
                        type="button"
                        className="as-catnav-all"
                        onClick={() => setShowCategories(!showCategories)}
                    >
                        <MenuIcon size={16} />
                        All Categories
                    </button>

                    {/* QUICK LINKS */}
                    {quickLinks.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className="as-catnav-link"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}

                    {/* OTHERS → opens the mega-menu */}
                    <button
                        type="button"
                        className="as-catnav-link"
                        onClick={() => setShowCategories(!showCategories)}
                    >
                        Others
                    </button>

                </div>
            </div>

            {/* MEGA MENU */}
            {showCategories && (
                <div className="as-megamenu">
                    <div className="container py-4">
                        <div className="row">
                            {groups.map((group) => (
                                <div className="col-lg-4 col-md-6 mb-4" key={group.title}>
                                    <h6 className="mb-3">{group.title}</h6>
                                    {group.items.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => handleCategoryClick(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
