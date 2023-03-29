import React from 'react'
import { createContext, useReducer, useContext } from "react";
import { proposalReducer } from './Reducer';

const Proposal = createContext();

const Context = ({ children }) => {
    const values = { 
        toAdd: "", 
        amount: "", 
        discussion: ""
    }

    const [state, dispatch] = useReducer(proposalReducer, {
        values: values
    })
  
  return (
    <Proposal.Provider value={{state, dispatch}}>
      {children}
    </Proposal.Provider>
  )
}

export default Context;

export const ProposalState = () => {
    return useContext(Proposal);
}
