import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addUsertoLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../../utiils/localStorage"
import costumFetch from "../../../utiils/axios"
import { createSelector } from "@reduxjs/toolkit"
const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    errorMsg: ""
}

const register = createAsyncThunk('user/register',
    async (user, thunkApi) => {
        try {
            const { data } = await costumFetch.post('/auth/register', user);
            return data.user
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data.msg);
        }
    }

)
const login = createAsyncThunk('user/login',
    async (user, thunkApi) => {
        try {
            const { data } = await costumFetch.post('/auth/login', user);
            return data.user
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data.msg);
        }
    }

)


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
            removeUserFromLocalStorage();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                addUsertoLocalStorage(payload);
                state.user = payload
                state.isLoading = false
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.isLoading = false
                state.errorMsg = payload
                console.log(payload)
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(login.fulfilled, (state, { payload }) => {
                addUsertoLocalStorage(payload);
                state.user = payload
                state.isLoading = false
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false
                state.errorMsg = payload
                console.log(payload)
            })

    }
})
const messagesSelector = state => state.message.messages;
const messageCountSelector = createSelector(
    messagesSelector, // First argument: Pass the input selectors
    (messages) => {   // Second argument: Pass a function that computes the derived data
        return messages.length; // For example, here we are calculating the number of messages.
    }
);

export {
    messagesSelector,
    messageCountSelector
}

export { register, login };
export const { logOut } = userSlice.actions
export default userSlice.reducer