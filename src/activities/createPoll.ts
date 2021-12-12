import { CreatePollOptions, Integration } from "../integrations/types";

export async function createPoll(
  integration: Integration,
  options: CreatePollOptions
) {
  return await integration.createPoll(options);
}
