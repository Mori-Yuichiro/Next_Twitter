import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface State {
    openModal: boolean;
    openDeleteModal: boolean;
    reload: boolean;
}

const initialState: State = {
    openModal: false,
    openDeleteModal: false,
    reload: false
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
        toggleReload(state, action: PayloadAction<boolean>) {
            state.reload = action.payload;
        }
    }
});

export const { toggleModal, toggleDeleteModal, toggleReload } = slice.actions;
export default slice.reducer;