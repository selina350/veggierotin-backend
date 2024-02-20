import React from "react";
import VegetableCard from "./Vegetables/VegetableCard";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getThreeSuggestions } from "../redux/model/vegetableSlice";
import Collapse from "@mui/material/Collapse";

const VegetablesListContainer = () => {
  const [displayVegetables, setDisplayVegetables] = useState([]);
  const dispatch = useDispatch();
  const vegetables = useSelector((state) => state.model.vegetables);

  useEffect(() => {
    dispatch(getThreeSuggestions());
  }, [dispatch]);

  useEffect(() => {
    let vegetableArray;
    if (displayVegetables.length === 0) {
      vegetableArray = Object.values(vegetables).filter(
        (vegetable) => typeof vegetable === "object"
      );
    } else {
      const displayVegetableMap = {};
      vegetableArray = displayVegetables.map((displayVegetable) => {
        displayVegetableMap[displayVegetable.id] = true;
        const removed = vegetables[displayVegetable.id] === undefined;
        return { ...displayVegetable, removed };
      });
      Object.values(vegetables)
        .filter((vegetable) => typeof vegetable === "object")
        .forEach((vegetable) => {
          if (!displayVegetableMap[vegetable.id]) {
            vegetableArray.push(vegetable);
          }
        });
    }
    setDisplayVegetables(vegetableArray);
  }, [vegetables]);

  const handleAnimationDone = (vegetableId) => {
    setDisplayVegetables(
      displayVegetables.filter((vegetable) => vegetable.id !== vegetableId)
    );
  };

  return (
    <Grid container gap={2} flexDirection="column">
      {displayVegetables.map((vegetable) => {
        return (
          <Collapse
            in={!vegetable.removed}
            key={vegetable.id}
            onExited={() => handleAnimationDone(vegetable.id)}
          >
            <Grid item>
              <VegetableCard vegetable={vegetable} />
            </Grid>
          </Collapse>
        );
      })}
    </Grid>
  );
};

export default VegetablesListContainer;
