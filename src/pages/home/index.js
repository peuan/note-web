import Layout from "../../layout";
import { path } from "../../route";
import ViewHome from "../../views/home";

const Home = () => {
  return (
    <Layout selectedKey={path.home}>
      <ViewHome />
    </Layout>
  );
};
export default Home;
