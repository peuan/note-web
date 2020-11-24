import { useContext } from "react";
import { AuthContext } from "../../contexts";
import Layout from "../../layout";
const Home = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  return (
    <Layout>
      <button
        onClick={() => {
          authContext.loginContext();
          console.log(authContext);
        }}
      >
        login
      </button>
      <h1>หน้าโฮม</h1>
    </Layout>
  );
};
export default Home;
