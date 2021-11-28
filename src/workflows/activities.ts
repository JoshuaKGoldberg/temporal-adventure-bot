import { proxyActivities } from "@temporalio/workflow";

import type * as Activities from "../activities";

export const activities = proxyActivities<typeof Activities>({
  startToCloseTimeout: "1 minute",
});
