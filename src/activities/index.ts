import { Integration } from "../integrations/types";

import { check } from "./check";
import { finish } from "./finish";
import { pin } from "./pin";
import { populate } from "./populate";
import { post } from "./post";

export const createActivities = (integration: Integration) => ({
  check: check.bind(null, integration),
  finish: finish.bind(null, integration),
  pin: pin.bind(null, integration),
  populate: populate.bind(null, integration),
  post: post.bind(null, integration),
});
