import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "../context";
import App from "../App";

test("renders App", () => {
  render(
    <Provider>
      <App />
    </Provider>
  );
  expect(screen.getByTestId("app")).toBeInTheDocument();
});

test("renders SettingModal", () => {
  render(
    <Provider>
      <App />
    </Provider>
  );
  expect(screen.queryByTestId("setting-modal")).toBeNull();
  fireEvent.click(screen.getByTestId("open-modal"));
  expect(screen.queryByTestId("setting-modal")).toBeInTheDocument();
});
