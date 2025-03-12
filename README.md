# Deploying the Full Stack Application with Docker Compose

Your project is already well-structured for Docker Compose deployment with all the necessary configuration files in place. Here's how to deploy the entire solution:

## Deployment Steps

1. **Build and start all services**:

   ```bash
   docker-compose up --build -d
   ```

   This command:
   - Builds all the service images (frontend, backend, database)
   - Starts the containers in detached mode

2. **Create a Django superuser** (for admin access):

   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

3. **Access your application**:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:8000/api/
   - API Documentation: http://localhost:8000/api/schema/swagger-ui/
   - Django Admin: http://localhost:8000/admin/

## Additional Docker Compose Commands

- **View running containers**:
  ```bash
  docker-compose ps
  ```

- **View container logs**:
  ```bash
  docker-compose logs -f
  ```
  
- **View logs for a specific service**:
  ```bash
  docker-compose logs -f backend
  ```

- **Stop all containers**:
  ```bash
  docker-compose down
  ```

- **Stop and remove volumes** (will delete database data):
  ```bash
  docker-compose down -v
  ```

## Production Considerations

For production deployment, consider these adjustments:

1. **Update environment variables** in docker-compose.yml:
   - Change `SECRET_KEY` to a secure value
   - Keep `DEBUG=False`
   - Update `ALLOWED_HOSTS` to include your domain

2. **Enable HTTPS**:
   - Add a reverse proxy like Nginx or Traefik
   - Configure SSL certificates

3. **Data persistence**:
   - The PostgreSQL data is already persisted in a volume (`postgres_data`)
   - Consider regular database backups

4. **Automatic restarts**:
   - Add `restart: always` to each service in docker-compose.yml for automatic recovery after server reboots

5. **Scale services** if needed:
   ```bash
   docker-compose up -d --scale backend=3
   ```
   (Note: This would require additional load balancing configuration)

Your Docker configuration is already well-structured for a development environment and provides a solid foundation for production deployment.