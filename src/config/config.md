# Función de la Carpeta config en una Arquitectura Limpia

En un proyecto de npm con TypeScript que sigue los principios de la Arquitectura Limpia, la carpeta `config` juega un papel fundamental en la gestión de la configuración global del proyecto. A continuación se explica su finalidad y contenido:

## 1. Separación de Responsabilidades

- **Centralización de Configuración:**  
  La carpeta `config` centraliza todos los parámetros de configuración, facilitando la gestión de diferentes entornos (desarrollo, pruebas, producción) y evitando la dispersión de "magia" (hardcoded values) a través del código.

- **Independencia de Capas:**  
  Según la Arquitectura Limpia, la lógica de negocio o dominio no debe conocer los detalles de configuración de infraestructura o herramientas externas. Al tener un módulo centralizado de configuración, se reduce el acoplamiento entre capas.

## 2. Contenido Común en la Carpeta config

Dentro de la carpeta `config` es común encontrar archivos y subdirectorios con la siguiente finalidad:

- **Archivos de Configuración de Entorno:**  
  Archivos como `development.ts`, `production.ts` o incluso archivos JSON para especificar variables de entorno, base de datos, APIs, etc.

- **Configuraciones de Dependencias e Integraciones:**  
  Archivos que configuran la conexión a sistemas externos como bases de datos, servicios de autenticación, colas de mensajes, etc. Esto permite modificar las integraciones sin afectar la lógica central del negocio.

- **Configuración de Logger y Otros Servicios:**  
  Es posible incluir configuraciones para sistemas de logging, manejo de errores y otros servicios de infraestructura que se utilicen en distintas capas.

