import Layout from "../../../layout";
import { path } from "../../../route";

const createNotePage = (selectedKey) => {
  return <Layout selectedKey={path.createNote}>หน้า CreateNotePage</Layout>;
};

export default createNotePage;
