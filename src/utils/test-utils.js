import { configureStore } from "@reduxjs/toolkit";
import { getRandomColor } from "../Colors";
import gameboardReducer from "../gameboardReducer";
import { render as rtlRender, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import faker from "faker";
import React from "react";

const fakeStore = {
  gameboard: [
    {
      id: faker.datatype.uuid(),
      style: getRandomColor(),
      visited: false,
    },
  ],
  points: 0,
};

function render(
  ui,
  {
    initialState,
    store = configureStore({
      reducer: gameboardReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}

export * from "@testing-library/react";
export { render, fakeStore };