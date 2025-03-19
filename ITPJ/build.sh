pip install -r requirements.txt

python manage.py collectstatic --noinput
find . -path "*/migrations/*.pyc" -delete
python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser --noinput || true