import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getNewVegetable, getThreeSuggestions } from "../../redux/model/vegetableSlice";

const VegetableCard = ({ vegetable }) => {
  const dispatch = useDispatch();

  const handleBuyButton = () => {
    dispatch(getNewVegetable(vegetable.id))
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={vegetable.url} title="veges" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {vegetable.name}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Some descriptions
        </Typography> */}
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => handleBuyButton(vegetable.id)}>
          Buy
        </Button>
        {/* <Button size="small">Skip</Button> */}
      </CardActions>
    </Card>
  );
};

export default VegetableCard;
