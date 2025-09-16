import React from "react";

interface ProfileLayoutProps {
  children: React.ReactNode;
  postModal: React.ReactNode;
}

export default function ProfileLayout(props: ProfileLayoutProps) {
  const { children, postModal } = props;

  return (
    <>
      {children}
      {postModal}
    </>
  );
}
