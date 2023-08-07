import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice"
import messageSlice from "./features/messages/messageSlice";
import usersReducer from "./features/users/usersslice";

export default configureStore({
    reducer: {
        user: userReducer,
        message: messageSlice,
        users: usersReducer
    }
})

