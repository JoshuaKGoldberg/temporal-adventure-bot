import { PostMessageOptions, Integration } from "../platforms/types";

export async function postMessage(
  integration: Integration,
  options: PostMessageOptions
): Promise<string> {
  return await integration.postMessage(options);
}
