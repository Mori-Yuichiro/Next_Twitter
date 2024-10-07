import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface State {
    openModal: boolean;
}

const initialState: State = {
    openModal: false
};

const slice = createSlice({
    name: "state",
    initialState,
    reducers: {
        toggleModal(state, action: PayloadAction<boolean>) {
            state.openModal = action.payload;
        }
    }
});

export const { toggleModal } = slice.actions;
export default slice.reducer;