import { FOLD, UNFOLD } from "../actions/foldSider";

export interface foldState {
    isFolded: boolean;
}

const initialState: foldState = {
    isFolded: true,
};

const FoldReducer = (state = initialState, action: any): foldState => {
    switch (action.type) {
        case FOLD:
            return {
                isFolded: true
            };
        case UNFOLD:
            return {
                isFolded: false
            };
        default:
            return state;
    }
}

export default FoldReducer;