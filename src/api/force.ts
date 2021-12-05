import { WorkflowHandle } from "@temporalio/client";
import { Workflow } from "@temporalio/common";
import * as wf from "@temporalio/workflow";

import { logger } from "../logger";
import { ForceInput, GameOption } from "../types";
import { indexToEmoji } from "../utils/entries";

const forceSignal = wf.defineSignal<[ForceInput]>("force");

export const getForcedChoice = async (options: GameOption[]) => {
  let forced: ForceInput | undefined;

  wf.setHandler(forceSignal, (input) => {
    logger.info("Received force input:", input);
    forced = input;
  });

  await wf.condition(() => forced !== undefined);

  const entry =
    forced === "random"
      ? options[Math.floor(Math.random() * options.length)]
      : options[forced!];

  return {
    choice: entry.next,
    forced,
  };
};

const parseCommandText = (text: string) => {
  if (text === "random") {
    return text;
  }

  const next = parseInt(text);

  return isNaN(next) ? undefined : next;
};

export const printForced = (forced: ForceInput) => {
  const printed =
    forced === "random" ? "randomly" : `:${indexToEmoji[forced]}:`;

  return `🐌🙄 y'all took too long to choose! An admin has chosen *${printed}* for you.`;
};

export const receiveCommandText = async (
  gameHandle: WorkflowHandle<Workflow> | undefined,
  text: string
) => {
  if (!gameHandle) {
    return "Hmm 🤔, looks like there isn't a game happening right now? Try again later.";
  }

  const next = parseCommandText(text);
  if (next === undefined) {
    return `I'm sorry, I don't understand '${text}'... 😖`;
  }

  await gameHandle.signal(forceSignal, next);

  return `👍 You got it! Going with *${next}*.`;
};
