/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Apr 16 2022 22:33:24 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Router from "next/router";
// swr & fetcher
import { useSession, signIn, getSession } from "next-auth/react";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import Layout from "../components/modules/Layout";
import { User } from "../types/user";
import Input from "../components/formik-controls/Input";
import Select from "../components/formik-controls/Select";
import { branches, semesters } from "../config/academicData";
import SubmitButton from "../components/formik-controls/SubmitButton";
import axios from "axios";
import { BioData, Student } from "../types/student";
import DatePicker from "../components/formik-controls/DatePicker";
// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Divider from "../components/elements/Divider";
import { NextPageContext } from "next";
import { GoTelescope } from "react-icons/go";

const genderOptions = [
  {
    label: "-- Select Gender --",
    value: "",
  },
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];

const casteOptions = [
  {
    label: "-- Select Caste --",
    value: "",
  },
  {
    label: "OBC",
    value: "obc",
  },
  {
    label: "General",
    value: "gen",
  },
  {
    label: "SC",
    value: "st",
  },
  {
    label: "ST",
    value: "sc",
  },
];

interface Props {
  student: Student | null;
}

const BioData = ({ student }: Props) => {
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  // extract user data from session
  const { email, name, image } = session?.user as User;

  // default verification status
  let verification = "notapplied";

  if (!student) {
    // for new user
    verification = "notapplied";
  } else {
    // get the verification status from db
    verification = (student as Student).verification;
  }

  // if user is already submitted bio data, fill the form with data
  const initialValues: BioData = student
    ? {
        ...student.bioData,
        dob: new Date(student.bioData.dob),
      }
    : {
        email,
        name: name || "",
        photo: image,
        fatherName: "",
        branch: "",
        semester: "",
        regdNo: "",
        gender: "",
        dob: new Date(),
        caste: "",
        mob: "",
        fatherMob: "",
      };

  // validation schema
  const validationSchema = Yup.object({
    // name: Yup.string().required("Name is required"),
    // photo: Yup.string().required("Image is required"),
    fatherName: Yup.string().required("Father's name is required"),
    branch: Yup.string().required("Branch is required"),
    semester: Yup.string().required("Semester is required"),
    regdNo: Yup.string().matches(
      /^[FL]\d{11}$/gm,
      "Registration no. must be in the format FXXXXXXXXXX or LXXXXXXXXXX",
    ),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string().required("DOB is required"),
    caste: Yup.string().required("Caste is required"),
    mob: Yup.string()
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
        "Invalid mobile number",
      )
      .required("Mobile number is required"),
    fatherMob: Yup.string()
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
        "Invalid mobile number",
      )
      .required("Mobile number is required"),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: FormikValues, formikBag: any) => {
    // TODO: if verified, modified data should be sent in the PUT request
    // TODO: if not verified, modified data should be sent in the POST request

    switch (verification) {
      case "verified":
      case "rejected":
        return axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/student/${student?._id}/biodata`,
            values,
          )
          .then((res) => {
            if (res.status === 200) {
              formikBag.setSubmitting(false);
              toast.success("Bio data submitted", {
                theme: "colored",
                autoClose: 2000,
              });
              // dont't wait for swr to update
              setTimeout(() => {
                Router.reload();
              }, 2000);
            }
          })
          .catch((err) => {
            formikBag.setSubmitting(false);
            // show toast message
            if (err.response.status) {
              toast.error(err.response.data.message, {
                theme: "colored",
              });
            }
          });

      case "notapplied":
        return axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/student/new`, values)
          .then((res) => {
            if (res.status === 201) {
              formikBag.setSubmitting(false);
              toast.success("Bio data submitted", {
                theme: "colored",
                autoClose: 2000,
              });
              // dont't wait for swr to update
              setTimeout(() => {
                Router.reload();
              }, 2000);
            }
          })
          .catch((err) => {
            formikBag.setSubmitting(false);
            // show toast message
            if (err.response.status) {
              toast.error(err.response.data.message, {
                theme: "colored",
              });
            }
          });
    }
  };

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        <ToastContainer />
        {verification == "notapplied" && (
          <div className="text-center bg-gray-200 p-3 rounded-md font-nunito">
            <h1 className="md:text-2xl font-bold">
              Please fill the form below and submit your Bio Data.
            </h1>
            <p className="text-sm md:text-base">
              Once verified, you will be able to edit your Bio Data.
            </p>
          </div>
        )}

        {verification == "rejected" && (
          <div className="text-center bg-red-200 p-3 rounded-md font-nunito">
            <h1 className="md:text-2xl font-bold">
              Your Bio Data has been rejected.
            </h1>
            <p className="text-sm md:text-base">
              Please submit correct details
            </p>
          </div>
        )}

        {verification == "verified" && (
          <div className="text-center bg-green-200 p-2 md:p-3 rounded-md font-nunito">
            <h1 className="md:text-2xl font-bold">
              Your Bio Data has been verified successfully.
            </h1>
            <p className="text-sm md:text-base">
              You can edit your Bio Data anytime.
            </p>
          </div>
        )}
        {/* if verification pending hide the form else show */}
        {verification === "pending" ? (
          <div className="flex items-center justify-center bg-yellow-100 py-10 px-4 rounded-md font-poppins">
            <GoTelescope size={48} />
            <p className="ml-2 text-xl">Verification pending</p>
          </div>
        ) : (
          <>
            <Divider />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formikHelpers) => (
                <Form>
                  {/* 1. name */}
                  <Input
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    disabled={name ? true : false}
                    disabledMessage="(edit in profile)"
                  />
                  {/* 2. email */}
                  <Input
                    id="email"
                    name="email"
                    label="email"
                    placeholder="Enter your email"
                    disabled={true}
                    disabledMessage="(edit in profile)"
                  />
                  <div className="flex flex-wrap items-center gap-4 py-2">
                    {/* 7. registration no. */}
                    <div className="flex-1">
                      <Input
                        id="regdNo"
                        name="regdNo"
                        label="Registration No."
                        placeholder="Your registration no."
                        // once verified disable the registration no. field
                        disabled={verification === "verified"}
                      />
                    </div>
                    {/* 9. dob */}
                    <div className="flex-1">
                      <DatePicker id="dob" name="dob" label="Date of Birth" />
                    </div>
                  </div>
                  {/* 3. photo */}
                  {/* <Input
                id="photo"
                name="photo"
                label="photo"
                placeholder="Enter your pic url"
              /> */}
                  <div className="flex flex-wrap items-center gap-4 py-2">
                    {/* 5. (select) semester */}
                    <Select
                      id="semester"
                      name="semester"
                      options={semesters}
                      label="Semester"
                    />
                    {/* 6. (select) branch */}
                    <Select
                      id="branch"
                      name="branch"
                      options={branches}
                      label="Branch"
                    />
                  </div>
                  {/* 8. gender */}
                  <div className="flex flex-wrap items-center gap-4 py-2">
                    <Select
                      id="gender"
                      name="gender"
                      label="Gender"
                      options={genderOptions}
                    />
                    <Select
                      id="caste"
                      name="caste"
                      label="Caste"
                      options={casteOptions}
                    />
                  </div>
                  {/* 4. father name */}
                  <Input
                    id="fatherName"
                    name="fatherName"
                    label="Father's Name"
                    placeholder="Father's name"
                  />
                  <div className="flex flex-wrap items-center gap-4 py-2">
                    {/* 11. mob */}
                    <div className="flex-1">
                      <Input
                        id="mob"
                        name="mob"
                        label="Mobile No."
                        placeholder="Your mobile no."
                      />
                    </div>
                    {/* 12. father mob */}
                    <div className="flex-1">
                      <Input
                        id="fatherMob"
                        name="fatherMob"
                        label="Father's Mobile No."
                        placeholder="Father's mobile no."
                      />
                    </div>
                  </div>
                  {/* submit button */}
                  <div className="mt-4">
                    <SubmitButton
                      label="submit"
                      isDisabled={
                        !(formikHelpers.isValid && formikHelpers.dirty) ||
                        formikHelpers.isSubmitting
                      }
                      isSubmitting={formikHelpers.isSubmitting}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  try {
    // get the student profile
    const { data: student } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session.user?.email}`,
    );

    return { props: { session, student } };
  } catch (error) {
    // if student not found, send null
    return { props: { session, student: null } };
  }
}

export default BioData;
