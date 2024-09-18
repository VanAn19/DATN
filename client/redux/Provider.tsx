"use client";

import React from "react";
import { store } from './store';
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    // <Provider store={store}>
    //   <PersistGate loading={<Spin />} persistor={persistor}>
    //     {children}
    //   </PersistGate>
    // </Provider>
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
  
}