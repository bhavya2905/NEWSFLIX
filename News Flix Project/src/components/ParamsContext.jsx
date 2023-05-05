import { createContext, useContext, useState } from 'react';

const ParamsContext = createContext();

export function ParamsProvider({ children }) {
  const [params, setParams] = useState({});

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
}

export function useParamsValue() {
  return useContext(ParamsContext);
}
