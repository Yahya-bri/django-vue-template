# Suggested code may be subject to a license. Learn more: ~LicenseLog:2506518960.
# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
source .venv/bin/activate
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver