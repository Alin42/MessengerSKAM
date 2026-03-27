## Messenger Frontend (React+TS)
### Запуск приложения

`npm run dev`
Компиляция приложения:
`npm run build`
Переход в папку приложения:
`cd ./MessengerSKAM/`
***
## Messenger Backend (Go)
### Запуск
Важно: Запускай строго из корня backend, иначе `.env` не подгрузится.
`go run cmd/server/main.go`

### Настройка (.env)
Создай файл `.env` в корневой папке `backend/`:
```
#DataBase
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=your_host.supabase.co
DB_PORT=5432
DB_NAME=postgres
```
