import { FC } from "react";

const UserProfileSection: FC = () => {
  return (
    <div>
      <div>
        <h2>Profile</h2>
        <p>
          Username: <span>username</span>
        </p>
        <p>
          Email: <span>email</span>
        </p>
        <div>Change profile picture</div>
      </div>
    </div>
  );
};

export default UserProfileSection;
