import { PostMessageOptions, Integration } from "../integrations/types";

export async function postMessage(
  integration: Integration,
  options: PostMessageOptions
): Promise<string> {
  return await integration.postMessage(options);
}
