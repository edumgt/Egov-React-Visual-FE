## nvm 설치치
## nvm install 18
## nvm use 18
## nvm ls

## npm outdated

## npm start
## serve -s build

## admin2 / 1
## admin / 111111

## SSL 오류
## export NODE_OPTIONS=--openssl-legacy-provid

## npm audit fix --force

## npm run build

## Node.js     | v18.12.0 |
## NPM         | v8.19.2  |

## BackEnd 구동

[심플 홈페이지 Backend](https://github.com/eGovFramework/egovframe-template-simple-backend.git) 소스를 받아 구동한다.

## FrontEnd 구동

# node modules를 설치해 준다.
npm install
```

### 2. 백엔드 프로젝트 설정

구동된 BackEnd 서버의 URL을 본 어플리케이션의 .env.development 파일의 REACT_APP_EGOV_CONTEXT_URL에 설정해 준다.
(단, 개발환경에서는 사용하는 환경변수 정보는 .env.development, build 시 사용하는 환경변수는 .env.production 에 기입해 준다.)

```bash
# .env.development 예시
REACT_APP_EGOV_CONTEXT_URL=localhost:8888
```

##
docker run -it --rm --entrypoint sh egovreactnuclear