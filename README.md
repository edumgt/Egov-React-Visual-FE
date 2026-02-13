# Egov React Visual

전자정부프레임워크 샘플 홈페이지 Frontend(React) 프로젝트입니다. 이 문서는 **이 저장소의 실제 구성 파일 기준**으로 기술 스택을 상세하게 정리합니다.

---

## 1) 핵심 기술 스택

### 런타임 / 언어
- **Node.js 18 계열 권장** (로컬 개발 가이드 기준)
- **npm 8 계열**
- **JavaScript (ES6+) + JSX**

### 프론트엔드 프레임워크
- **React 18** (`react`, `react-dom`)
- **Create React App 기반 빌드 체계** (`react-scripts`)
- **React Router v6** (`react-router-dom`) 기반 라우팅

### UI / 스타일링
- **MUI(Material UI)**: `@mui/material`, `@mui/x-data-grid`
- **Emotion**: `@emotion/react`, `@emotion/styled`
- **styled-components**
- 프로젝트 자체 CSS: `src/css/base.css`, `layout.css`, `component.css`, `page.css`, `response.css`

### 데이터 통신 / 유틸
- **axios** 기반 API 통신
- **qs** (쿼리스트링 처리)
- **nanoid** (고유 ID 생성)

### 시각화 / 사용자 기능 라이브러리
- **ApexCharts**: `apexcharts`, `react-apexcharts`
- **Google Charts**: `react-google-charts`
- **Pie Chart**: `react-minimal-pie-chart`
- **Date Picker**: `react-datepicker`
- **Modal**: `react-modal`, `react-modal-image`
- **Toast 알림**: `react-toastify`
- **Excel 처리**: `xlsx`
- **아이콘**: Font Awesome React 바인딩

### 테스트
- CRA 기본 테스트 스택
  - `@testing-library/react`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`

---

## 2) 애플리케이션 구조

- `src/pages`: 도메인별 화면(about/intro/inform/support/admin/login/main)
- `src/components`: 재사용 UI 컴포넌트
- `src/routes/index.jsx`: 라우트 정의
- `src/api/egovFetch.js`: API 호출 유틸
- `src/config/index.js`, `src/constants/*`: 환경/상수 관리
- `src/utils/*`: 공통 유틸리티

즉, **페이지 단위 + 공통 컴포넌트 + API/유틸 분리형 구조**를 따릅니다.

---

## 3) 빌드/실행 스크립트

`package.json` 기준:

- `npm start`: 개발 서버 실행  
  (`react-scripts --openssl-legacy-provider start`)
- `npm run build`: 프로덕션 빌드  
  (`react-scripts --openssl-legacy-provider build`)
- `npm test`: 테스트 실행
- `npm run eject`: CRA 설정 추출

> OpenSSL 호환 이슈를 고려해 `--openssl-legacy-provider` 옵션을 사용합니다.

---

## 4) 배포/인프라 스택

### 컨테이너
- `Dockerfile` 존재 (Node 기반 이미지 확인용)
- 실제 서비스 정적 서빙은 **Nginx 기반 구성**을 사용

### 웹서버
- `nginx.conf`에서:
  - `/health` 헬스체크 엔드포인트 제공
  - `try_files $uri /index.html;`로 SPA 라우팅 지원

### CI/CD
- AWS CodeBuild 스펙 파일:
  - `buildspec-init.yml`
  - `buildspec-build.yml`
  - `buildspec.yml`
- 파이프라인 시나리오(파일 내용 기준):
  1. React 빌드 산출물 생성
  2. Nginx 이미지 빌드
  3. Amazon ECR 푸시
  4. EC2/AMI/Launch Template/ASG/ALB 구성 자동화

즉, 이 저장소는 **프론트 React 앱 + Nginx 정적 배포 + AWS 인프라 자동화(CodeBuild 중심)** 조합의 기술 스택을 갖습니다.

---

## 5) 백엔드 연동

이 프로젝트는 eGovFramework 샘플 백엔드와 연동하도록 설계되어 있습니다.


- 백엔드 저장소:  
  https://github.com/edumgt/Egov-Spring-Visual-BE


개발 환경에서는 `.env.development`의 API 서버 주소를 사용하고,
배포 빌드는 `.env.production` 값을 사용합니다.

예시:

```bash
REACT_APP_EGOV_CONTEXT_URL=localhost:8888
```

또한 `package.json`에는 로컬 프록시(`http://localhost:8888`)가 설정되어 있습니다.

---

## 6) 로컬 실행 빠른 시작

```bash
npm install
npm start
```

프로덕션 확인:

```bash
npm run build
serve -s build
```

---

## 7) 한 줄 요약

이 레포는 **React 18 + CRA + MUI/Emotion + Chart/Excel 생태계**를 중심으로 구성된 SPA이며,
**Nginx 정적 서빙과 AWS(CodeBuild/ECR/EC2/ASG/ALB) 자동 배포**까지 고려한 프론트엔드 프로젝트입니다.
