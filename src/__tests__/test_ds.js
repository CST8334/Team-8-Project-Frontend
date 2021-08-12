import React from "react";
import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Login from "layouts/Login.jsx";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("register link is right", () => {
  ReactDOM.render(
    <MemoryRouter initialEntries={["/"]}>
      <Login />
    </MemoryRouter>,
    container
  );

  const button = container.querySelector("div > div > a");

  expect(button.getAttribute("href")).toBe("/register");
});

it("Admin dashboard title is right", () => {
  ReactDOM.render(
    <MemoryRouter initialEntries={["/admin/dashboard"]}>
      <AdminLayout />
    </MemoryRouter>,
    container
  );

  const logo = container.querySelector(
    "div.wrapper > div.sidebar > div.sidebar-wrapper > div.logo.d-flex.align-items-center.justify-content-start > a:nth-child(2)"
  );

  expect(logo.textContent).toBe("DreamWell Co");
});

it("Builder link is right", () => {
  ReactDOM.render(
    <MemoryRouter initialEntries={["/admin/dashboard"]}>
      <AdminLayout />
    </MemoryRouter>,
    container
  );

  const button = container.querySelector(
    "div.wrapper > div.sidebar > div.sidebar-wrapper > div.nav > li:nth-child(8) > a"
  );
  expect(button.getAttribute("href")).toBe("/admin/builder");
});

it("Builder link is right", () => {
  ReactDOM.render(
    <MemoryRouter initialEntries={["/admin/dashboard"]}>
      <AdminLayout />
    </MemoryRouter>,
    container
  );

  const button = container.querySelector(
    "div.wrapper > div.sidebar > div.sidebar-wrapper > div.nav > li:nth-child(8) > a"
  );
  expect(button.getAttribute("href")).toBe("/admin/builder");
});

it("Market link is right", () => {
  ReactDOM.render(
    <MemoryRouter initialEntries={["/admin/dashboard"]}>
      <AdminLayout />
    </MemoryRouter>,
    container
  );

  const button = container.querySelector(
    "div.wrapper > div.sidebar > div.sidebar-wrapper > div.nav > li:nth-child(9) > a"
  );
  expect(button.getAttribute("href")).toBe("/admin/market");
});
