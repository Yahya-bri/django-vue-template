#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Install any required Python packages
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Create a superuser if it does not exist
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'yahyabrital2020@gmail.com', 'adminpassword123')
"

# Start the backend server
python manage.py runserver 0.0.0.0:8000