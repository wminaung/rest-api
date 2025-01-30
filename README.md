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
