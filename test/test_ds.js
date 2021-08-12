import React from "react";
import { shallow, mount } from "enzyme";
import Routes, { Home, News, NoMatch } from "./Routes";
import { MemoryRouter } from "react-router";
import { Route } from "react-router-dom";

// app.test.js
it("navigates home when you click the logo", async => {
    // in a real test a renderer like "@testing-library/react"
    // would take care of setting up the DOM elements
    const root = document.createElement('div');
    document.body.appendChild(root);
  
    // Render app
    render(
      <MemoryRouter initialEntries={['/my/initial/route']}>
        <App />
      </MemoryRouter>,
      root
    );
  
    // Interact with page
    act(() => {
      // Find the link (perhaps using the text content)
      const goHomeLink = document.querySelector('#nav-logo-home');
      // Click it
      goHomeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  
    // Check correct page content showed up
    expect(document.body.textContent).toBe('Home');
  });
