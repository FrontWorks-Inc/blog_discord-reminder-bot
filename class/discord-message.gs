'use strict'

class DiscordMessage {

  /**
   * Discord のメッセージ送信に関するコンストラクタ
   * @constructor
   * @param {Sheet} sheet - Sheet オブジェクト
   * @param {Array.<Map>} dicts - チャンネル情報
   */
  constructor(sheet, dicts) {
    /** @type {Sheet} */
    this.sheet = sheet;
    /** @type {Array.<Map>} */
    this.dicts = dicts;
  }

  /**
   * すべての対象レコードのメッセージを送信するメソッド
   */
  sendAll() {
    const records = this.sheet.getTargetRecords(DT.date);
    console.log(records);
    records.forEach(record => this.send(record));
  }

  /**
   * 対象レコードのメッセージを送信するメソッド
   * @param {Array.<number|string|boolean|Date>} record - 対象レコード
   */
  send(record) {
    const channelName = record[this.sheet.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.CHANNEL_NAME)];
    const webhookUrl = this.getWebhookUrl(channelName);
    const message = record[this.sheet.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.MESSAGE)];
    const params = this.getParams(message);
    console.log(message);
    UrlFetchApp.fetch(webhookUrl, params);
  }

  /**
   * チャンネル名から Webhook URL を取得するメソッド
   * @param {string} channelName - チャンネル名
   * @return {string} Webhook URL
   */
  getWebhookUrl(channelName) {
    const dict = this.dicts.find(dict => dict.get(SHEET_INFO.CHANNEL.COLUMN.CHANNEL_NAME) === channelName);
    const webhookUrl = dict.get(SHEET_INFO.CHANNEL.COLUMN.WEBHOOK_URL);
    return webhookUrl;
  }

  /**
   * UrlFetchApp で使用するパラメーターを取得するメソッド
   * @param {string} message - 送信するメッセージ
   * @return {Object} パラメーター
   */
  getParams(message) {
    const params =
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      payload: JSON.stringify({
        content: message
      })
    };
    return params;
  }

}