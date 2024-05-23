import React from "react";

interface ProfileLayoutProps {
  children: React.ReactNode;
  tweetModal: React.ReactNode;
}

export default function ProfileLayout(props: ProfileLayoutProps) {
  const { children, tweetModal } = props;
  console.log(props);

  return (
    <>
      {children}
      {tweetModal}
    </>
  );
}
