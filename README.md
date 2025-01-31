### Errors That Extend General Error

| **Error Class**           | **Status Code** | **Description**                                          |
| ------------------------- | --------------- | -------------------------------------------------------- |
| `BaseError`               | 500             | Base class for all custom error classes.                 |
| `NotFoundError`           | 404             | For cases when the requested resource is not found.      |
| `ValidationError`         | 400             | For invalid input or validation errors.                  |
| `UnauthorizedError`       | 401             | For unauthorized access attempts.                        |
| `ForbiddenError`          | 403             | For attempts to access a forbidden resource.             |
| `ConflictError`           | 409             | For conflicting requests, such as duplicate resources.   |
| `InternalServerError`     | 500             | For internal server issues.                              |
| `BadRequestError`         | 400             | For invalid or malformed requests.                       |
| `NotImplementedError`     | 501             | For actions that are not implemented.                    |
| `ServiceUnavailableError` | 503             | For service outages or temporarily unavailable services. |
| `UnexpectedError`         | 500             | For unexpected errors, extending `BaseError`.            |

### Example of `UnexpectedError` Class

```typescript
import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class UnexpectedError extends BaseError {
  constructor(message = "An unexpected error occurred") {
    super(message, 500, ErrorCode.UNEXPECTED_ERROR);
  }
}
```

### **API Endpoints**

| **Model**        | **Endpoint**                  | **HTTP Method** | **Description**                            |
| ---------------- | ----------------------------- | --------------- | ------------------------------------------ |
| **User**         | `/users`                      | `POST`          | Create a user                              |
|                  | `/users`                      | `GET`           | Get all users                              |
|                  | `/users/:id`                  | `GET`           | Get a user by ID                           |
|                  | `/users/:id`                  | `PUT`           | Update a user                              |
|                  | `/users/:id`                  | `DELETE`        | Delete a user                              |
|                  | `/users/:id/posts`            | `GET`           | Get all posts by a user                    |
|                  | `/users/:id/comments`         | `GET`           | Get all comments by a user                 |
|                  | `/users/:id/likes`            | `GET`           | Get all likes by a user                    |
|                  | `/users/:id/followers`        | `GET`           | Get all followers of a user                |
|                  | `/users/:id/following`        | `GET`           | Get all users a user is following          |
|                  | `/users/:id/notifications`    | `GET`           | Get all notifications for a user           |
|                  | `/users/:id/media`            | `GET`           | Get all media uploaded by a user           |
| **Post**         | `/posts`                      | `POST`          | Create a post                              |
|                  | `/posts`                      | `GET`           | Get all posts                              |
|                  | `/posts/:id`                  | `GET`           | Get a post by ID                           |
|                  | `/posts/:id`                  | `PUT`           | Update a post                              |
|                  | `/posts/:id`                  | `DELETE`        | Delete a post                              |
|                  | `/posts/:id/comments`         | `GET`           | Get all comments on a post                 |
|                  | `/posts/:id/likes`            | `GET`           | Get all likes on a post                    |
|                  | `/posts/:id/tags`             | `GET`           | Get all tags for a post                    |
|                  | `/posts/:id/category`         | `GET`           | Get the category of a post                 |
| **Comment**      | `/comments`                   | `POST`          | Create a comment                           |
|                  | `/comments`                   | `GET`           | Get all comments                           |
|                  | `/comments/:id`               | `GET`           | Get a comment by ID                        |
|                  | `/comments/:id`               | `PUT`           | Update a comment                           |
|                  | `/comments/:id`               | `DELETE`        | Delete a comment                           |
|                  | `/comments/:id/likes`         | `GET`           | Get all likes on a comment                 |
| **Like**         | `/likes`                      | `POST`          | Create a like (on a post or comment)       |
|                  | `/likes`                      | `GET`           | Get all likes                              |
|                  | `/likes/:id`                  | `GET`           | Get a like by ID                           |
|                  | `/likes/:id`                  | `DELETE`        | Delete a like                              |
| **Follow**       | `/follows`                    | `POST`          | Follow a user                              |
|                  | `/follows`                    | `GET`           | Get all follows                            |
|                  | `/follows/:id`                | `GET`           | Get a follow by ID                         |
|                  | `/follows/:id`                | `DELETE`        | Unfollow a user                            |
| **Notification** | `/notifications`              | `POST`          | Create a notification                      |
|                  | `/notifications`              | `GET`           | Get all notifications                      |
|                  | `/notifications/:id`          | `GET`           | Get a notification by ID                   |
|                  | `/notifications/:id`          | `PUT`           | Update a notification (e.g., mark as read) |
|                  | `/notifications/:id`          | `DELETE`        | Delete a notification                      |
| **Media**        | `/media`                      | `POST`          | Upload media                               |
|                  | `/media`                      | `GET`           | Get all media                              |
|                  | `/media/:id`                  | `GET`           | Get media by ID                            |
|                  | `/media/:id`                  | `PUT`           | Update media                               |
|                  | `/media/:id`                  | `DELETE`        | Delete media                               |
| **Category**     | `/categories`                 | `POST`          | Create a category                          |
|                  | `/categories`                 | `GET`           | Get all categories                         |
|                  | `/categories/:id`             | `GET`           | Get a category by ID                       |
|                  | `/categories/:id`             | `PUT`           | Update a category                          |
|                  | `/categories/:id`             | `DELETE`        | Delete a category                          |
|                  | `/categories/:id/posts`       | `GET`           | Get all posts in a category                |
| **Tag**          | `/tags`                       | `POST`          | Create a tag                               |
|                  | `/tags`                       | `GET`           | Get all tags                               |
|                  | `/tags/:id`                   | `GET`           | Get a tag by ID                            |
|                  | `/tags/:id`                   | `PUT`           | Update a tag                               |
|                  | `/tags/:id`                   | `DELETE`        | Delete a tag                               |
|                  | `/tags/:id/posts`             | `GET`           | Get all posts with a tag                   |
| **PostTag**      | `/post-tags`                  | `POST`          | Add a tag to a post                        |
|                  | `/post-tags`                  | `GET`           | Get all post-tag relationships             |
|                  | `/post-tags/:id`              | `GET`           | Get a post-tag relationship by ID          |
|                  | `/post-tags/:id`              | `DELETE`        | Remove a tag from a post                   |
| **Search**       | `/posts/search?q=:query`      | `GET`           | Search posts by title or content           |
|                  | `/users/search?q=:query`      | `GET`           | Search users by name or email              |
| **Filter**       | `/posts?category=:categoryId` | `GET`           | Filter posts by category                   |
|                  | `/posts?tag=:tagId`           | `GET`           | Filter posts by tag                        |
