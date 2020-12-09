import Layout from "../../layout";
import { path } from "../../route";
import ViewNote from "../../views/note";

const NotePage = () => {
  return (
    <Layout selectedKey={path.note} defaultOpenKey="note">
      <ViewNote />
    </Layout>
  );
};

export default NotePage;
