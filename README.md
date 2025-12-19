## 📱 REACT NATIVE 커뮤니티 10012 – Frontend

**주제**: React Native 기반 커뮤니티 앱 (Expo Router, Firebase)

### 👤 개발 인원

- 김민석 (개인 프로젝트)

---

## 🚀 시작하기

### 1. 사전 요구사항

- **Node.js 20+**
- **npm** (또는 pnpm/yarn)
- **Expo CLI** (선택) – `npx`로도 충분히 동작합니다.
- (안드로이드 테스트용) Android Studio 또는 USB 디버깅 가능한 안드로이드 기기

### 2. 프로젝트 클론

git clone https://github.com/nas7062/REACT_NAVITE-.git .
cd community
### 3. 의존성 설치
npm install
### 4. 개발 서버 실행
npx expo start- Android 에뮬 또는 실기기: DevTools에서 **“Run on Android device/emulator”** 선택
- Web(개발용): `w` 키를 눌러 웹 브라우저에서 실행

> 주의: 네이티브 모듈(AsyncStorage 등)을 새로 추가한 경우에는 `npx expo run:android` 로 한 번 빌드/설치를 해야 합니다.

---

## 💡 국제화(i18n) 동작 방식

- **기본 언어는 항상 한국어(ko)** 입니다.
- 설정 화면의 “언어 설정”에서 **English / 한국어** 를 선택하면,  
  **현재 실행 중인 세션에서만** 언어가 변경됩니다.
- 앱을 완전히 종료한 후 다시 실행하면 **다시 한국어로 초기화**됩니다.  
  (언어 선택을 로컬 스토리지에 따로 저장하지 않습니다.)

---

## 💻 개발 가이드

### Path Alias 시스템

TypeScript path alias를 사용하여 깔끔한 import를 지원합니다.

`tsconfig.json`(발췌):

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}**사용 예시**:

// ❌ 상대 경로 (복잡함)
import FeedList from "../../../components/FeedList";

// ✅ Path Alias (권장)
import FeedList from "@/components/FeedList";### 스타일 가이드

- `react-native` 의 **`StyleSheet.create`** 를 사용
- 공통 색상은 `constants`에서 관리 (`colors`)

---

## 🛠 기술 스택

### Core

- **React** 19
- **React Native** 0.81 (Expo 기반)
- **Expo** 54
- **Expo Router** 6 (파일 기반 라우팅)

### 상태 관리 · 서버 상태

- **TanStack React Query** (`@tanstack/react-query`, Devtools 포함)
- **React Hook Form** (`react-hook-form`)
- **Zod** – 폼 및 데이터 스키마/검증

### 백엔드 · 데이터

- **Firebase**
  - JS SDK (`firebase`)
  - React Native Firebase
    - `@react-native-firebase/app`
    - `@react-native-firebase/auth`
    - `@react-native-firebase/firestore`

### UI · UX

- **Expo Image / Image Picker** (`expo-image`, `expo-image-picker`)
- **Expo Linear Gradient** (`expo-linear-gradient`)
- **Expo Vector Icons** (`@expo/vector-icons`)
- **React Native Toast Message** (`react-native-toast-message`)
- **Keyboard Aware Scroll View** (`react-native-keyboard-aware-scroll-view`)

### 유틸리티

- **Day.js** – 날짜/시간 처리
- **UUID** (`uuid`)
- **React Native Worklets** (`react-native-worklets`)

### 웹 대응

- **React Native Web** (`react-native-web`)
- **React DOM** (`react-dom`)

### 개발 도구

- **TypeScript** 5
- **ESLint + eslint-config-expo**
- **React Query Devtools** (`@tanstack/react-query-devtools`)
- **@types/react**, **@types/react-native**

---

## ✨ 주요 기능

### 1. 인증(Authentication)

- **Firebase Authentication**
  - 이메일·비밀번호 회원가입 및 로그인
  - 로그인 상태 유지 및 자동 세션 관리

### 2. 커뮤니티 기능

