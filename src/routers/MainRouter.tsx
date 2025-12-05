import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {LandingPage} from "../pages/LandingPage/LandingPage.tsx";
import {CategoryPage} from "@/pages/CategoryPage/CategoryPage.tsx";
import {RecipePage} from "@/pages/RecipePage/RecipePage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <LandingPage/>
            },
            {
                path: "/:category",
                element: <CategoryPage/>
            },
            {
                path: "/:category/:recipeId",
                element: <RecipePage/>
            }
        ],
    },

]);