import Header from "../../components/Header";

const layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default layout;
