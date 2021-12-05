import { Integration } from "../integrations/types";

const message = `
...and, that's the end of the game. Thanks for playing everyone! :end: 
`.trim();

export async function finish(integration: Integration) {
  return await integration.postMessage(message);
}
