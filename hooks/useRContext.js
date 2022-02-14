import React, { createContext, useState, useEffect, useReducer, useContext, useMemo } from 'react';

// import resource files
import { AppReducer } from "./useRReducer";
import jsonRContext from '../assets/jsons/ResistanceContext.json';

// Method One
const RContext = createContext();

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const RContextProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, jsonRContext);

  const contextValue = useMemo(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("state"))) {
  //     dispatch({
  //       type: "init_stored",
  //       value: JSON.parse(localStorage.getItem("state")),
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (state !== jsonRContext) {
  //     localStorage.setItem("context", JSON.stringify(state, getCircularReplacer()));
  //   }
  // }, [state]);

  return (
    <RContext.Provider value={contextValue}>
      {props.children}
    </RContext.Provider>
  );
}

// Method Two
// const RContext = createContext([
// 	jsonRContext,
// 	() => { }
// ]);

// export const RContextProvider = (props) => {
// 	const [value, setValue] = useState(jsonRContext);
// 	return (
// 		<RContext.Provider value={[value, setValue]}>
// 			{props.children}
// 		</RContext.Provider>
// 	);
// }

export function useRContext() {
  return useContext(RContext);
}