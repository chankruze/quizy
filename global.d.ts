/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 17:18:07 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}