- **게시글 CRUD**
  - 게시글 생성(Create)
  - 게시글 조회(Read) – 목록 & 상세
  - 게시글 수정(Update)
  - 게시글 삭제(Delete)

- **무한 스크롤 목록**
  - `FlatList` + React Query `useInfiniteQuery` 를 활용한 무한 스크롤
  - 스크롤 하단 도달 시 다음 페이지 자동 로드
  - Firestore 커서 기반 페이징

- **이미지 첨부**
  - Expo Image Picker로 이미지 업로드
  - 게시글 내 이미지 미리보기 / 전체 보기

- **댓글 및 대댓글(계층형 댓글)**
  - Firestore에 댓글/대댓글 저장
  - 특정 댓글에 대한 대댓글 작성
  - 댓글 삭제 기능

- **좋아요(Like)**
  - 게시글 좋아요/좋아요 취소
  - Firestore에서 사용자별 좋아요 상태 관리
  - “좋아요 한 게시물” 탭에서 내가 좋아요한 글 목록 조회

### 3. 프로필 기능

- **내 정보 조회**
  - 닉네임, 프로필 이미지, 자기소개 등 표시

- **내 활동 피드**
  - 내가 작성한 게시글 목록
  - 내가 좋아요한 게시글 목록 (탭 전환으로 구분)

- **프로필 편집**
  - 프로필 이미지 / 닉네임 / 소개 수정

---

## 📂 주요 폴더 구조
```
community/
├─ app/                         # Expo Router 기반 화면 구조
│  ├─ (app)/                    # 인증 이후 메인 앱 영역
│  │  ├─ _layout.tsx             # 전체 앱 스택 설정 및 i18n 초기화
│  │  ├─ (tabs)/                 # 하단 탭 네비게이션
│  │  │  ├─ _layout.tsx          # Tab Navigator 설정
│  │  │  ├─ index.tsx            # 홈 화면
│  │  │  ├─ my/                  # 내 프로필 관련 스택
│  │  │  └─ setting/             # 설정 화면 스택
│  │  ├─ auth/                   # 로그인 / 회원가입 플로우
│  │  ├─ post/                   # 게시글 작성·상세·수정 화면
│  │  ├─ profile/                # 다른 사용자 프로필 화면
│  │  └─ image/                  # 이미지 전체 보기 화면
│  │
│  ├─ components/                # 공통 UI 컴포넌트
│  │  └─ (Feed, ListItem 등)
│  │
│  ├─ hooks/                     # 커스텀 훅
│  │  └─ (React Query 래퍼, 비즈니스 로직)
│  │
│  ├─ api/                       # Firestore API 레이어
│  │  └─ (CRUD, 네트워크 로직 분리)
│  │
│  ├─ context/                   # 전역 상태 관리
│  │  └─ AuthContext 등
│  │
│  ├─ util/                      # 유틸리티 함수
│  │  └─ i18n, localization 등
│  │
│  ├─ constants/                 # 상수 정의
│  │  └─ colors, config 등
│  │
│  └─ types/                     # TypeScript 타입 정의
│
├─ assets/                       # 이미지, 폰트 등 정적 리소스
├─ app.json
├─ package.json
└─ README.md
```

## ✅ 개발 시 유의 사항

- **언어 설정**
  - i18n은 항상 한국어로 초기화됩니다.
  - 설정 화면에서 언어를 바꾸더라도 **앱 재시작 시 한국어로 리셋**됩니다.

- **Firebase 설정**
  - `firebase.ts`, `google-services.json` 등에 본인 프로젝트 키를 설정해야 합니다.
  - repo에 포함된 설정은 예시/개발용일 수 있으므로, 실제 서비스용 프로젝트에서는 교체가 필요합니다.

---

필요하면 “프로젝트 소개(왜 만들었는지 / 주요 화면 스크린샷)” 섹션만 위쪽에 하나 더 추가하시면 README는 거의 완성입니다.  
원하시면 스크린샷 섹션용 마크다운 템플릿도 따로 만들어 드릴게요.
