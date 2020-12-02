import Layout from "../../layout";
import { path } from "../../route";

const Home = () => {
  return (
    <Layout selectedKey={path.home}>
      <h1>หน้าโฮม</h1>
    </Layout>
  );
};
export default Home;
