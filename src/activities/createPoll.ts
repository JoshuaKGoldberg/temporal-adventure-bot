import { CreatePollOptions, Integration } from "../platforms/types";

export async function createPoll(
  integration: Integration,
  options: CreatePollOptions
) {
  return await integration.createPoll(options);
}
