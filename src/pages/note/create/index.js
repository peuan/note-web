import { Divider } from "antd";
import Layout from "../../../layout";
import { path } from "../../../route";
import ViewCreateNote from "../../../views/note/create";

const createNotePage = () => {
  return (
    <Layout selectedKey={path.createNote} defaultOpenKey="note">
      <Divider orientation="left">
        <h1 style={{ fontSize: 30 }}>สร้าง Note</h1>
      </Divider>
      <ViewCreateNote />
    </Layout>
  );
};

export default createNotePage;
