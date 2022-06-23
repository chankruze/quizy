/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Jun 23 2022 22:25:20 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

interface Props {
  data: {
    key: string;
    value: string | number;
  };
}

const KVText: React.FC<Props> = ({ data }) => {
  return (
    <p className="font-medium font-poppins">
      {data.key}: <span className="font-normal font-roboto">{data.value}</span>
    </p>
  );
};

export default KVText;
