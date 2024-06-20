# Buscador de medicamentos - Jaraxa Software

## Descripción

El proyecto consiste en un buscador de medicamentos aprobados en EEUU que utiliza la API de openFDA para realizar consultas. La aplicación ha sido desarrollada utilizando Vite y React, junto con la biblioteca de componentes Material-UI.

He utilizado el endpoint `/drugsfda` para la búsqueda general de medicamentos y, una vez obtenido su número de aplicación, he realizado una búsqueda en el resto de endpoints para obtener la máxima información posible sobre dicho medicamento.

## Instalación

1. **Clonar el repositorio y acceder a su carpeta:**

   ```bash
   git clone https://github.com/ClaraMars/Jaraxa_Software.git
   cd jaraxa-software
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

## Funcionalidades

- **Búsqueda general:** el buscador devuelve los resultados que contienen la palabra introducida. Si se introducen varias palabras, devuelve los resultados que contengan cada una de ellas.
- **Filtros de búsqueda:** se puede realizar una búsqueda más específica añadiendo uno de los siguientes filtros:

  - Número de aplicación
  - Nombre del fabricante
  - Nombre del patrocinador
  - Nombre de marca del medicamento
  - Nombre genérico del medicamento

- **Modificación del número de resultados:** también permite al usuario especificar cuántos resultados desea mostrar.
- **Enlaces rápidos:** he añadido unos enlaces predefinidos de búsqueda directas que me han sido útil durante el desarrollo de la prueba.
- **Resetear búsqueda:** para volver a realizar una búsqueda es encesario pulsar el botón de "Resetear" para limpiar los filtros añadidos.
- **Carga incremental de resultados:** para mostrar todos los resultados he implementado un botón "Mostrar más resultados" que permite cargar más resultados a medida que el usuario lo solicita.
- **Detalles del medicamento:** para visualizar la información de un medicamento pulsa el botón "Ver más". Se mostrará en una nueva ruta la información detallada del medicamento seleccionado, con su información correspondiente para los endpoints de `/ndc`, `/label`, `/event` y `/enforcement`.
- **Volver a la página de inicio:** para volver al buscador he implementado el enlace de "Volver".
