
const addMsgReducer = (state = [], action) =>
{
    switch (action.type)
    {
        case "ADD_MSG":
            return [...state, action.payload];

        case "UPDATE_MSG":
            return [...state, action.payload];

        case "DELETE_MSG":
            return [...state, action.payload];

        default:
            return state;
    }
}

export default addMsgReducer;