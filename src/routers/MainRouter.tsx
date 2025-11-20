import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {LandingPage} from "../pages/LandingPage/LandingPage.tsx";
import {CategoryPage} from "@/pages/CategoryPage/CategoryPage.tsx";
import {RecipePage} from "@/pages/RecipePage/RecipePage.tsx";
import {Header} from "@/components/Header.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header/>
                <App/>
            </>
        ),
        children: [
            {
                index: true,
                element: <LandingPage/>

            },
            {
                path: "category/:category",
                index: true,
                element: <CategoryPage/>
            },
            {
                path: "recipe/:recipeId",
                index: true,
                element: <RecipePage/>
            }
        ],
    },

]);