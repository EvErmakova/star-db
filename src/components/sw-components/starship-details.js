import React from "react";
import ItemDetails, {Record} from "../item-details";
import {withSwapiService} from "../hoc-helper";

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model" />
            <Record field="manufacturer" label="Manufacturer" />
            <Record field="costInCredits" label="Cost In Credits" />
            <Record field="length" label="Length" />
            <Record field="crew" label="Crew" />
            <Record field="passengers" label="Passengers" />
            <Record field="cargoCapacity" label="Cargo Capacity" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
  return {
      getData: swapiService.getStarship,
      getImageUrl: swapiService.getStarshipImage
  };
};

export default withSwapiService(StarshipDetails, mapMethodsToProps);
