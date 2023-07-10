## Authentication

### Signup user
`/api/users/signup` - `POST`

Request body example:
```json
{
	"name": "John",
	"email": "email@email.com",
	"password": "secret",
	"passwordConfirm": "secret"
}
```

### Login user
`/api/users/login` - `POST`

Request body example:
```json
{
	"email": "email@email.com",
	"password": "secret"
}
```

---
## Users Features

### Admin role
- Get all users -> `/api/users` - `GET` => all users _(sort, pagination, limit)_
- Get user -> `/api/users/:id` - `GET` => user by provided ID
- Delete user -> `/api/users/:id` - `DELETE` => null
- Update user -> `/api/users/:id` - `PATCH` => updated user doc _(updating runs revalidation)_
### User role
_todo_
***
## Notes features

_todo_
