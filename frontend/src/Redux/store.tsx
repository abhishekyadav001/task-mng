import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Tasks/reducer";
import { authReducer } from "./Auth/reducer";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
