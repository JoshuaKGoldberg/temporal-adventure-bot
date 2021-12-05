import ms from "ms";

export const delay = async (time: string) =>
  await new Promise((resolve) => setTimeout(resolve, ms(time)));
