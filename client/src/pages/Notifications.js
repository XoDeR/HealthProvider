import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";

function Notifications() {
  const { user } = useSelector((state) => state.user);

  const items = [
    {
      key: "1",
      label: "Unseen",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h1 className="anchor">Mark all as seen</h1>
          </div>
          {user?.unseenNotifications.map((notification) => (
            <div className="card p-2">
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </>
      ),
    },
    {
      key: "2",
      label: "Seen",
      children: (
        <div className="d-flex justify-content-end">
          <h1 className="anchor">Delete all</h1>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </Layout>
  );
}

export default Notifications;
