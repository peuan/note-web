import { useState } from "react";
import Layout from "../../../layout";
import { path } from "../../../route";
const NotificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState();
  const getNotesById = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout selectedKey={path.notificationNote} defaultOpenKey="note"></Layout>
  );
};
export default NotificationPage;
