import Header from "../../components/VSHeader";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
