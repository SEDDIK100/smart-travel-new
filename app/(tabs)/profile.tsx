import Error from "@/components/Error";
import { RootState } from "@/redux/stores";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userInform = useSelector((state: RootState) => state.user.user);

  if (!userInform) {
    return (
      <Error
        title="sorry"
        desc="don t me new recommendations"
        sub="signin for better experience"
      />
    );
  }
};

export default Profile;
