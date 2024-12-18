/**
* UserService 
* --------------------------------------------------------------------------------------
* Clase encargada de gestionar la lógica de negocio relacionada con los usuarios.
* Actúa como una capa intermedia entre el controlador y el repositorio, procesando 
* la información y aplicando reglas de negocio antes de interactuar con la capa de datos.
*/
class UserService {

  /**
  * Obtiene todos los registros de usuarios y los formatea para su presentación.
  * @returns {Array[]} - Lista de usuarios en formato de tabla.
  */
  static getAllRecords() {
    const records = new UserRepository().getAllRecords(); 
    const list    = [];
    records.forEach((record) => {
      const options = ``;
      list.push(
        [
          record.document,
          Util.capitalizeText(record.name),
          Util.capitalizeText(record.rol),
          record.lastLogin,
          (record.active == 1) ? "Si" : "No",
          options
        ]
      );
    });
    return list;
  }

  /**
  * Busca un usuario por su ID y devuelve sus datos formateados.
  * @param {string} id - El ID único del usuario.
  * @returns {Object|null} - Objeto del usuario encontrado o null si no existe.
  */
  static findById(id) {
    const searchRecord = new UserRepository().findById(id);
    if(searchRecord != null) {
      return {
        id        : searchRecord.id,
        document  : searchRecord.document,
        name      : searchRecord.name,
        rol       : searchRecord.rol,
        active    : searchRecord.active
      };
    }
  }

  /**
  * Guarda un nuevo usuario, aplicando validaciones antes de enviarlo al repositorio.
  * @param {string} document - Documento del usuario.
  * @param {string} name - Nombre del usuario.
  * @param {string} password - Contraseña del usuario.
  * @param {string} rol - Rol del usuario.
  * @returns {Object} - Mensaje de éxito o advertencia según el resultado.
  */
  static save(document, name, password, rol) {
    const saveRecord = new User();
    saveRecord.setRecordSave(
      document,
      name.toString().toLowerCase(),
      Util.convertToMd5(password),
      rol.toString().toLowerCase()
    );

    //Validar campos vacios
    for(const property in saveRecord.getProperties()) {
      const value = saveRecord.getProperties()[property];
      if(value != null && value == "") {
        return Alerts.getWarnig(`Ingrese un valor en el campo : ${property}`);
      }
    }

    //Validar usuario existe
    const searchRecord = new UserRepository().findByDocument(saveRecord.document);
    if(searchRecord != null) {
      return Alerts.getWarnig(`Existe usuario con documento : ${saveRecord.document}`);
    }

    //Guardar
    if(new UserRepository().save(saveRecord)) {
      return Alerts.getSucces();
    } 
    
    return Alerts.getWarnig();
  }

  /**
  * Actualiza un usuario existente, validando datos antes de actualizar.
  * @param {string} id - ID del usuario.
  * @param {string} document - Documento del usuario.
  * @param {string} name - Nombre del usuario.
  * @param {string} password - Contraseña del usuario.
  * @param {string} rol - Rol del usuario.
  * @param {number} active - Estado activo del usuario (1: Activo, 0: Inactivo).
  * @returns {Object} - Mensaje de éxito o advertencia según el resultado.
  */
  static update(id, document, name, password, rol, active) {
    const updateRecord  = new User();
    updateRecord.setRecordUpdate(
      id,
      document,
      name.toString().toLowerCase(),
      Util.convertToMd5(password),
      rol.toString().toLowerCase(),
      active
    );
    
    //Validar campos vacios
    for(const property in updateRecord.getProperties()) {
      const value = updateRecord.getProperties()[property];
      if(value != null && value == "") {
        return Alerts.getWarnig(`Ingrese un valor en el campo : ${property}`);
      }
    }

    const searchRecord = new UserRepository().findById(updateRecord.id);
    if(searchRecord === null) {
      return Alerts.getWarnig(`No existe el registro : ${updateRecord.id}`);
    }

    const searchRecordDocument = new UserRepository().findByDocument(updateRecord.document);
    if(searchRecordDocument !== null && searchRecordDocument.id !== updateRecord.id) {
      return Alerts.getWarnig(`Existe usuario con documento : ${updateRecord.document}`);
    }

    if(new UserRepository().update(updateRecord)) {
      return Alerts.getSucces();
    } 
    
    return Alerts.getWarnig();
  }

  /**
  * Actualiza el último inicio de sesión de un usuario.
  * @param {string} id - ID del usuario.
  * @param {string} date - Fecha de último inicio de sesión.
  * @returns {boolean} - True si el registro se actualizó correctamente.
  */
  static updateLastLogin(id, date) {
    const updateRecord  = new User();
    updateRecord.setRecordUpdateLastLogin(
      id,
      date
    );
    return new UserRepository().update(updateRecord);
  }

  /**
  * Elimina un usuario por su ID.
  * @param {string} id - ID del usuario.
  * @returns {Object} - Mensaje de éxito o advertencia según el resultado.
  */
  static delete(id) {
    const searchRecord = new UserRepository().findById(id);
    if(searchRecord != null) {
      new UserRepository().delete(new User(searchRecord));
      return Alerts.getSucces();
    }
    return Alerts.getWarnig();
  }

  /**
  * Autentica un usuario verificando sus credenciales.
  * @param {string} document - Documento del usuario.
  * @param {string} password - Contraseña del usuario.
  * @returns {Object} - Mensaje de éxito con información del usuario o advertencia si falla.
  */
  static authenticate(document, password) {
    if(document == "" && password == "") {
      return Alerts.getWarnig(`Los campos no pueden estar vacios!`);
    }
    const searchRecord = new UserRepository().findByDocument(document);
    if(searchRecord != null) {
      if(searchRecord.password === Util.convertToMd5(password) && 
        searchRecord.active === "1") { 
        this.updateLastLogin(searchRecord.id, Util.getDateNow());
        return Alerts.getSucces({
          id : searchRecord.id,
          name : Util.capitalizeText(searchRecord.name),
          rol : Util.capitalizeText(searchRecord.rol),
          lastLogin : searchRecord.lastLogin,
          options : this.getUserMenu(searchRecord.rol)
        });
      }
    }
    return Alerts.getWarnig(`Credenciales no validas!`);
  }

}