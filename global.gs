/**
 * GitHub README.md
 * https://github.com/FrontWorks-Inc/blog_discord-reminder-bot/blob/main/README.md
 */

/**
 * グローバル定数宣言
 */
/** @type {SpreadsheetApp.Spreadsheet} */
const SS = SpreadsheetApp.getActiveSpreadsheet();
/** @enum {string} */
const SHEET_INFO = Object.freeze(
  {
    CHANNEL: {
      NAME: 'Channel',
      COLUMN: {
        CHANNEL_NAME: 'チャンネル名',
        WEBHOOK_URL: 'Webhook URL'
      }
    },
    TASK: {
      NAME: 'Task',
      COLUMN: {
        SWITCH: 'スイッチ',
        CHANNEL_NAME: 'チャンネル名',
        MESSAGE: 'メッセージ',
        DATE: '日付',
        TIME: '時刻'
      }
    }
  }
);