import Layout from "../../layout";
import { path } from "../../route";

const NotePage = () => {
  return <Layout selectedKey={path.note} defaultOpenKey="note">หน้า Notepage</Layout>;
};

export default NotePage;
