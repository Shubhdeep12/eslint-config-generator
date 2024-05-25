"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { DataProps } from "../types";

type DataContainerValue = {
  data: DataProps;
  setData: Dispatch<SetStateAction<DataProps>>;
};

const defaultContextValue = {
  data: {
    format: "esm",
  },
  setData: () => {},
};

const DataContext = createContext<DataContainerValue>(defaultContextValue);

export const DataProvider = (props: PropsWithChildren) => {
  const [data, setData] = useState<DataProps>(defaultContextValue.data);
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export function useData(): DataContainerValue {
  return useContext(DataContext);
}
