"use strict";
/**
 * User
 * --------------------------------------------------------------------------------------
 */
class User{
  constructor({
      id = null,
      document = null,
      name = null, 
      password = null, 
      rol = null, 
      lastLogin = null, 
      active = null, 
    } = {}) {
      this.id = id;
      this.document = document;
      this.name = name;
      this.password = password;
      this.rol = rol;
      this.lastLogin = lastLogin;
      this.active = active;
  }

  setRecordSave(document, name, password, rol) {
    this.document = document;
    this.name = name;
    this.password = password;
    this.rol = rol;
    this.active = 1;
  }

  setRecordUpdate(id, document, name, password, rol, active) {
    this.id = id;
    this.document = document;
    this.name = name;
    this.password = password;
    this.rol = rol;
    this.active = active;
  }

  setRecordUpdateLastLogin(id, lastLogin) {
    this.id = id;
    this.lastLogin = lastLogin;
  }

  getProperties() {
    return Object.assign({}, this);
  } 

  isUserObject(object) {
    if(!(typeof object === 'object' && object !== null && object instanceof User)) {
      throw new Error("El objecto debe ser una instacia de la clase user.");
    }
  } 
}