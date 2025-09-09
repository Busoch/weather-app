# Use a lightweight but compatible Python base
FROM python:3.10-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0

# Set work directory
WORKDIR /app

# Install system dependencies for common Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    musl-dev \
    build-essential \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip & setuptools
RUN pip install --upgrade pip setuptools wheel

# Copy requirements first for caching
COPY ./backend/requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install -r requirements.txt

# Install production server
RUN pip install gunicorn

# Copy project files
COPY . .

# Expose port
EXPOSE 8080

# Run migrations & start Gunicorn
CMD python manage.py makemigrations && \
    python manage.py migrate && \
    gunicorn backend.wsgi:application --bind 0.0.0.0:8080
