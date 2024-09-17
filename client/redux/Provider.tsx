"use client";

import React from "react";
import { store, persistor } from './store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window === 'undefined') {
    return <>{children}</>; // Tránh xử lý Redux Persist khi SSR
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}