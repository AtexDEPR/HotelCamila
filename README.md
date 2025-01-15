# Hotel El Rincón de Camila - Sitio Web de Reservas

Este proyecto consiste en el desarrollo de un sitio web sencillo, atractivo y funcional para el Hotel El Rincón de Camila. El objetivo principal es mejorar la visibilidad online del hotel y facilitar la gestión de reservas de habitaciones, ofreciendo una experiencia agradable tanto en dispositivos móviles como en otros dispositivos.

El sitio estará desarrollado utilizando **JavaScript Vanilla**, **HTML** y **TailwindCSS** para asegurar una interfaz visualmente atractiva, rápida y responsiva.

## Requerimientos

El sitio web deberá cumplir con los siguientes requerimientos mínimos:

### 1. Diseño Atractivo y Funcional
- El sitio debe ser visualmente agradable, con un diseño sencillo y moderno que invite a los usuarios a explorar las habitaciones y servicios del hotel.

### 2. Compatibilidad Móvil
- El sitio debe ser optimizado para dispositivos móviles, ya que la mayoría de los clientes accederán desde estos dispositivos.

### 3. Páginas del Sitio
El sitio tendrá 3 páginas principales:
- **Página de inicio (Landing Page)**: Una página atractiva que presentará un carrusel de imágenes de las habitaciones, áreas del hotel y servicios como el restaurante, spa y zonas húmedas.
- **Página de Consultas y Reservas**: Los usuarios podrán consultar la disponibilidad de habitaciones, ingresar sus fechas de estancia y gestionar las reservas.
- **Página de Contacto y Ubicación**: Contendrá la dirección del hotel, un mapa interactivo y múltiples formas de contacto.

### 4. Botón de WhatsApp
- En todas las páginas, se incluirá un botón flotante de WhatsApp que se desplazará verticalmente en el lado inferior izquierdo. Al hacer clic, se abrirá una ventana para comunicarse directamente con el hotel.

### 5. Consulta de Disponibilidad y Gestión de Reservas
- Los usuarios podrán ingresar las fechas de interés y el número de personas para consultar la disponibilidad de las habitaciones.
- El sistema mostrará las habitaciones disponibles con detalles como el precio total, la cantidad de camas y otros servicios como internet, minibar, jacuzzi, entre otros.
- Los usuarios podrán reservar una habitación si están satisfechos con los detalles mostrados.

### 6. Requisitos de Reserva
- Solo los usuarios registrados podrán hacer reservas o cancelar reservas.
- La política de check-in será a las 14:00. Si el usuario no se presenta dentro de las 2 horas (16:00), la habitación se liberará para otros clientes.

### 7. Verificación de Disponibilidad
- Antes de confirmar una reserva, el sistema verificará si la habitación sigue disponible. Si la habitación ya no está disponible, el usuario será notificado.

### 8. Cancelación de Reserva
- El sistema permitirá que los usuarios registrados puedan cancelar sus reservas de forma fácil y ágil.

### 9. Interfaz de Usuario
- La interfaz será sencilla y fácil de usar, especialmente pensada para usuarios de dispositivos móviles.

### 10. Compatibilidad con Otros Dispositivos
- El sitio debe ser igualmente funcional y atractivo en dispositivos de escritorio y tabletas.

### 11. Persistencia de Datos
- Se utilizará **json-server** como servidor para persistir los datos de reservas, usuarios, habitaciones, entre otros.

### 12. Control de Versiones y Despliegue
- El proyecto estará gestionado en **GitHub** para el control de versiones y desplegado en **GitHub Pages** para que sea accesible desde cualquier navegador.

### 13. Funcionalidades Adicionales
- Se podrán agregar otras funcionalidades que mejoren la experiencia del usuario, sin que interfieran con los requisitos principales del proyecto.

---

## Tecnologías Utilizadas

- **JavaScript Vanilla**: Para el desarrollo de la lógica del sistema, como la gestión de reservas, validación de formularios y manejo de datos.
- **HTML5**: Para la estructura y contenido básico de las páginas.
- **TailwindCSS**: Para diseñar una interfaz atractiva, moderna y completamente responsiva.
- **json-server**: Para la creación de un servidor de persistencia de datos local, útil para simular la base de datos en el desarrollo.
- **GitHub**: Para el control de versiones y colaboración en el desarrollo.
- **GitHub Pages**: Para el despliegue del sitio web y hacer que sea accesible públicamente.

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/tuusuario/rincon-del-carmen.git
cd rincon-del-carmen
```

### Ejecutar json-server (Simular la base de datos)

1. Instalar dependencias

```bash
npm install
```

2. Ejecutar el servidor local

```bash
npm run server
```

### Desplegar el sitio en GitHub Pages

1. Asegúrate de tener tu repositorio en GitHub.
2. En el repositorio, ve a la sección **Settings** > **Pages**.
3. Selecciona la rama `main` y la carpeta `/root` para el despliegue.
4. Tu sitio estará disponible en: `https://tuusuario.github.io/rincon-del-carmen`

---

## Estructura del Proyecto

```
rincon-del-carmen/
│
├── public/
│   ├── index.html            # Página de inicio (Landing Page)
│   ├── disponibilidad.html   # Página de consulta y reservas
│   ├── contacto.html         # Página de contacto y ubicación
│   └── assets/               # Archivos de imágenes y otros recursos estáticos
│
├── src/
│   ├── js/                   # Lógica JavaScript del sitio
│   │   └── main.js           # Código principal de la aplicación
│   ├── css/                  # Estilos CSS (Tailwind configurado)
│   └── data/                 # Archivos de datos simulados (JSON)
│
├── .gitignore                # Archivos a excluir del control de versiones
├── package.json              # Configuración de dependencias y scripts
└── README.md                 # Este archivo
```

---

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un pull request desde tu fork al repositorio principal.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulte el archivo LICENSE para más detalles.

---

¡Gracias por visitar el proyecto del **Hotel El Rincón de Camila**!