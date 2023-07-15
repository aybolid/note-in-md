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

Validation:

1. Provide all required fields
2. Provide a valid email
3. Password must be at least 6 characters long
4. Passwords do not match
5. User with this email already exists

### Login user

`/api/users/login` - `POST`

Request body example:

```json
{
  "email": "email@email.com",
  "password": "secret"
}
```

Validation:

1. Provide all required fields
2. User with this email does not exist
3. Wrong password

### Login user with token (JWT)

`/api/users/login/token` - `GET`

Requires Authorization Bearer with JWT token inside

---

## Users Features

### Admin role

- Get all users -> `/api/users` - `GET` => all users _(sort, pagination + limit)_
- Get user -> `/api/users/:id` - `GET` => user by provided ID
- Delete user -> `/api/users/:id` - `DELETE` => null _(deletes user related notes)_
- Update user -> `/api/users/:id` - `PATCH` => updated user doc _(updating runs revalidation)_

### User role

_todo_

_User must be authorized for those actions (use BEARER with JWT)_

---

## Notes features

- Create new note -> `/api/notes/create` - `POST`

```json
{
  "title": "New Note",
  "content": "## Content in MD"
}
```

- Update my note -> `/api/notes/update-my` - `PATCH` => updated note

```json
{
  "title": "Updated Title",
  "content": "## New content in MD"
}
```

- Get my **all** -> `/api/notes/get-my` - `GET` => all user notes
- Get my **one** -> `/api/notes/get-my/:id` - `GET` => one user note
- Delete my -> `/api/note/delete-my/:id` - `DELETE`

_User must be authorized for those actions (use BEARER with JWT)_

---

## Sort, Pagination + Limit, Limit Fields

Some API routes let you use queries. For example - `/api/users`:

- sort -> `/api/users?sort=name,email` => users sorted A-Z
- pagination + limit -> `/api/users?page=2&limit=10` => 2 page with 10 users or less
- limit fields -> `/api/users?fields=name,email` => users docs but only with name and email field inside
