import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { SWIGGY_MENU_URL } from "../utils/constants";

const RestaurantsMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(SWIGGY_MENU_URL + resId);

      if (!data.ok) {
        throw new Error(`API returned status ${data.status}`);
      }

      const json = await data.json();
      console.log("Menu API response:", json);
      setResInfo(json?.data);
    } catch (err) {
      console.error("Menu fetch error:", err);
      setError(err.message);
    }
  };

  if (error) return <h2>Something went wrong: {error}</h2>;
  if (resInfo === null) return <Shimmer />;

  const infoCard = resInfo?.cards?.find(
    (c) => c?.card?.card?.info?.name
  );
  const { name, cuisines, costForTwoMessage } =
    infoCard?.card?.card?.info || {};

  const groupedCard = resInfo?.cards?.find(
    (c) => c?.groupedCard?.cardGroupMap?.REGULAR
  );
  const regularCards =
    groupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const itemCards =
    regularCards.find(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )?.card?.card?.itemCards || [];

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item?.card?.info?.id}>
            {item?.card?.info?.name} - ₹
            {item?.card?.info?.price
              ? item.card.info.price / 100
              : item?.card?.info?.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsMenu;
