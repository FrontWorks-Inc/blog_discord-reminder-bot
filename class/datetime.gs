'use strict'

class Datetime {

  /**
   * 日付に関するコンストラクタ
   * @constructor
   * @param {Date} date - 対象となる日付
   */
  constructor(date = new Date()) {
    /** @type {Date} */
    this.date = new Date(date);
    /** @type {Date} */
    this.tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
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

const DATETIME = new Datetime();