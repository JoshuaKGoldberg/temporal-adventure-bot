export type MessageId = string;

export type AddReaction = (messageId: string, name: string) => Promise<void>;

export interface Reaction {
  count: number;
  name: string;
}

export type GetReactions = (messageId: MessageId) => Promise<Reaction[]>;

export type PinMessage = (messageId: MessageId) => Promise<void>;

export type PostMessage = (text: string) => Promise<MessageId>;

export interface Integration {
  addReaction: AddReaction;
  getReactions: GetReactions;
  pinMessage: PinMessage;
  postMessage: PostMessage;
}

export interface WithIntegration {
  integration: Integration;
}
