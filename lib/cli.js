#!/usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import pkg from "../package.json";
import createTrelloWebhook from "./";

const { argv } =
  yargs
  .usage(`Usage: ${chalk.cyan(pkg.name, chalk.underline("KEY"), chalk.underline("TOKEN"), chalk.underline("DESCRIPTION"), chalk.underline("CALLBACK URL"), chalk.underline("MODEL ID"))}`)
  .option("h", { alias: "help", describe: "Show help", type: "boolean" })
  .option("v", { alias: "version", describe: "Show version", type: "boolean" });

if (argv.help || argv.h) {
  yargs.showHelp();
  process.exit();
}

if (argv.version || argv.v) {
  console.log(pkg.version);
  process.exit();
}

if (argv._.length !== 5) {
  yargs.showHelp();
  console.error(chalk.red("Key, token, description, callback URL, and model ID must be specified."));
  process.exit(1);
}

let [ key, token, description, callbackUrl, modelId ] = argv._;
console.log(chalk.green("Creating Trello webhook..."));

createTrelloWebhook(
  key,
  token,
  description,
  callbackUrl,
  modelId
).then(webhookId => {
  console.log(chalk.green(`Done! Webhook ID = "${webhookId}".`));
  process.exit();
}).catch(error => {
  console.error(chalk.red(error.message || "An unexpected error occurred."));
  process.exit(1);
});
