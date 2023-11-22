import React from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

const Layout = props => {
  return (
    <>
      <Header />
      {props?.children}
      <Footer />
    </>
  );
};

export default Layout;
