import React, { Dispatch, DispatchWithoutAction, useReducer } from 'react'

interface MapState {
  id?: number
  title?: string,
}

// Initial Values
const initialState: MapState = {}

type MapContext = {
  state: MapState,
  dispatch: React.Dispatch<MapStateActions>
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export enum Types {
  Set = 'SET_ACTIVE_MARKER'
}

type MapPayload = {
  [Types.Set]: MapState;
}


export type MapStateActions = ActionMap<MapPayload>[keyof ActionMap<MapPayload>];


// create Store
export const Store = React.createContext<MapContext>({
  state: initialState,
  dispatch: () => null
});



const reducer = (state: MapState, action: MapStateActions) => {
  switch (action.type) {
    case Types.Set:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const MapContext: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export default MapContext
