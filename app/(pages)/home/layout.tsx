import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
  tweetModal: React.ReactNode;
}

export default function HomeLayout(props: HomeLayoutProps) {
  const { children, tweetModal } = props;
  // console.log(props);

  return (
    <>
      {children}
      {tweetModal}
    </>
  );
}
