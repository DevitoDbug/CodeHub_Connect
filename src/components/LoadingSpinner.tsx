import { FC } from "react";
import { ClipLoader } from "react-spinners";

export const LoadingSpinner: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="sweet-loading">
        <ClipLoader size={150} color={"#123abc"} loading={true} />
      </div>
    </div>
  );
};
