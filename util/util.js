/**
 * Util 
 * --------------------------------------------------------------------------------------
 * Clase de utilidades que proporciona métodos estáticos para operaciones comunes,
 * como formateo de texto, obtención de fechas, y encriptación.
 */
class Util {
  
  /**
  * Convierte un texto a un hash MD5.
  * @param {string} text - Texto que será convertido a MD5.
  * @returns {string} - Hash MD5 del texto.
  * @description Este método utiliza el módulo Utilities de Google Apps Script
  * para generar el hash MD5 de una cadena de texto.
  */
  static convertToMd5(text) {
    return Utilities
    .computeDigest(Utilities.DigestAlgorithm.MD5, text)
    .reduce((output, byte) => output + (byte < 0 ? byte + 256 : byte)
    .toString(16)
    .padStart(2, '0'), '');
  }

  /**
  * Obtiene la fecha y hora actual en formato específico.
  * @returns {string} - Fecha y hora actual en formato 'yyyy-MM-dd HH:mm:ss'.
  * @description Usa la zona horaria 'America/Bogota' y formatea la fecha actual 
  * en un formato estándar.
  */
  static getDateNow() {
    return Utilities.formatDate(
      new Date(), 'America/Bogota', 'yyyy-MM-dd HH:mm:ss');
  }

  /**
  * Capitaliza el texto recibido.
  * @param {string} text - Cadena de texto a capitalizar.
  * @returns {string} - Texto con cada palabra capitalizada.
  * @description Convierte la primera letra de cada palabra en mayúscula y 
  * el resto de las letras en minúscula.
  */
  static capitalizeText(text) {
    const words = text.split(" ");
    const capitalized = new Array();
    words.forEach(w => {
      capitalized.push(w.charAt(0).toUpperCase() + w.slice(1));
    })
    return capitalized.join(" ");
  }

  /**
  * Convierte un texto a minúsculas.
  * @param {string} text - Texto a convertir.
  * @returns {string} - Texto en minúsculas. Si el texto está vacío, retorna una cadena vacía.
  * @description Asegura que cualquier texto recibido se transforme completamente a minúsculas.
  */
  static lowerCase(text) {
    if(text != "") {
      return text.toString().toLowerCase();
    }
    return "";
  }
}