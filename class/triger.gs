'use strict'

class Trigger {

  /**
   * トリガーに関するコンストラクタ
   * @constructor
   * @param {string} functionName - 関数名
   */
  constructor(functionName) {
    /** @type {string} */
    this.functionName = functionName;
  }

  /**
   * 翌日の指定日時のトリガーを設定するメソッド
   */
  setTimesForTomorrow() {
    this.delete();
    const triggerTimes = this.getTimes();
    if (triggerTimes.length === 0) return;
    triggerTimes.forEach(triggerTime => this.setTimes(triggerTime));
  }

  /**
     * 指定日時のトリガーを設定するメソッド
     * @param {Date} triggerTime - トリガーをセットする指定日時
     */
  setTimes(triggerTime) {
    ScriptApp.newTrigger(this.functionName).
      timeBased().
      at(triggerTime).
      create();
  }

  /**
   * トリガーを設定する時間を取得するメソッド
   * @return {Array.<Date>} トリガーを設定する時間
   */
  getTimes() {
    const tomorrow = new Datetime(DT.tomorrow);
    const sheet = new Sheet(SS.getSheetByName(SHEET_INFO.TASK.NAME));
    const taskValues = sheet.getDataRangeValues();
    const tomorrowTaskValues = taskValues.filter(record => tomorrow.isSame(
      new Date(record[sheet.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.DATE)])
    ));
    const triggerTimes = tomorrowTaskValues.
      map(record =>
        Datetime.format(record[sheet.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.DATE)], 'yyyy/MM/dd ') +
        Datetime.format(record[sheet.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.TIME)], 'HH:mm')
      ).
      filter((strTime, i, strTimes) => i === strTimes.indexOf(strTime)). // NOTE: lastIndexOf から書き換えた
      map(uniqueStrTime => new Date(uniqueStrTime));
    return triggerTimes;
  }

  /**
   * トリガーを削除するメソッド
   */
  delete() {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === this.functionName) ScriptApp.deleteTrigger(trigger);
    });
  }

}