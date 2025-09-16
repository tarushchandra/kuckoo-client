import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
  postModal: React.ReactNode;
}

export default function HomeLayout(props: HomeLayoutProps) {
  const { children, postModal } = props;

  return (
    <>
      {children}
      {postModal}
    </>
  );
}
