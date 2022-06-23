/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 27 2022 07:48:21 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import moment from "moment";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import { StudentContext } from "../../../pages/profile";
import { Submission } from "../../../types/submission";
import { sliceId } from "../../../utils";
import { fetcher } from "../../../utils/fetcher";
// icons
import { GoLinkExternal } from "react-icons/go";

const SubmissionsTab = () => {
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

  // {submissions.map((submission: Submission) => (
  //   <div key={submission._id} className="flex p-2 border-b">
  //     <p className="px-2 bg-green-200 rounded-md">
  //       {sliceId(submission._id as string)}
  //     </p>
  //     <div className="flex-1 flex justify-between pl-2">
  //       <p className="px-2 bg-yellow-200 rounded-md">
  //         {sliceId(submission.quizId)}
  //       </p>
  //       <p>{moment(submission.date).format("MMMM Do YYYY, h:mm:ss A")}</p>
  //     </div>
  //   </div>
  // ))}

  if (submissions) {
    return (
      <div className="w-full overflow-y-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="flex p-2 border-b font-poppins text-gray-500 bg-gray-50">
              <th className="flex-1">Sub. Id.</th>
              <th className="flex-1">Quiz Id.</th>
              <th className="flex-1">Date</th>
              <th className="flex-1">Score</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission: Submission, index: number) => (
              <tr key={index} className="flex p-1 border-b font-nunito">
                <td className="flex-1">{sliceId(submission._id as string)}</td>
                <td className="flex-1">
                  {sliceId(submission.quizId as string)}
                </td>
                <td className="hidden sm:block flex-1">
                  {moment(submission.date).format("DD MMM YYYY, h:mm:ss A")}
                </td>
                <td className="sm:hidden flex-1">
                  {moment(submission.date).format("DD/MM/YYYY")}
                </td>
                <td className="flex-1">
                  <Link
                    href={`/quiz/${submission.quizId}/result/${submission._id}`}
                    passHref
                  >
                    <a className="text-blue-500 flex justify-center items-center">
                      <p className="pr-1">view</p>
                      <GoLinkExternal />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default SubmissionsTab;
