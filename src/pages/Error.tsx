import { FC } from "react";
import { Link } from "react-router-dom";

export const Error: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-3xl">
      <span>{"Page not found :("}</span>
      <Link to="/" className="ml-1  text-lg font-bold text-C_DarkBlue">
        Go to home
      </Link>
    </div>
  );
};
