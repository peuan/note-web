import Layout from "../../../layout";
import { path } from "../../../route";
import ViewCreateNote from "../../../views/note/create";

const createNotePage = () => {
  return (
    <Layout selectedKey={path.createNote} defaultOpenKey="note">
      <ViewCreateNote />
    </Layout>
  );
};

export default createNotePage;
