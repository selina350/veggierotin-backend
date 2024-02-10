import React, { useEffect } from "react";
import { List, ListItem } from "@mui/material";
import { getAllVegetablesforUser1 } from "../redux/model/historySlice";
import { useDispatch, useSelector } from "react-redux";

const HistoryContainer = () => {
  const dispatch = useDispatch();
  const user_vegetables = useSelector((state) => state.model.history);
  const list = Object.values(user_vegetables).filter(
    (value) => typeof value === "object"
  );
  console.log(list);
  useEffect(() => {
    dispatch(getAllVegetablesforUser1());
  }, []);
  return (
    <div>
      {list &&
        list.map((user_vegetable) => {
          return (
            <List>
              <ListItem>{user_vegetable.vegetable.name}</ListItem>
            </List>
          );
        })}
    </div>
  );
};

export default HistoryContainer;
