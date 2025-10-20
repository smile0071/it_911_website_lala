FROM python:3.11.9-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Указываем рабочую директорию src, где находится main.py
WORKDIR /app/src

CMD ["python", "main.py"]