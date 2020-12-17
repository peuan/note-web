import Layout from "../../../layout";
import { path } from "../../../route";
const UpdateNotePage = () => {
  return (
    <Layout selectedKey={path.updateNote} defaultOpenKey="note">
      <div>UpdateNote</div>
    </Layout>
  );
};
export default UpdateNotePage;
