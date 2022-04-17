/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 14:20:56 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { useSession, signIn, signOut } from "next-auth/react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import { User } from "../../types/user";
import Input from "../../components/formik-controls/Input";
import SubmitButton from "../../components/formik-controls/SubmitButton";

const Profile = () => {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  const { email, name, image } = data?.user as User;

  // initial values
  const initialValues = {
    name: name,
    email: email,
    image: image,
  };

  // validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    // image: Yup.string().required("Image is required"),
  });

  // on submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: FormikValues, formikBag: any) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikHelpers) => (
          <Form>
            <Input id="email" name="email" placeholder="Email" label="Email" />

            <Input id="name" name="name" placeholder="Name" label="Name" />

            <Input id="image" name="image" placeholder="Image" label="Image" />

            <SubmitButton
              label="Update"
              isDisabled={
                !(formikHelpers.isValid && formikHelpers.dirty) ||
                formikHelpers.isSubmitting
              }
              isSubmitting={formikHelpers.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
