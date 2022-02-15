'use strict'

/**
 * Discord にメッセージを送信する関数
 */
function runReminderScript(e) {
  const taskSheet = new Sheet(SS.getSheetByName(SHEET_INFO.TASK.NAME));
  const channelSheet = new Sheet(SS.getSheetByName(SHEET_INFO.CHANNEL.NAME));
  const channelDicts = channelSheet.getAsDicts();
  const discordMessage = new DiscordMessage(taskSheet, channelDicts);
  const tte = new TriggerTimeEvents(e);
  const date = tte.getLocaleDate();
  discordMessage.sendAll(date);
}
