import { OPEN, CLOSE } from '../actions/socket';

export interface socketState {
    isOpen: boolean;
}

const initialState: socketState = {
    isOpen: false,
};

const SocketReducer = (state = initialState, action: any): socketState => {
    switch (action.type) {
        case OPEN:
            return {
                isOpen: true
            };
        case CLOSE:
            return {
                isOpen: false
            };
        default:
            return state;
    }
}

export default SocketReducer;