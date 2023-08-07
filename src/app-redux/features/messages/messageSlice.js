import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addUsertoLocalStorage, getUserFromLocalStorage } from "../../../utiils/localStorage"
import costumFetch from "../../../utiils/axios"

const initialState = {
    isLoading: false,
    messages: []
}

const createMessage = createAsyncThunk('message/createMessage',
    async (dataSend, thunkApi) => {

        try {
            const { data } = await costumFetch.post('/messages', dataSend);
            return data.message
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data.msg);
        }
    }
)

const getMessages = createAsyncThunk('message/getMessages',
    async (dataSend, thunkApi) => {
        try {
            console.log("dsa", dataSend)
            const { data } = await costumFetch.post('/messages/get', dataSend);
            console.log("messages", data)
            return data.messages
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data.msg);
        }
    }
)

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, { payload }) => {
            state.messages = [...state.messages, payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMessage.fulfilled, (state, { payload }) => {
                state.isLoading = false
            })
            .addCase(createMessage.rejected, (state, { payload }) => {
                state.isLoading = false
            })

            .addCase(getMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.messages = payload
            })
    }
})


export { createMessage, getMessages };
export const { addMessage } = messageSlice.actions
export default messageSlice.reducer;