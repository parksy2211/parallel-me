# 🌌 Parallel Me - 평행우주 시뮬레이터

당신의 인생에서 다른 선택을 했다면? 두 개의 평행우주를 비교하는 웹 애플리케이션입니다.

![Parallel Me](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-cyan)

## ✨ 주요 기능

- **🎯 시나리오 비교**: 두 가지 인생 경로를 설정하고 비교
- **📊 자산 그래프**: 10년간의 자산 변화 추이 시각화
- **❤️ 삶의 질 분석**: 건강과 행복도 지수 측정
- **⚠️ 리스크 평가**: 각 선택의 위험 요소 분석
- **📱 SNS 공유**: 결과를 이미지로 저장하여 공유

## 🛠️ 기술 스택

- **프론트엔드**: React 18 + Vite
- **스타일링**: TailwindCSS
- **애니메이션**: Framer Motion
- **차트**: Recharts
- **라우팅**: React Router DOM
- **이미지 생성**: html2canvas

## 📦 설치 방법

### 1. 저장소 클론 또는 프로젝트 이동

```bash
cd parallel-me
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 열기

## 📁 폴더 구조

```
parallel-me/
├── public/                 # 정적 파일
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   ├── context/           # Context API (상태 관리)
│   │   └── AppContext.jsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── LandingPage.jsx
│   │   ├── ChoicePage.jsx
│   │   ├── ResultPage.jsx
│   │   └── SharePage.jsx
│   ├── utils/             # 유틸리티 함수
│   ├── App.jsx            # 메인 앱 컴포넌트
│   ├── main.jsx           # 엔트리 포인트
│   └── index.css          # 글로벌 스타일
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎮 사용 방법

### 1. 랜딩 페이지
- "시뮬레이션 시작하기" 버튼 클릭

### 2. 선택 입력 페이지
- **시나리오 1**: 현재 또는 기존의 인생 경로 입력
  - 이름, 직업, 거주지, 라이프스타일, 투자 성향 선택
- **시나리오 2**: 대안이 되는 다른 인생 경로 입력

### 3. 결과 페이지
- 📊 자산 변화 그래프 확인
- ❤️ 건강/행복도 지수 비교
- ⚠️ 리스크 분석 확인

### 4. 공유 카드 페이지
- 결과를 이미지로 다운로드
- SNS에 공유

## 🚀 배포 방법

### Vercel 배포

1. [Vercel](https://vercel.com) 계정 생성
2. GitHub에 프로젝트 푸시
3. Vercel 대시보드에서 "New Project" 클릭
4. GitHub 저장소 연결
5. 자동 배포 완료

```bash
# 또는 Vercel CLI 사용
npm install -g vercel
vercel
```

### Netlify 배포

1. [Netlify](https://netlify.com) 계정 생성
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 연결
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy 클릭

### 빌드 파일 생성

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 🎨 커스터마이징

### 색상 변경

[tailwind.config.js](tailwind.config.js)에서 색상 팔레트 수정:

```javascript
colors: {
  primary: {
    500: '#0ea5e9', // 원하는 색상으로 변경
  }
}
```

### 시뮬레이션 로직 변경

[src/context/AppContext.jsx](src/context/AppContext.jsx)의 `generateScenarioData` 함수 수정

## 🔮 확장 아이디어

### 단기 확장 (1-2주)
- ✅ **소셜 로그인**: Google/Facebook 계정으로 로그인
- ✅ **결과 저장**: 로컬스토리지에 이전 시뮬레이션 저장
- ✅ **더 많은 선택지**: 교육 수준, 결혼 여부, 자녀 수 등
- ✅ **통계 대시보드**: 다른 사용자들의 평균 데이터 비교

### 중기 확장 (1-2개월)
- 🚀 **AI 추천**: OpenAI API로 맞춤형 조언 제공
- 🚀 **실시간 데이터**: 실제 경제 지표 연동
- 🚀 **커뮤니티**: 다른 사용자와 결과 공유 및 토론
- 🚀 **모바일 앱**: React Native로 앱 버전 제작

### 장기 확장 (3-6개월)
- 🌟 **게임화**: 포인트, 배지, 리더보드
- 🌟 **구독 모델**: 프리미엄 기능 추가
- 🌟 **전문가 협업**: 재무 설계사, 커리어 코치와 연동
- 🌟 **다국어 지원**: 영어, 중국어, 일본어 버전

## 🐛 문제 해결

### 차트가 표시되지 않을 때
```bash
npm install recharts --save
```

### 애니메이션이 작동하지 않을 때
```bash
npm install framer-motion --save
```

### 이미지 다운로드 오류
```bash
npm install html2canvas --save
```

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여

이슈와 Pull Request를 환영합니다!

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ by Senior Product Designer & Full-stack Developer**

*이 프로젝트는 엔터테인먼트 목적의 시뮬레이션입니다. 실제 재무 결정은 전문가와 상담하세요.*
