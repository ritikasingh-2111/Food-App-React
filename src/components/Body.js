import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { SWIGGY_API_URL } from "../utils/constants";

const Body = () => {
  console.log("body working");
  
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (listOfRestaurants.length === 0) return;

    if (searchText === "") {
      setFilteredRestaurants(listOfRestaurants);
      return;
    }

    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchText]);

  const fetchData = async () => {
    try {
      const data = await fetch(SWIGGY_API_URL);

      const json = await data.json();
      console.log(json);

      const restaurants =
        json?.data?.cards?.find(
          (card) =>
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setListOfRestaurants(restaurants || []);
      setFilteredRestaurants(restaurants || []);
    } catch (err) {
      console.error("Restaurant list fetch error:", err);
    }
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      
      {/* 🍔 Craving Text */}
<h2 className="craving-text">What's your craving today? 🍔</h2>

{/* 🔍 Search Section */}
<div className="search-container">

  <div className="search-bar">
    <i className="ri-search-line"></i>

    <input
      type="text"
      className="search-input"
      placeholder="Search for restaurants or food..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.target.blur();
      }}
    />

    <button className="search-btn">
      Search
    </button>

  </div>

</div>

      {/* ⭐ Filter Section */}
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filtered = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );

            setFilteredRestaurants(filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* 🍽 Restaurant Cards */}
      <div className="res-container">
       {filteredRestaurants.map((restaurant) => (
  <Link
    key={restaurant.info.id}
    to={"/restaurant/" + restaurant.info.id}
  >
    <RestaurantCard resData={restaurant.info} />
  </Link>
))}
      </div>
    </div>
  );
};

export default Body;