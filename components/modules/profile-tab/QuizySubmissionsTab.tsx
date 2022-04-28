/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 27 2022 07:48:21 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import moment from "moment";
import { useContext } from "react";
import useSWR from "swr";
import { StudentContext } from "../../../pages/profile";
import { Submission } from "../../../types/submission";
import { fetcher } from "../../../utils/fetcher";

const QuizySubmissionsTab = () => {
  const { studentId } = useContext(StudentContext);
  const {
    data: submissions,
    isValidating,
    error,
  } = useSWR(
    studentId
      ? `${process.env.NEXT_PUBLIC_API_URL}/submission/student/${studentId}`
      : null,
    fetcher,
  );

  if (submissions) {
    return (
      <div className="w-full overflow-y-auto">
        {submissions.map((submission: Submission) => (
          <div key={submission._id} className="flex justify-between p-2">
            <div>
              {moment(submission.date).format("MMMM Do YYYY, h:mm:ss A")}
            </div>
            <div>{submission.quizId}</div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default QuizySubmissionsTab;
