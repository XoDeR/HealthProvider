import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notifications-as-seen",
        {
          userId: user._id,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong.");
    }
  };

  const items = [
    {
      key: "1",
      label: "Unseen",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllAsSeen()}>
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotifications.map((notification) => (
            <div
              className="card p-2"
              onClick={() => navigate(notification.onClickPath)}
            >
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
