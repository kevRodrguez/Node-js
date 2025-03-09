# Carpeta Domain

La carpeta `domain` es el núcleo de la lógica de negocio dentro de la arquitectura limpia. Su propósito es separar las reglas de negocio de detalles de implementación, permitiendo que la aplicación sea modular, escalable y más fácil de probar.

## Propósito

- Definir entidades, objetos de valor y reglas propias del dominio.
- Crear contratos e interfaces (por ejemplo, repositorios) que abstraen el acceso a datos.
- Asegurar que la lógica de negocio se mantenga independiente de detalles tecnológicos o frameworks.

## Funcionamiento

Dentro de `domain`, se organizan archivos y subcarpetas según el contexto del negocio, por ejemplo:

- **Entidades:** Modelos que encapsulan datos y comportamientos centrales.
- **Value Objects:** Representaciones inmutables de conceptos críticos.
- **Interfaces y Repositorios:** Contratos para la interacción con la capa de infraestructura.
- **Casos de Uso:** Funciones o clases que orquestan la ejecución de procesos de negocio.

Esta estructura facilita la evolución de la aplicación, permitiendo que futuras modificaciones en la capa de infraestructura (como bases de datos o frameworks) no afecten la lógica de negocio.
