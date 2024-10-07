# Use an official Python runtime as a parent image
FROM python:3.9.4-slim

# Install netcat
RUN apt-get update && \
    apt-get -y install netcat && \
    apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Upgrade pip to the latest version
RUN python -m pip install --upgrade pip

# Install any required packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make the entrypoint.sh script executable
RUN chmod +x /app/entrypoint.sh

# Specify the entrypoint script to run when the container starts
ENTRYPOINT ["/app/entrypoint.sh"]