export interface GameOptions {
  channel: string;
  entry: string;
}

export interface Game {
  [i: string]: GameEntry;
}

export interface GameEntry {
  description: string;
  options?: GameOption[];
}

export type GameEntryWithOptions = Required<GameEntry>;

export interface GameOption {
  description: string;
  next: string;
}

export type Result<Data = void> = ResultFailure | ResultSuccess<Data>;

export interface ResultFailure {
  error: string;
}

export type ResultSuccess<Data> = Data extends void
  ? Record<string, never>
  : { data: Data };
