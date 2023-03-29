export const proposalReducer = ( state, action ) => {
    switch (action.type) {

        case "Add_Proposal" : 
        return {state, ...action.payload };
        
        default: 
        return state;
    }
}