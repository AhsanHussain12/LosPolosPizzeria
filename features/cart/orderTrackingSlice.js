import { createSlice } from "@reduxjs/toolkit";


export const orderTrackingSlices = createSlice({
    name : 'orderTracker',
    initialState:{
        status: 'null',
    },
    reducers:{
        setPendingStatus: (state) => {
            state.status = "pending";
            console.log('Order status updated to:', state.status);
        },
        setCompleteStatus: (state) => {
            state.status = "complete";
        },
        resetOrderStatus: (state) => {
            state.status = 'null';
        }
    }
})

export const { setCompleteStatus ,setPendingStatus, resetOrderStatus } = orderTrackingSlices.actions;

export default orderTrackingSlices.reducer;