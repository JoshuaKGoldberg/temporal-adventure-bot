import crypto from "crypto";
import express from "express";
import ngrok from "ngrok";

import { settings } from "../../settings";
import { HandleText } from "../types";

interface SlackMessageBody {
  text: string;
}

interface SignedRequest extends express.Request {
  rawBody?: Buffer;
}

const isFromSlack = (request: SignedRequest) => {
  const timestamp = request.header("x-slack-request-timestamp");
  const signature = request.header("x-slack-signature");

  if (!timestamp || !signature || !request.rawBody) {
    return false;
  }

  // Reject replays of requests captured more than five minutes ago
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 60 * 5) {
    return false;
  }

  const expected = `v0=${crypto
    .createHmac("sha256", process.env.SLACK_SIGNING_SECRET)
    .update(`v0:${timestamp}:${request.rawBody.toString("utf8")}`)
    .digest("hex")}`;

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === signatureBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
  );
};

export const createSlackExpressServer = async (handleText: HandleText) => {
  const url = await ngrok.connect(settings.port);

  console.log("Receiving Slack events on:", url);

  const app = express().use(
    express.urlencoded({
      extended: true,
      verify: (request: SignedRequest, _response, buffer: Buffer) => {
        request.rawBody = buffer;
      },
    })
  );

  app.get("/", (_, response) => {
    response.status(200).send().end();
  });

  app.post("/", async (request, response) => {
    if (!isFromSlack(request)) {
      console.log("Rejecting request with a missing or invalid signature.");
      response.status(401).send("Invalid request signature.").end();
      return;
    }

    const { text } = request.body as SlackMessageBody;
    console.log("Received Slack POST with text:", text);

    const message = await handleText(text);
    console.log("Sending back Slack message:", message);

    response.status(200).send(message).end();
  });

  const server = app.listen(settings.port);

  return () => {
    server.close();
  };
};
