import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import RecipePage from "./pages/RecipePage.tsx";
import NewRecipePage from "./pages/NewRecipePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="recept/:id" element={<RecipePage />} />
          <Route path="nytt" element={<NewRecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
