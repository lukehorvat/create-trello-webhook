import got from "got";
import pkg from "../package.json";

export default function(key, token, description, callbackUrl, modelId) {
  return got(`https://api.trello.com/1/tokens/${token}/webhooks/?key=${key}`, {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `${pkg.name}@${pkg.version}`
    },
    body: JSON.stringify({
      description,
      callbackURL: callbackUrl,
      idModel: modelId
    }),
    json: true
  }).then(response => response.body.id);
}
