Param(
    [String] $image
)

Set-Location ../

docker build -t scuadrosf/$image -f Docker/Dockerfile .

docker push scuadrosf/$image

Set-Location ./Docker

docker compose down

docker compose up

