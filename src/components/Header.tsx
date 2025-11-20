import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <h1 className="flex justify-center items-center font-bold text-xl hover:text-blue-600 transition-colors">
            <Link to={"/"}>
                HEM
            </Link>
        </h1>
    );
};