Set-Location ../

docker build -t scuadrosf/smilelink:v1 -f Docker/Dockerfile .

docker push scuadrosf/smilelink:v1

# Set-Location ./Docker

# docker compose down

# docker compose up

