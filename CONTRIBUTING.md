# Guía de Contribución

¡Gracias por tu interés en contribuir a Markdown Links Hub! 🎉

## Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado ya
2. Abre un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs. actual
   - Screenshots si aplica
   - Versión de Node.js y navegador

### Proponer Nuevas Funcionalidades

1. Abre un issue de "Feature Request"
2. Describe claramente:
   - El problema que resuelve
   - Cómo lo usarías
   - Ejemplos de uso

### Pull Requests

1. Fork el repositorio
2. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/mi-funcionalidad
   ```
3. Realiza tus cambios siguiendo las convenciones del código
4. Agrega tests si aplica
5. Verifica que los tests pasen:
   ```bash
   npm test
   ```
6. Commit con mensajes descriptivos:
   ```bash
   git commit -m "feat: agrega nuevo tema retro"
   ```
7. Push a tu fork:
   ```bash
   git push origin feature/mi-funcionalidad
   ```
8. Abre un Pull Request

## Convenciones de Código

- **TypeScript**: Todo el código debe estar tipado
- **Formato**: Usa los estilos de Prettier (ejecuta `npm run format` si está configurado)
- **Lint**: Asegúrate que no haya errores de ESLint
- **Componentes**: Un componente por archivo
- **Nombres**: camelCase para variables, PascalCase para componentes

## Estructura de Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan lógica)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

## Tests

Todos los cambios que afecten lógica deben incluir tests:

```bash
# Ejecutar tests
npm test

# Ejecutar tests en watch mode
npm run test:watch
```

## Licencia

Al contribuir, aceptas que tus contribuciones estarán bajo la misma licencia MIT del proyecto.
