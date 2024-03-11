Set-Location ../

docker build -t scuadrosf/smilelink:latest -f Docker/Dockerfile .

docker push scuadrosf/smilelink:latest

# Set-Location ./Docker

# docker compose down

# docker compose up

