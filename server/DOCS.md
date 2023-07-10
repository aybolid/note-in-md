## Authentication

### Signup user

`http://localhost:8080/api/users/signup`
Request body example:

```json
{
  "name": "John",
  "email": "email@email.com",
  "password": "secret",
  "passwordConfirm": "secret"
}
```

## Login user

`http://localhost:8080/api/users/login`
Request body example:

```json
{
  "email": "email@email.com",
  "password": "secret"
}
```
