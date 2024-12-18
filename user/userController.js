/**
 * UserController
 * --------------------------------------------------------------------------------------
 */

//ObtenerTodos
function userGetAll() {
  return UserService.getAllRecords();
}

//Buscar por id
function userSearch(id) {
  return UserService.findById(id);
}

//Insertar registro
function userSave(document, name, password, rol){
  return UserService.save(document, name, password, rol);
}

//Actualizar registro
function userUpdate(id, document, name, password, rol, active) {
  return UserService.update(id, document, name, password, rol, active);
}

//Eliminar registro
function userDelete(id){
  return UserService.delete(id);
}

//Autenticar
function userAuthenticate(document, password) {
  return UserService.authenticate(document, password);
}