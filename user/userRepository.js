/**
 * UserRepository 
 * --------------------------------------------------------------------------------------
 * Clase encargada de manejar las operaciones CRUD sobre la hoja de cálculo que actúa 
 * como base de datos para los usuarios. Utiliza la clase `ConexionMyBook` para interactuar 
 * con la hoja y encapsula la lógica específica para los registros de usuario.
 */
class UserRepository {

  /**
  * Constructor
  * Inicializa una instancia de la clase `ConexionMyBook` para manejar la hoja de "users".
  */
  constructor() {
    this._conexion = new ConexionMyBook("users");  
  }

  /**
  * Verifica si un objeto es válido como usuario.
  * @param {Object} object - Objeto a validar.
  * @throws {Error} Si el objeto no cumple con el formato de usuario.
  */
  isUserObject(object) {
    // Delegación a la lógica de validación de la clase User
    new User().isUserObject(object);
  }

  /**
  * Obtiene todos los registros de la hoja "users".
  * @returns {Object[]} - Lista de usuarios registrados como objetos.
  */
  getAllRecords() {
    return this._conexion.getDataSheet(new User().getProperties());
  }

  /**
  * Busca un usuario por su ID.
  * @param {string} id - El ID único del usuario.
  * @returns {Object|null} - Objeto del usuario encontrado, o null si no existe.
  */
  findById(id) {
    return this.getAllRecords().find(user => user.id === id);
  }

  /**
  * Busca un usuario por su documento (número de identificación, por ejemplo).
  * @param {string} document - Documento único del usuario.
  * @returns {Object|null} - Objeto del usuario encontrado, o null si no existe.
  */
  findByDocument(document) {
    return this.getAllRecords().find(user => user.document === document);
  }

  /**
  * Guarda un nuevo usuario en la hoja de cálculo.
  * @param {Object} user - Objeto con los datos del usuario.
  * @returns {boolean} - True si el usuario fue guardado exitosamente.
  * @throws {Error} Si el objeto no cumple con el formato de usuario.
  */
  save(user) {
    this.isUserObject(user);
    return this._conexion.saveRow(user);
  }
  
  /**
  * Actualiza los datos de un usuario existente.
  * @param {Object} user - Objeto con los datos actualizados del usuario.
  * @returns {boolean} - True si el usuario fue actualizado exitosamente.
  * @throws {Error} Si el objeto no cumple con el formato de usuario.
  */
  update(user) {
    this.isUserObject(user);
    return this._conexion.updateRow(user);
  }

  /**
  * Elimina un usuario de la hoja de cálculo.
  * @param {Object} user - Objeto con los datos del usuario a eliminar.
  * @returns {boolean} - True si el usuario fue eliminado exitosamente.
  * @throws {Error} Si el objeto no cumple con el formato de usuario.
  */
  delete(user) {
    this.isUserObject(user);
    return this._conexion.deleteRow(user);
  }
}