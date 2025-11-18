import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {LandingPage} from "../pages/LandingPage/LandingPage.tsx";
import {CategoryPage} from "@/pages/CategoryPage/CategoryPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <LandingPage/>
            }
        ],
    },
    {
        path: "category/:category",
        element: <App/>,
        children: [
            {
                index: true,
                element: <CategoryPage/>
            }
        ],

    }
]);