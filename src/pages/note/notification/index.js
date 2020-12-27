import Layout from "../../../layout";
import { path } from "../../../route";
const NotificationPage = () => {
  return (
    <Layout selectedKey={path.notificationNote} defaultOpenKey="note">
      <div>Notification</div>
    </Layout>
  );
};
export default NotificationPage;
