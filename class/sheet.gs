'use strict'

class Sheet {

  /**
   * シートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.sheet} sheet - 対象となるシート
   * @param {number} headerRows - ヘッダー行の数
   */
  constructor(sheet = SS.getActiveSheet(), headerRows = 1) {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = sheet;
    /** @type {number} */
    this.headerRows = headerRows;
  }

  /**
   * シートの値すべて取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} シートの値
   */
  getDataRangeValues() {
    if (this.dataRangeValues_ !== undefined) return this.dataRangeValues_;
    const dataRangeValues = this.sheet.getDataRange().getValues();
    this.dataRangeValues_ = dataRangeValues;
    return dataRangeValues;
  }

  /**
 * ヘッダー情報 (各) から列インデックスを返すメソッド
 * @param {string} header - ヘッダー
 * @param {number} index - ヘッダーズのヘッダーとなるインデックス
 * @return {number} 列インデックス
 */
  getColumnIndexByHeaderName(header, index = this.headerRows - 1) {
    const headers = this.getHeaders(index);
    const columnIndex = headers.indexOf(header);
    if (columnIndex === -1) throw new Error('There is no value "' + header + '" in the header column.');
    return columnIndex;
  }

  /**
   * ヘッダーを取得するメソッド
   * @param {number} index - ヘッダーズのヘッダーとなるインデックス
   * @return {Array.<number|string|boolean|Date>} ヘッダー
   */
  getHeaders(index = this.headerRows - 1) {
    if (this.headers_ !== undefined) return this.headers_;
    const headerValues = this.getHeaderValues();
    const headers = headerValues[index];
    this.headers_ = headers;
    return headers;
  }

  /**
   * ヘッダー部分を取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} ヘッダー部分
   */
  getHeaderValues() {
    if (this.headerValues_ !== undefined) return this.headerValues_;
    const values = this.getDataRangeValues();
    const headerValues = values.filter((_, i) => i < this.headerRows);
    this.headerValues_ = headerValues;
    return headerValues;
  }

  /**
   * シートの値から、ヘッダー情報をプロパティとして持つ Map 型を生成するメソッド
   * @param {number} index - ヘッダー行のヘッダーとなるインデックス
   * @return {Array.<Map>} ヘッダー情報を key, 値を value として持つ Map 型
   */
  getAsDicts(index = this.headerRows - 1) {
    if (this.dicts_ !== undefined) return this.dicts_;
    const headers = this.getHeaders(index);
    const values = this.getDataValues();
    const dicts = values.map(record => record.
      reduce((acc, cur, i) => acc.set(headers[i], cur), new Map())
    );
    this.dicts_ = dicts;
    return dicts;
  }

  /**
   * ヘッダー行を除いたレコード部分を取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} レコード
   */
  getDataValues() {
    if (this.dataValues_ !== undefined) return this.dataValues_;
    const values = this.getDataRangeValues();
    const dataValues = values.filter((_, i) => i >= this.headerRows);
    this.dataValues_ = dataValues;
    return dataValues;
  }

  /**
   * 通知対象のレコード部分を取得するメソッド
   * @param {Date} date - 通知する日時 
   * @return {Array.<Array.<number|string|boolean|Date>>} レコード
   */

  getTargetRecords(date) {
    const values = this.getDataValues();
    const targetRecords = values.filter(record =>
      record[this.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.SWITCH)] === true &&
      Datetime.format(record[this.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.DATE)], 'yyyy/MM/dd ') +
      Datetime.format(record[this.getColumnIndexByHeaderName(SHEET_INFO.TASK.COLUMN.TIME)], 'HH:mm') === Datetime.format(date)
    )
    return targetRecords;
  }

}