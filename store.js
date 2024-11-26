import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartReducer from "./features/cart/cartSlice"
import orderTrackingReducer from "./features/cart/orderTrackingSlice"

// Persist configuration for `orderTracker`
const orderTrackerPersistConfig = {
    key: "orderTracker", // Key used to save to storage
    storage: AsyncStorage, // Storage medium
};

// Wrap `orderTrackingReducer` with persistReducer
const persistedOrderTrackerReducer = persistReducer(
    orderTrackerPersistConfig,
    orderTrackingReducer
);  



// Create the Redux store with the defined slices
export const store = configureStore({
    reducer: {
        cart: cartReducer,  // This defines the `cart` slice in the Redux state
        orderTracker: persistedOrderTrackerReducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Disable checks for AsyncStorage serialization
    }),
})


export const persistor = persistStore(store);