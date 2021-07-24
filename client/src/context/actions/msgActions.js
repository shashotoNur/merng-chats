const addMsg = (payload) =>
    {
        return {
            type: "ADD_MSG",
            payload: payload
        }
    }

const updateMsg = (payload) =>
    {
        return {
            type: "ADD_MSG",
            payload: payload
        }
    }

const deleteMsg = (payload) =>
    {
        return {
            type: "ADD_MSG",
            payload: payload
        }
    }

const msgActions = { addMsg, updateMsg, deleteMsg };
export default msgActions;