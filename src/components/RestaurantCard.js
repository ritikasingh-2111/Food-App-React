import { CDN_URL } from "../utils/constants";

const RestaurantCard=(props)=>{
const{resData}=props;

const{
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla

}=resData;
    return(
        <div className="res-card">
            <img className="res-logo" alt="res-logo" src={
  CDN_URL+
  cloudinaryImageId
}/>
<div className="res-content">
            
            <h3>{name} </h3>
           <p>⭐{avgRating} ⏱️{sla.deliveryTime} minutes</p>
            <h4>{costForTwo} for two</h4>
            <p className="cuisine">{cuisines.join(", ")}</p>
            </div>
            
        </div>
    );
};

export default RestaurantCard;