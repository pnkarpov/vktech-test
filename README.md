# Прототип: Регистрация сделки (Pixel Perfect)

Статический прототип экрана из макета:
- левый сайдбар;
- верхняя панель профиля;
- табы и фильтры;
- таблица заявок со статусами.

## Быстрый запуск

```bash
cd /Users/p.karpov/Documents/Codex
python3 -m http.server 8080
```

Откройте в браузере: http://localhost:8080

## Структура

- `/Users/p.karpov/Documents/Codex/index.html` — разметка экрана.
- `/Users/p.karpov/Documents/Codex/styles.css` — стили, размеры, цвета.
- `/Users/p.karpov/Documents/Codex/app.js` — демо-данные таблицы.

## Как вносить правки

- Контент таблицы меняется в массиве `rowsData` в `/Users/p.karpov/Documents/Codex/app.js`.
- Визуальная подгонка под новые скриншоты делается в `/Users/p.karpov/Documents/Codex/styles.css`.
