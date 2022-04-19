/*
Author: chankruze (chankruze@gmail.com)
Created: Tue Apr 19 2022 17:17:56 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}
