import axios from "axios";

let allVegetables = [];
let userPickHistory =
  JSON.parse(window.localStorage.getItem("userPickHistory")) || [];

export const getSuggestionsForGuest = async (isInitLoad) => {
  if (isInitLoad || allVegetables.length === 0) {
    try {
      const response = await axios.get(`/api/vegetables`);
      const { data } = response;
      allVegetables = data.vegetables;
    } catch (error) {
      return error;
    }
  }
  const numberOfVegetables = allVegetables.length;
  const recentlyPikcedId = userPickHistory
    .slice(-(numberOfVegetables - 3))
    .reduce((map, history) => {
      const id = history.vegetableId;
      map[id] = true;
      return map;
    }, {});
  const suggestions = allVegetables
    .filter((vegetable) => {
      return recentlyPikcedId[vegetable.id] !== true;
    })
    .slice(0, 3);
  return suggestions;
};

export const storeGuestPickedVegetable = (vegetableId) => {
  userPickHistory.push({ vegetableId, createdAt: new Date().toDateString() });
  console.log(userPickHistory);
  window.localStorage.setItem(
    "userPickHistory",
    JSON.stringify(userPickHistory)
  );
};

export const getUserPickHisotry = async () => {
  if (allVegetables.length === 0) {
    try {
      const response = await axios.get(`/api/vegetables`);
      const { data } = response;
      allVegetables = data.vegetables;
    } catch (error) {
      return error;
    }
  }
  return userPickHistory.map((hisotry, index) => {
    return {
      ...hisotry,
      vegetable: allVegetables.find((vegetable) => {
        return vegetable.id === hisotry.vegetableId;
      }),
      id: index,
    };
  });
};
