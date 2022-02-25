'use strict'

class Datetime {

  /**
   * 日時に関するコンストラクタ
   * @constructor
   * @param {Date|string|number} param - Date オブジェクトでインスタンス生成可能な引数
   */
  constructor(param = new Date()) {
    /** @type {Date} */
    this.date = new Date(param);
  }

  /**
   * 翌日 0:00 の Datetime オブジェクトを取得するメソッド
   * @return {Datetime} Datetime オブジェクト
   */
  getDtTomorrow() {
    const dtTomorrow = new Datetime(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() + 1
    );
    return dtTomorrow;
  }

  /**
   * format 部分が同じものか比較するメソッド
   * @param {Date} date - 比較対象の Date オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean} format 部分が同じかどうか
   */
  isSame(date, format = 'yyyy/MM/dd') {
    return Datetime.format(date, format) === Datetime.format(this.date, format);
  }

  /**
   * 指定のフォーマットで日付を文字列化する静的メソッド
   * @param {Date|string} d - Date オブジェクトか日付をあらわす文字列型
   * @param {string} format - フォーマットする形式
   * @return {string} フォーマットされた文字列型の日付
   */
  static format(d = new Date(), format = 'yyyy/MM/dd HH:mm') {
    const date = new Date(d);
    const strDate = Utilities.formatDate(date, 'JST', format);
    return strDate;
  }

}