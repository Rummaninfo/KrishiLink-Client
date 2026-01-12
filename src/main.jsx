import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange >
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
      </ThemeProvider>
   
  </StrictMode>
);
