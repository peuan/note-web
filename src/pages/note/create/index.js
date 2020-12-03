import Layout from "../../../layout";
import { path } from "../../../route";

const createNotePage = () => {
  return (
    <Layout selectedKey={path.createNote} defaultOpenKey="note">
      หน้า CreateNotePage
    </Layout>
  );
};

export default createNotePage;
