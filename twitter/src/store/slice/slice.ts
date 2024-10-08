import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface State {
    openModal: boolean;
    openDeleteModal: boolean;
}

const initialState: State = {
    openModal: false,
    openDeleteModal: false
};

const slice = createSlice({
    name: "state",
    initialState,
    reducers: {
        toggleModal(state, action: PayloadAction<boolean>) {
            state.openModal = action.payload;
        },
        toggleDeleteModal(state, action: PayloadAction<boolean>) {
            state.openDeleteModal = action.payload;
        },
    }
});

export const { toggleModal, toggleDeleteModal } = slice.actions;
export default slice.reducer;