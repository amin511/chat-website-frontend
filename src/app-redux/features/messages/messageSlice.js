import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addUsertoLocalStorage, getUserFromLocalStorage } from "../../../utils/localStorage"
import costumFetch from "../../../utils/axios"

const initialState = {
    isLoadingMessages: false,
    isLoadingmesseageCreated: false,
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
                state.isLoadingmesseageCreated = true;
            })
            .addCase(createMessage.fulfilled, (state, { payload }) => {
                state.isLoadingmesseageCreated = false
            })
            .addCase(createMessage.rejected, (state, { payload }) => {
                state.isLoadingmesseageCreated = false
            })

            .addCase(getMessages.pending, (state) => {
                state.isLoadingMessages = true;
            })
            .addCase(getMessages.fulfilled, (state, { payload }) => {
                state.isLoadingMessages = false
                state.messages = payload
            })
    }
})


export { createMessage, getMessages };
export const { addMessage } = messageSlice.actions
export default messageSlice.reducer;