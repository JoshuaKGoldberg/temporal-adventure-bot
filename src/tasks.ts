import { sleep } from "@temporalio/workflow";

export async function checkExponentially<Result>(
  action: () => Promise<Result | undefined>
) {
  let days = 1;

  while (true) {
    await sleep(`${days} days`);

    const result = await action();
    if (result !== undefined) {
      return result;
    }

    days *= 2;
  }
}
