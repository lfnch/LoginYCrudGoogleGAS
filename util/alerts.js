/**
* Alerts
* --------------------------------------------------------------------------------------
* Clase para generar mensajes de alerta estandarizados con diferentes niveles de severidad.
* Los métodos devuelven objetos que contienen el tipo de alerta y un mensaje personalizado.
*/
class Alerts {
  static getSucces(message = 'Operación completada con éxito!') { 
    return { type: 'success', message: message };
  }

  static getWarnig(message = 'Error al realizar la operacion intenete de nuevo!') { 
    return { type: 'warning', message: message };
  }

  static getInfo(message = 'Realizando la operacion espere!') { 
    return { type: 'info', message: message };
  }

  static getError(message = 'Hubo un problema intente de nuevo!') { 
    return { type: 'error', message: message };
  }
}