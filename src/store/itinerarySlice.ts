import { reducer } from "@/hooks/use-toast";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


interface ItineraryState {
    data: any | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }
  
  const initialState: ItineraryState = {
    data: null,
    status: "idle",
    error: null,
  };

// async thunk to fetch itinerary
export const fetchItinerary = createAsyncThunk(
  "itinerary/fetchItinerary",
  async (
    { fromLocation, toLocation, travelDate, returnDate }: 
    { fromLocation: string; toLocation: string; travelDate: string; returnDate: string }
  ) => {
    const res = await fetch("http://localhost:3000/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        travelingFrom: fromLocation,
        travelingTo: toLocation,
        travelDate,
        returnDate,
      }),
    });

    console.log(res," <=35is");
    if (!res.ok) {
        throw new Error("Failed to fetch itinerary");
      }
  
      // ✅ return parsed JSON once
      const data = await res.json();
      return data;
  }
);

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchItinerary.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchItinerary.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchItinerary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default itinerarySlice.reducer;
