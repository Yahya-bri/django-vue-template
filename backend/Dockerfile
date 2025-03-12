FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBUG=False

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create a non-root user and switch to it
RUN adduser --disabled-password --gecos '' django

# Create staticfiles directory with proper permissions
RUN mkdir -p /app/staticfiles
RUN chown -R django:django /app
RUN chmod -R 755 /app/staticfiles

USER django

# Expose port
EXPOSE 8000

# Run gunicorn
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --no-input && gunicorn --bind 0.0.0.0:8000 config.wsgi"]
