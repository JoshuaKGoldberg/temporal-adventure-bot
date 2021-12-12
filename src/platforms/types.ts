export interface Integration {
  createPoll: CreatePoll;
  getReactions: GetReactions;
  pinMessage: PinMessage;
  postMessage: PostMessage;
}

export type MessageId = string;

export interface CreatePollOptions {
  choices: string[];
  prompt: string;
}

export type CreatePoll = (options: CreatePollOptions) => Promise<MessageId>;

export interface Reaction {
  count: number;
  index: number;
}

export type GetReactions = (messageId: MessageId) => Promise<Reaction[]>;

export type PinMessage = (messageId: MessageId) => Promise<void>;

export interface PostMessageOptions {
  notify?: boolean;
  text: string;
}

export type PostMessage = (options: PostMessageOptions) => Promise<MessageId>;

export type HandleText = (text: string) => Promise<string>;
