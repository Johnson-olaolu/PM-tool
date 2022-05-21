import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import user from "./userStore"
import thunk from "redux-thunk";


const reducers = combineReducers({
	user
})

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>

export default store;
