"use strict";
/**
* Clase Conexion
* --------------------------------------------------------------------------------------
* Esta clase permite interactuar con una hoja de cálculo de Google Sheets, proporcionando 
* funcionalidades para validar, consultar, insertar, actualizar y eliminar filas en una hoja específica.
*/
class Conexion {

  /**
  * Constructor
  * @param {string} book - ID del libro de Google Sheets.
  * @param {string} sheet - Nombre de la hoja dentro del libro.
  */
  constructor(book, sheet) {
    this._book  = book;
    this._sheet = sheet;
  }

  /**
  * Abre el libro de Google Sheets utilizando el ID proporcionado.
  * @returns {SpreadsheetApp.Spreadsheet} - Objeto del libro de Google Sheets.
  */
  connetBook() {
    return SpreadsheetApp.openById(this._book);
  }

  /**
  * Obtiene la hoja de cálculo dentro del libro por su nombre.
  * @returns {SpreadsheetApp.Sheet} - Objeto de la hoja de Google Sheets.
  */
  connetSheet() {
    return this.connetBook().getSheetByName(this._sheet);
  }

  /**
  * Obtiene los encabezados de la hoja de cálculo (primera fila).
  * @returns {string[]} - Array de los nombres de las columnas.
  */
  getHeadersSheet() {
    return this.connetSheet().getRange(1, 1, 1, this.connetSheet().getLastColumn()).getValues()[0];
  }

  /**
  * Genera un ID único basado en el nombre de la hoja, la fecha actual y un número aleatorio.
  * @returns {string} - ID único generado en formato MD5.
  */
  generateId() {
    return Util.convertToMd5(`${this._sheet}-${Util.getDateNow()}-${Math.floor(Math.random() * 1000)}`);
  }

  /**
  * Obtiene todos los IDs de la primera columna de la hoja de cálculo.
  * @returns {string[][]} - Array bidimensional de IDs de la hoja.
  */
  getIdsSheet() {
    return this.connetSheet().getRange(1, 1, this.connetSheet().getLastRow(), 1).getValues();
  }

  /**
  * Valida que los campos de la hoja coincidan con las propiedades del objeto de la clase.
  * @param {Object} objectClass - Objeto de clase para validar sus atributos.
  * @throws {Error} - Si los campos no coinciden o falta el atributo 'id'.
  */
  validateSheetFieldsAgainstClass(objectClass) {
    const fieldsSheet = this.getHeadersSheet();
    const attrClass   =  Object.keys(objectClass);
    if(!attrClass.includes("id")) { 
      throw new Erro(`Falta el atriburo id.`); 
    }
    if (fieldsSheet.length !== attrClass.length ||
        !fieldsSheet.every(fields => attrClass.includes(fields))) { 
      throw new Error(
        `Los campos de la hoja '${this._sheet}' no coinciden con los atributos definidos en la clase.`
      );
    }
  }

  /**
  * Obtiene todos los datos de la hoja y los mapea en un array de objetos.
  * @param {Object} objectClass - Objeto de clase para validar y estructurar los datos.
  * @returns {Object[]} - Array de objetos con los datos de la hoja.
  */
  getDataSheet(objectClass) {
    this.validateSheetFieldsAgainstClass(objectClass);
    const data = this.connetSheet().getDataRange().getValues();
    const headers = data.shift();
    const records = [];
    data.forEach(row => {
      if(row.join("") !== "") {
        const record = {};
        headers.forEach((header, index) => {
          record[header] = row[index];
        });
        records.push(record);
      }
    });
    return records;
  }

  /**
  * Inserta una nueva fila en la hoja de cálculo con los datos del objeto proporcionado.
  * @param {Object} objectClass - Objeto con los datos a guardar.
  * @returns {boolean} - True si la operación fue exitosa.
  */
  saveRow(objectClass) {
    this.validateSheetFieldsAgainstClass(objectClass);
    objectClass.id = this.generateId();
    this.connetSheet().insertRowBefore(2);
    this.getHeadersSheet().forEach((header, index) => {
      if(objectClass[header] != null) {
        this.connetSheet().getRange(2, (index + 1)).setValue(objectClass[header]).setNumberFormat("@");
      }
    });
    return true;
  }

  /**
  * Actualiza una fila existente en la hoja con base en el ID del objeto proporcionado.
  * @param {Object} objectClass - Objeto con los datos actualizados.
  * @returns {boolean} - True si la operación fue exitosa, False si no se encontró el ID.
  */
  updateRow(objectClass) {
    this.validateSheetFieldsAgainstClass(objectClass);
    const row = this.getIdsSheet().findIndex(id => id.toString() === objectClass.id.toString()) + 1;
    if(row < 1) return false;
    this.getHeadersSheet().forEach((header, index) => {
      if(objectClass[header] != null) {
        this.connetSheet()
        .getRange(row, (index + 1))
        .setValue(objectClass[header]).setNumberFormat("@");
      }
    });
    return true;
  }

  /**
  * Elimina una fila de la hoja con base en el ID del objeto proporcionado.
  * @param {Object} objectClass - Objeto con el ID de la fila a eliminar.
  * @returns {boolean} - True si la operación fue exitosa, False si no se encontró el ID.
  */
  deleteRow(objectClass) {
    this.validateSheetFieldsAgainstClass(objectClass);
    const row = this.getIdsSheet().findIndex(id => id.toString() === objectClass.id.toString()) + 1;
    if(row < 1) return false;
    this.connetSheet().deleteRow(row);
    return true;
  }
  
}