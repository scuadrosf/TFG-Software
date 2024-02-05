FROM node:16-alpine as builder

WORKDIR /app/frontend

COPY Frontend/ .

RUN npm install
# RUN npm run build -- --prod --base-href=/new/
RUN npm run build -- --configuration production --base-href=/new/


FROM maven:3-openjdk-17 as backend

WORKDIR /app/backend

COPY Backend/app/pom.xml /.

COPY Backend/app/src ./src

COPY --from=builder /ap/frontend/dist/* ./src/main/resources/static/new

RUN mvn package -DskipTests

FROM openjdk:17

ENV JAVA_TOOL_OPTIONS="-Xss256K -XX:ReservedCodeCacheSize=64M -XX:MaxMetaspaceSize=100000K -Xmx64M"

WORKDIR /app

COPY --from=backend /app/backend/target/*.jar ./app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar" ]