# GiftPick 🎁

GiftPick은 선물을 고르기 어려운 사용자를 위한 AI 선물 추천 서비스입니다.
사용자가 다음 정보를 입력하면 AI가 조건에 맞는 선물을 추천합니다.

- 받는 사람
- 예산
- 관심사
  
추천 결과에는 선물 이름과 추천 이유가 표시되며, 각 상품의 검색어를 이용해 네이버 쇼핑에서 관련 상품을 바로 확인할 수 있습니다.

---

## 🔗 배포 URL
- GitHub 저장소 URL: https://github.com/vlfgl/gift-pick
- Vercel: **[https://gift-pick-lb5z2se36-cwp8.vercel.app/]**


## 🎯 주요 기능

### 1. AI 맞춤 선물 추천

사용자가 입력한 정보를 OpenAI API에 전달하여 맞춤형 선물을 추천합니다.

**입력**
- 받는 사람
- 예산
- 관심사

**출력**
- 추천 결과 제목
- 전체 추천 설명
- 추천 선물 3개
- 각 선물의 추천 이유
- 네이버 쇼핑 검색어

### 2. 네이버 쇼핑 연결

AI가 생성한 검색어를 이용하여 네이버 쇼핑 검색 결과로 이동할 수 있습니다.

각 추천 선물의 **「네이버 쇼핑에서 상품 보기」** 버튼을 클릭하면 해당 상품 검색 결과를 새 탭에서 확인할 수 있습니다.

### 3. 다크모드

상단의 🌙 버튼을 통해 라이트모드와 다크모드를 전환할 수 있습니다.

### 4. 반응형 웹

데스크톱뿐만 아니라 모바일 화면에서도 사용할 수 있도록 반응형으로 구현했습니다.


## 🏗️ 프로젝트 구조

```text
gift-pick/
├── api/
│   └── index.py
├── css/
│   └── style.css
├── js/
│   └── main.js
├── index.html
├── requirements.txt
├── README.md
└── .gitignore
```

| 계층 | 역할 | 분리한 이유 |
|---|---|---|
| HTML | 웹 페이지의 구조와 콘텐츠 구성 | 화면 구조와 디자인 및 동작 로직을 분리하기 위해 |
| CSS | 색상, 크기, 배치, 반응형 등 디자인 담당 | 디자인 수정이 기능 코드에 영향을 주지 않도록 하기 위해 |
| JavaScript | 사용자 입력 처리, API 요청, 결과 화면 출력 | 사용자 동작과 서버 통신 로직을 별도로 관리하기 위해 |
| Python API | OpenAI API 호출 및 서버 측 검증 | API 키를 안전하게 관리하고 AI 처리 로직을 프론트엔드와 분리하기 위해 |

## ⚙️ 기술 스택
Frontend
- HTML
- CSS
- JavaScript
  
Backend
- Python
- Vercel Serverless Functions
  
AI
- OpenAI API
Deployment
- Vercel
- GitHub

## 실행 방법

```bash
git clone [GitHub 저장소 URL]
cd gift-pick
pip install -r requirements.txt
```

## 배포 방법

GitHub 저장소를 Vercel에 연결하고 배포합니다.

GitHub 저장소 연결
OPENAI_API_KEY 환경 변수 설정
Deploy 실행

## 환경 변수 설정

OpenAI API 키는 환경 변수로 관리합니다.
OPENAI_API_KEY=your_openai_api_key
OpenAI API 키를 JavaScript나 GitHub 코드에 직접 넣으면 다른 사람이 키를 볼 수 있어 악의적으로 대량 사용시 과금 문제가 발생한다. 


## 과제 목표
1. 사용자 입력 → JavaScript → 화면 반영
   
  - 사용자가 입력한 값을 JavaScript가 가져와 fetch()로 Python 백엔드에 전달
  - 백엔드에서 받은 AI 결과를 다시 JavaScript가 받아 HTML 화면에 출력한다.

2. Vercel Serverless Functions
   
  - Vercel은 api/index.py를 서버에서 실행할 수 있게 해주는 환경
  -프론트엔드가 /api로 요청하면 Vercel이 Python 함수를 실행하고, Python이 OpenAI API와 통신한 뒤 결과를 프론트엔드에 전달

3. 로컬 환경과 배포 환경

  - 로컬 환경은 내 컴퓨터에서 코드를 테스트하는 환경이고, 배포 환경은 Vercel을 통해 실제 사용자가 접속하는 환경
  - 로컬에서 기능을 확인한 후 GitHub에 변경사항을 반영하면 Vercel이 다시 배포하고, 배포 후 오류가 발생하면 로그를 확인 → 코드 수정 → 다시 배포하는 방식으로 해결


4. API, 백엔드 
   - API: 서로 다른 프로그램이 데이터나 기능을 주고받기 위한 통신 방법
      → 우리 서비스에서는 JavaScript가 Python 백엔드에 선물 정보를 보내고, Python이 AI 결과를 돌려주는 통로.
   - 백엔드: 사용자가 직접 보는 화면 뒤에서 데이터 처리, API 호출, 인증 등의 작업을 담당하는 부분.
    → 우리 서비스에서는 api/index.py가 백엔드 역할을 하고 OpenAI API를 호출함.
