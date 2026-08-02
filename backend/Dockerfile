# Multi-stage Dockerfile to build and run the API module
FROM maven:3.10.1-jdk-21 AS build
WORKDIR /workspace
COPY . /workspace
# Build only the api module and its dependencies
RUN mvn -T 1C -f pom.xml -pl api -am -DskipTests package

FROM eclipse-temurin:21-jre
ARG JAR_FILE=/workspace/api/target/api-0.1.0-SNAPSHOT.jar
COPY --from=build ${JAR_FILE} /app/app.jar
ENV JAVA_OPTS="-Xms256m -Xmx512m"
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
