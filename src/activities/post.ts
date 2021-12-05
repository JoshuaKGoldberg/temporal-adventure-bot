import { Integration } from "../integrations/types";

export interface PostOptions {
  here?: boolean;
  text: string;
}

export async function post(
  integration: Integration,
  { here, text }: PostOptions
): Promise<string> {
  if (here) {
    text = `${integration.text.atHere} ${text}`;
  }

  return await integration.postMessage(text);
}
