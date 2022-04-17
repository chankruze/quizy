/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 09:36:43 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

interface Props {
  session: any;
}

const ProfileData: React.FC<Props> = ({ session }) => {
  return (
    <div className="py-3">
      <pre className="m-auto max-w-4xl overflow-x-auto bg-gray-800 rounded-md text-white p-3">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
};

export default ProfileData;
