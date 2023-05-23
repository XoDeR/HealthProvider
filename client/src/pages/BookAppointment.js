import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import dayjs from "dayjs";
import { Row, Col, Button, TimePicker, DatePicker } from "antd";

function BookAppointment() {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [selectedTimings, setSelectedTimings] = useState();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
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
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings: </b>
                {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <div className="d-flex flex-column pt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) =>
                    setDate(dayjs(value).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker.RangePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(values) =>
                    setSelectedTimings([
                      dayjs(values[0]).format("HH-mm"),
                      dayjs(values[0]).format("HH-mm"),
                    ])
                  }
                />
                <Button className="primary-button mt-3 full-width-button">
                  Check availability
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
