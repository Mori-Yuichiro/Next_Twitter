import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/app/types/user";

type CurrentUserType = UserType | undefined;

interface State {
    openModal: boolean;
    openDeleteModal: boolean;
    reload: boolean;
    openCommentModal: boolean;
    currentUser: CurrentUserType;
}

const initialState: State = {
    openModal: false,
    openDeleteModal: false,
    reload: false,
    openCommentModal: false,
    currentUser: undefined
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
        },
        toggleCommentModal(state, action: PayloadAction<boolean>) {
            state.openCommentModal = action.payload;
        },
        changeCurrentUser(
            state,
            action: PayloadAction<UserType | undefined>
        ) {
            state.currentUser = action.payload;
        }
    }
});

export const { toggleModal, toggleDeleteModal, toggleReload, toggleCommentModal, changeCurrentUser } = slice.actions;
export default slice.reducer;