import { Game } from "./types";

export const game: Game = {
  begin: {
    description: "You see two doors. Which do you take?",
    options: [
      {
        description: "The one on the left",
        next: "left",
      },
      {
        description: "The one on the left",
        next: "right",
      },
    ],
  },
  left: {
    description: "This left door kills you. The end.",
  },
  right: {
    description: "This right door kills you. The end.",
  },
};
