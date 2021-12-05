export interface Integration {
  addReaction: AddReaction;
  getReactions: GetReactions;
  pinMessage: PinMessage;
  postMessage: PostMessage;
  text: TextIntegration;
}

export type MessageId = string;

export type AddReaction = (messageId: string, name: string) => Promise<void>;

export interface Reaction {
  count: number;
  name: string;
}

export type GetReactions = (messageId: MessageId) => Promise<Reaction[]>;

export type PinMessage = (messageId: MessageId) => Promise<void>;

export type PostMessage = (text: string) => Promise<MessageId>;

export interface TextIntegration {
  atHere: string;
  emojiToName: (name: string) => string;
  nameToEmoji: (name: string) => string;
}

export interface WithIntegration {
  integration: Integration;
}

export type HandleText = (text: string) => Promise<string>;
