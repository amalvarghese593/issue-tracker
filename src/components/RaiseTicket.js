import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useFormContext } from "../data-store/form-context";
import Select from "./forms-controls/forms/Select";
import TextArea from "./forms-controls/forms/TextArea";
import "./index.css";
import RadioBtnGroup from "./forms-controls/headless-ui/RadioBtnGroup";
import { FileUpload } from "./FileUpload";
import axios from "axios";
import Input from "./forms-controls/forms/Input";
import { useNavigate, useLocation } from "react-router-dom";
import { useSso } from "../sso/sso/SsoProvider";

export const RaiseTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSso();
  const getPersist = (key) => location.state?.data?.[key] || "";
  const initialValues = {
    appName: getPersist("appName"),
    title: getPersist("title"),
    priority: getPersist("priority") || "High",
    typeOfTicket: getPersist("typeOfTicket"),
    description: getPersist("description"),
    image: getPersist("image"),
  };
  const validationSchema = Yup.object().shape({
    appName: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    priority: Yup.string().required("Required"),
    typeOfTicket: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    image: Yup.mixed(),
  });
  const onSubmit = (values) => {
    const fetch = async () => {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        let url = `${process.env.REACT_APP_API_URL}/api/v1/auth/issueTracker`;

        const res = await axios({
          method: "POST",
          url: url,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/", { replace: true });
      } catch (err) {
        console.log({ err });
      }
    };
    fetch();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const appNameOptions = ["My-ATS", "i-Verified"];
  const priorityOptions = [
    { id: 1, priority: "High", color: "red" },
    { id: 2, priority: "Medium", color: "orange" },
    { id: 3, priority: "Low", color: "#cfcf10" },
  ];
  const ticketOptions = [
    "I want to report a bug",
    "What is WebPipl Customer Care Number?",
    "I want to provide feedback",
    "I want to request a new feature",
    "I want to consult Marketing team",
    "I want to consult HR team",
  ];
  const cancelTicket = (e) => {
    navigate("/", true);
  };
  return (
    <div className="form-container">
      <form className="form-tracker shadow">
        <h2 className="mb-5 fs-30">Raise your ticket</h2>
        <label htmlFor="appname" className="mb-3">
          Application Name
        </label>
        <div id="appname" className="row mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <Select
              options={appNameOptions}
              label="Select application"
              name="appName"
              value={formik.values.appName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.appName && formik.errors.appName}
              // touched={formik.touched.appName}
            />
          </div>
        </div>
        <label htmlFor="title" className="mb-3">
          Title
        </label>
        <div id="title" className="row mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <Input
              label="Enter title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && formik.errors.title}
            />
          </div>
        </div>
        <label htmlFor="priority" className="mb-3">
          Priority
        </label>
        <div id="priority" className="row mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <RadioBtnGroup
              options={priorityOptions}
              getValue={(o) => o.priority}
              getColor={(o) => o.color}
              name="priority"
              value={formik.values.priority}
              onChange={(e) => formik.setFieldValue("priority", e, true)}
              onBlur={formik.handleBlur}
              error={formik.errors.priority}
              touched={formik.touched.priority}
            />
          </div>
        </div>
        <label htmlFor="typeOfTicket" className="mb-3">
          Type of ticket
        </label>
        <div id="typeOfTicket" className="row mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <Select
              options={ticketOptions}
              label="Select ticket type"
              name="typeOfTicket"
              value={formik.values.typeOfTicket}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.typeOfTicket && formik.errors.typeOfTicket}
            />
          </div>
        </div>
        <label htmlFor="description-container" className="mb-3">
          Description
        </label>
        <div id="description-container" className="row mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <TextArea
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.description}
              touched={formik.touched.description}
            />
          </div>
        </div>
        <label htmlFor="">Upload issue snapshot</label>
        <FileUpload
          name="image"
          // value={formik.values.image}
          onChange={(e) => formik.setFieldValue("image", e, false)}
          setFieldValue={formik.setFieldValue}
        />
        <div className="submit-btn-container">
          <button className="btn me-3" onClick={cancelTicket}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            /* type="submit" */ onClick={formik.handleSubmit}>
            Submit ticket
          </button>
        </div>
      </form>
    </div>
  );
};
