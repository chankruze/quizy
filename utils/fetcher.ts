/*
Author: chankruze (chankruze@gmail.com)
Created: Tue Apr 19 2022 08:05:41 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
