import React, { createContext, useReducer } from 'react'
import { reducer } from '../reducer/reducer';

export const InfoContext = createContext();

export default function InfoContextProvider({children}) {
    const [ state, dispatch ] = useReducer(reducer, 
        {login: false, user: '', email: '', error: ''}
    );

    return (
        <InfoContext.Provider value={{state, dispatch}}>
            {children}
        </InfoContext.Provider>
    )
}
