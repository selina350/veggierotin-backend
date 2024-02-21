import React, { useEffect } from "react";
import { List, ListItem } from "@mui/material";
import { getAllVegetablesforUser1 } from "../redux/model/historySlice";
import { useDispatch, useSelector } from "react-redux";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

const HistoryContainer = () => {
  const dispatch = useDispatch();
  const user_vegetables = useSelector((state) => state.model.history);
  let objOfList = {};
  let list = [];
  for (let key in user_vegetables) {
    let date;
    let vegeName;
    if (user_vegetables[key].createdAt) {
      date = new Date(user_vegetables[key].createdAt).toDateString();
      vegeName = user_vegetables[key].vegetable.name;
      if (objOfList[date] === undefined) {
        objOfList[date] = [vegeName];
      } else {
        objOfList[date].push(vegeName);
      }
    }
  }
  for (let key in objOfList) {
    let date = key;
    let vege = objOfList[key];
    let ele = { date: date, vege: vege };
    list.push(ele);
  }

  useEffect(() => {
    dispatch(getAllVegetablesforUser1());
  }, []);
  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {list &&
          list.map((obj) => (
            <li key={`section-${obj.date}`}>
              <ul>
                <ListSubheader>{`Shopping Time ${obj.date}`}</ListSubheader>
                {obj.vege.map((item) => (
                  <ListItem key={`item-${obj.date}-${item}`}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
      </List>
    </div>
  );
};

export default HistoryContainer;
