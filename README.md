# Errors that extend general Error

| **Error Class**           | **Status Code** | **Description**                                          |
| ------------------------- | --------------- | -------------------------------------------------------- |
| `BaseError`               | 500             | General error class for unexpected errors.               |
| `NotFoundError`           | 404             | For cases when the requested resource is not found.      |
| `ValidationError`         | 400             | For invalid input or validation errors.                  |
| `UnauthorizedError`       | 401             | For unauthorized access attempts.                        |
| `ForbiddenError`          | 403             | For access to a resource that is forbidden.              |
| `ConflictError`           | 409             | For conflicting requests, such as duplicate resources.   |
| `InternalServerError`     | 500             | For generic internal server issues.                      |
| `BadRequestError`         | 400             | For invalid or malformed requests.                       |
| `NotImplementedError`     | 501             | For actions that are not implemented.                    |
| `ServiceUnavailableError` | 503             | For service outages or temporarily unavailable services. |
