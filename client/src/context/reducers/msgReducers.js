
const msgReducer = (state = [], action) =>
{
    switch (action.type)
    {
        case "ADD_MSG":
            return [...state, action.payload];

        case "UPDATE_MSG":
            {
                let updatedMsgState = state.msgs.filter(
                    msg =>
                    {
                        if(msg.id === action.id) msg.txt = action.txt;
                        return msg;
                    }
                );
                return { msgs: updatedMsgState};
            }

        case "DELETE_MSG":
            {
                let remainingMsgs = state.msgs.filter(
                    msg => { return msg.id !== action.id }
                );
                return { msgs: remainingMsgs};
            }

        default:
            return state;
    }
}

export default msgReducer;