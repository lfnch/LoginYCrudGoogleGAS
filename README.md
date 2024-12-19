# CRUD Sencillo - Primera Versión

## Descripción General
Este proyecto es una implementación sencilla de un CRUD (Crear, Leer, Actualizar, Eliminar) utilizando Google Apps Script como tecnología base.

El CRUD está diseñado para interactuar con datos almacenados en hojas de cálculo de Google Sheets. Consiste en varias clases que representan las distintas capas del sistema:

- **`Conexion`**: Maneja la conexión con las hojas de cálculo, proporcionando operaciones generales como obtener encabezados, generar IDs, y realizar las operaciones básicas (insertar, actualizar, eliminar).
- **`User`**: Define el modelo de datos de un usuario, incluyendo validaciones y configuración de propiedades.
- **`UserRepository`**: Proporciona la lógica específica para interactuar con los datos de usuarios en la hoja de cálculo.
- **`UserService`**: Implementa las reglas de negocio para manejar usuarios y orquesta las operaciones entre el repositorio y otras utilidades.
- **`Util`**: Contiene métodos auxiliares reutilizables como conversión de texto, manejo de fechas y cifrado.
- **`Alerts`**: Genera mensajes estandarizados para informar al usuario sobre el estado de las operaciones.

---

## Estructura del Proyecto
1. **Modelo**
   - `User`: Define los atributos de un usuario y sus validaciones.

2. **Capa de Datos**
   - `Conexion`: Maneja las operaciones genéricas con Google Sheets.
   - `UserRepository`: Implementa métodos específicos para la manipulación de datos relacionados con usuarios.

3. **Capa de Negocio**
   - `UserService`: Contiene la lógica principal para la gestión de usuarios, como validar duplicados, manejar credenciales y actualizar el último acceso.

4. **Utilidades**
   - `Util`: Funciones auxiliares para transformaciones comunes (fechas, textos, cifrado MD5).
   - `Alerts`: Mensajes predefinidos para éxito, advertencia, información y error.

---

## Características Implementadas
1. **Crear**:
   - Guardar un nuevo registro en la hoja de cálculo, generando un ID único y validando duplicados.

2. **Leer**:
   - Obtener todos los registros o buscar por campos específicos (ID o documento).

3. **Actualizar**:
   - Modificar registros existentes con validación de campos.

4. **Eliminar**:
   - Borrar un registro mediante su ID.

---

## Limitaciones y Mejoras Futuras
Esta es una versión inicial y simplificada del CRUD. Algunas de las limitaciones actuales incluyen:

1. **Validaciones Básicas**:
   - Las validaciones podrían mejorarse para manejar reglas de negocio más complejas.

2. **Seguridad**:
   - Aunque se utiliza MD5 para el cifrado de contraseñas, este método no es seguro para aplicaciones críticas. Se recomienda usar algoritmos más robustos en futuras versiones.

3. **Eficiencia**:
   - Actualmente, la lectura de datos implica cargar toda la hoja de cálculo en memoria. Para hojas con grandes volúmenes de datos, podría implementarse paginación o búsquedas optimizadas.

4. **Modularidad**:
   - Aunque las clases están separadas por responsabilidades, podrían refactorizarse aún más para mejorar la mantenibilidad y escalabilidad.

5. **Interfaz Gráfica**:
   - Actualmente, las alertas son mensajes de texto. Una futura versión podría integrar una interfaz de usuario más amigable.

---

## Ejemplo de Uso
Un ejemplo básico para guardar un usuario:

```javascript
const document = "123456";
const name = "Juan Perez";
const password = "password123";
const rol = "admin";

const response = UserService.save(document, name, password, rol);
console.log(response);
```

---

## Autor
Desarrollado como una primera versión para aprendizaje y mejora continua.
LUIS FELIPE NIEVES CHAGUENDO
TECNOLOGO EN ANALISIS Y DESARROLLO DE SISTEMAS DE INFORMACION