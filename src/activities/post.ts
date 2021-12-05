import { Integration } from "../integrations/types";

export interface PostOptions {
  text: string;
}

export async function post(
  integration: Integration,
  { text }: PostOptions
): Promise<string> {
  return await integration.postMessage(text);
}
