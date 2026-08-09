FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PIP_ROOT_USER_ACTION=ignore

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app/

ENV DJANGO_SETTINGS_MODULE config.settings.prod

CMD ["sh", "-c", "python manage.py collectstatic --no-input && python manage.py migrate --no-input && uvicorn config.asgi:application --host 0.0.0.0 --port ${PORT:-8000}"]

