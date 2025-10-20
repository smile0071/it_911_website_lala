from sqlalchemy import Select


class BaseFilter:
    def apply(self, stmt: Select):
        raise NotImplementedError()
