import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DoctorForm from "../../components/DoctorForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-user-id",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (user) {
      getDoctorData();
    }
  }, [user]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Doctor profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Layout>
  );
}

export default Profile;
