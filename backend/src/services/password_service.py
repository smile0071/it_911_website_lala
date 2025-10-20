import secrets
import string
from passlib.hash import argon2


class PasswordService:
    def __init__(self, length: int = 12):
        self.length = length
        self.alphabet = string.ascii_letters + string.digits + string.punctuation

    def generate_password(self) -> str:
        """Генерация случайного пароля"""
        return ''.join(secrets.choice(self.alphabet) for _ in range(self.length))

    def hash_password(self, password: str) -> str:
        """Хэширование пароля через Argon2"""
        return argon2.hash(password)

    def verify_password(self, password: str, password_hash: str) -> bool:
        """Проверка пароля"""
        return argon2.verify(password, password_hash)

    def generate_and_hash(self) -> tuple[str, str]:
        """
        Сгенерировать пароль и вернуть (plain, hash)
        plain → отправляем пользователю (например, по email)
        hash  → сохраняем в БД
        """
        plain = self.generate_password()
        hashed = self.hash_password(plain)
        return plain, hashed