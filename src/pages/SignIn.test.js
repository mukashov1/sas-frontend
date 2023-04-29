// import React from "react";
// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
//   act,
// } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import SignIn from "./SignIn";
// import { UserContext } from "../routing/index.jsx";

// // Mock the UserContext
// const mockContext = {
//   store: {
//     login: jest.fn(),
//     user: {
//       role: "",
//     },
//   },
// };

// describe("SignIn component", () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });

//   test("renders without crashing", () => {
//     render(
//       <UserContext.Provider value={mockContext}>
//         <MemoryRouter>
//           <SignIn />
//         </MemoryRouter>
//       </UserContext.Provider>
//     );
//   });

//   test("handleLogin called when Log In button is clicked", async () => {
//     render(
//       <UserContext.Provider value={mockContext}>
//         <MemoryRouter>
//           <SignIn />
//         </MemoryRouter>
//       </UserContext.Provider>
//     );

//     const userIdInput = screen.getByPlaceholderText("ID");
//     const passwordInput = screen.getByPlaceholderText("PASSWORD");
//     const loginButton = screen.getByText("Log In");

//     fireEvent.change(userIdInput, { target: { value: "testUserId" } });
//     fireEvent.change(passwordInput, { target: { value: "testPassword" } });
//     fireEvent.click(loginButton);

//     await waitFor(() => expect(mockContext.store.login).toHaveBeenCalled());
//   });

//   test("handleForgotPassword opens Forgot Password modal", () => {
//     render(
//       <UserContext.Provider value={mockContext}>
//         <MemoryRouter>
//           <SignIn />
//         </MemoryRouter>
//       </UserContext.Provider>
//     );

//     const forgotPasswordLink = screen.getByText("Forgot password?");
//     fireEvent.click(forgotPasswordLink);

//     expect(screen.getByText("Cancel")).toBeInTheDocument();
//   });

//   test("handleForgetPasswordCancel closes Forgot Password modal", () => {
//     render(
//       <UserContext.Provider value={mockContext}>
//         <MemoryRouter>
//           <SignIn />
//         </MemoryRouter>
//       </UserContext.Provider>
//     );

//     const forgotPasswordLink = screen.getByText("Forgot password?");
//     fireEvent.click(forgotPasswordLink);

//     const cancelButton = screen.getByText("Cancel");
//     fireEvent.click(cancelButton);

//     expect(cancelButton).not.toBeInTheDocument();
//   });

//   test("displays error when login fails", async () => {
//     mockContext.store.login.mockImplementation(() =>
//       Promise.resolve({ status: 401 })
//     );
  
//     render(
//       <UserContext.Provider value={mockContext}>
//         <MemoryRouter>
//           <SignIn />
//         </MemoryRouter>
//       </UserContext.Provider>
//     );
  
//     const userIdInput = screen.getByPlaceholderText("ID");
//     const passwordInput = screen.getByPlaceholderText("PASSWORD");
//     const loginButton = screen.getByText("Log In");
  
//     fireEvent.change(userIdInput, { target: { value: "testUserId" } });
//     fireEvent.change(passwordInput, { target: { value: "testPassword" } });
//     fireEvent.click(loginButton);
  
//     await waitFor(() =>
//       expect(screen.getByText("Invalid id or password!")).toBeInTheDocument()
//     );
//   });
  

//   // Add more tests as needed
// });
