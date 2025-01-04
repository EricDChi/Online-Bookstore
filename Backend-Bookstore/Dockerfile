# 使用 OpenJDK 22 作为基础镜像
FROM openjdk:22-jdk-slim

# 将本地的 JAR 文件添加到镜像中
COPY target/Backend-Bookstore-0.0.1-SNAPSHOT.jar app.jar

# 暴露 Spring Boot 默认端口（一般是 8080）
EXPOSE 8080

# 启动 Spring Boot 应用
ENTRYPOINT ["java", "-jar", "/app.jar"]
