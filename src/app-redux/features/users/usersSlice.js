import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit"
import costumFetch from "../../../utiils/axios";


const initialState = {
    isLoading: false,
    users: [],
    errorMsg: "",
    userSearch: []
}


const getAllUsers = createAsyncThunk('users/getAllusers', async (thunkApi) => {
    try {
        console.log("fetch all users")
        const { data } = await costumFetch.get('/users');
        return data
    }
    catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
})


const getUserById = createAsyncThunk('users/getUserById', async (userIdRoom, thunkApi) => {
    try {
        const { data } = await costumFetch.get(`/users/${userIdRoom}`);
        return data.user
    }
    catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
})


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.
            addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                console.log("payload", payload)
                state.users = payload
                state.isLoading = false
            })
            .addCase(getAllUsers.rejected, (state, { payload }) => {
                state.isLoading = false
                state.errorMsg = payload
                console.log(payload)
            })

            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, { payload }) => {
                addUsertoLocalStorage(payload);
                state.userSearch = payload
                state.isLoading = false
            })
            .addCase(getUserById.rejected, (state, { payload }) => {
                state.isLoading = false
                state.errorMsg = payload
                console.log(payload)
            })

    }

}
)

export default usersSlice.reducer

export const selectAllUsers = (store) => {
    return store.users.users
}
export { getAllUsers }  // function for dispatching 