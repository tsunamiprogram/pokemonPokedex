import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice = createSlice({
  name: "trainerNAme",
  initialState: "",
  reducers: {
    setTrainerName: (state, action) => {
      const newTrainerName = action.payload;
      return newTrainerName;
    },
  },
});

export const { setTrainerName } = trainerNameSlice.actions;

export default trainerNameSlice.reducer;
