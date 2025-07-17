# Docker는 각 운영 체제별로 설치 지침을 제공합니다.
# 공식 문서는 https://docker.com/get-started/에서 확인하세요.

# Node.js 22-alpine 이미지를 기반으로 합니다.
FROM node:22-alpine

# Node.js와 npm 버전 확인 (빌드 시 출력)
RUN node -v && npm -v
