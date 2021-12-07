import express from "express";
import ngrok from "ngrok";

import { settings } from "../../settings";
import { HandleText } from "../types";

interface SlackMessageBody {
  text: string;
}

export const createSlackExpressServer = async (handleText: HandleText) => {
  const url = await ngrok.connect(settings.port);

  console.log("Receiving Slack event POSTs on:", url);

  const app = express().use(express.urlencoded({ extended: true }));

  app.post("/", async (request, response) => {
    const { text } = request.body as SlackMessageBody;
    console.log("Received Slack POST with text:", text);

    const message = await handleText(text);
    console.log("Sending back Slack message:", message);

    response.status(200).send(message).end();
  });

  app.listen(settings.port);
};