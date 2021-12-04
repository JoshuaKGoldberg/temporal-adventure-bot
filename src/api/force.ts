import * as wf from "@temporalio/workflow";

import { logger } from "../logger";
import { ForceInput, GameOption } from "../types";

export const forceSignal = wf.defineSignal<[ForceInput]>("force");

export const getForcedChoice = async (options: GameOption[]) => {
  let forced: ForceInput | undefined;

  wf.setHandler(forceSignal, (input) => {
    logger.info("Received force input", input);
    forced = input;
  });

  await wf.condition(() => !!forced);

  const entry =
    forced === "random"
      ? options[Math.floor(Math.random() * options.length)]
      : options[forced!];

  return entry.next;
};
