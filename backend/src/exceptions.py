from fastapi.exceptions import HTTPException


class BadRequest(HTTPException):
    def __init__(self, detail: str):
        super().__init__(400, detail)


class InvalidToken(HTTPException):
    def __init__(self, detail: str):
        super().__init__(401, detail)


class UnAuthorized(HTTPException):
    def __init__(self, detail: str):
        super().__init__(401, detail)


class Forbidden(HTTPException):
    def __init__(self, detail: str):
        super().__init__(403, detail)


class NotFound(HTTPException):
    def __init__(self, detail: str):
        super().__init__(404, detail)


class MethodNotAllowed(HTTPException):
    def __init__(self, detail: str):
        super().__init__(405, detail)


class Conflict(HTTPException):
    def __init__(self, detail: str):
        super().__init__(409, detail)
