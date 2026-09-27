# GiftPick 서비스 기획서

## 1. 서비스 목적

**GiftPick**은 받는 사람, 예산, 관심사를 입력하면 AI가 조건에 맞는 선물을 추천해주는 서비스이다.

추천 결과와 함께 네이버 쇼핑 검색 기능을 제공하여 사용자가 추천 상품을 쉽게 확인할 수 있도록 한다.



## 2. 타겟 사용자

- 선물을 고르는 데 어려움을 느끼는 사용자
- 상대방의 취향에 맞는 선물을 찾고 싶은 사용자
- 정해진 예산에 맞는 선물을 찾는 사용자
- 선물 검색에 소요되는 시간을 줄이고 싶은 사용자



## 3. 페이지 구성

<img width="470" height="379" alt="image" src="https://github.com/user-attachments/assets/257be4dc-f458-4ab1-bb9f-c91ae282ace2" />
<img width="467" height="469" alt="image" src="https://github.com/user-attachments/assets/3d4785e3-e369-435e-aeea-e9989fb43812" />

.

<img width="292" height="633" alt="IMG_8136" src="https://github.com/user-attachments/assets/64bf0b16-5526-4f90-b2bb-65b2c3d7033e" />
<img width="292" height="633" alt="IMG_8137" src="https://github.com/user-attachments/assets/5f2da23d-b2b4-4b31-ac6b-08281ee274ab" />
<img width="292" height="633" alt="IMG_8141" src="https://github.com/user-attachments/assets/a8da4717-9b0c-499a-97ac-79d5b0e58e67" />





### 3.1 홈

- 서비스 소개
- AI 추천 기능 안내
- AI 추천 페이지로 이동

### 3.2 AI 추천

- 받는 사람 입력
- 예산 입력
- 관심사 입력
- AI 선물 추천 결과 출력
- 네이버 쇼핑 검색 연결

### 3.3 선물 꿀팁

- 선물 선택에 도움이 되는 정보 제공
- 상황과 대상에 따른 선물 선택 팁 제공

### 공통 기능

- 반응형 웹
- 다크모드
- 상단 메뉴를 통한 섹션 이동

---

## 4. 핵심 기능

| 기능 | 설명 |
|---|---|
| AI 선물 추천 | 입력한 조건을 바탕으로 선물 3개 추천 |
| 맞춤형 추천 | 받는 사람, 예산, 관심사를 추천에 반영 |
| 추천 이유 제공 | 각 선물을 추천한 이유 표시 |
| 네이버 쇼핑 연결 | 추천 상품의 검색어를 이용해 네이버 쇼핑으로 이동 |
| 입력값 검증 | 필수 입력값이 없을 경우 안내 메시지 표시 |
| 오류 처리 | API 및 AI 응답 오류 발생 시 오류 메시지 표시 |
| 다크모드 | 라이트모드와 다크모드 전환 |
| 반응형 UI | 데스크톱과 모바일 환경 지원 |

---

## 5. AI 기능

### 5.1 입력

사용자가 다음 정보를 입력한다.

- 받는 사람
- 예산
- 관심사

### 5.2 처리

입력된 정보를 Python 백엔드에서 OpenAI API로 전달한다.

AI는 입력 조건을 바탕으로 선물 3개를 추천하고, 각 선물의 추천 이유와 네이버 쇼핑 검색어를 생성한다.

### 5.3 출력

- 추천 결과 제목
- 전체 추천 설명
- 추천 선물 3개
- 각 선물의 추천 이유
- 각 선물의 네이버 쇼핑 검색어

---

## 6. AI 기능 실패 처리

### 입력값 누락

받는 사람, 예산, 관심사 중 하나라도 입력하지 않은 경우 AI 요청을 보내지 않고 입력 안내 메시지를 표시한다.

### API 통신 오류

OpenAI API 또는 서버 통신 과정에서 오류가 발생하면 사용자에게 오류 메시지를 표시한다.

### AI 응답 처리 오류

AI가 지정된 JSON 형식으로 응답하지 못한 경우 응답 처리 오류로 판단하고 오류 메시지를 표시한다.

---

## 7. 서비스 이용 흐름

```text
사용자 접속
    ↓
받는 사람 / 예산 / 관심사 입력
    ↓
AI 추천 요청
    ↓
Python 백엔드
    ↓
OpenAI API
    ↓
선물 추천 결과 생성
    ↓
추천 결과 화면 출력
    ↓
네이버 쇼핑 상품 검색
```
## 8. AI 응답 지연 개선 방안

AI 응답 지연을 줄이기 위해 다음 방법을 적용할 수 있다.

- **캐시**: 동일한 입력에 대한 기존 결과를 저장하여 API 재호출을 줄인다.
- **경량 모델**: 추천 기능에 적합한 빠른 모델을 사용하여 응답 시간을 단축한다.
- **출력 간소화**: 필요한 정보만 생성하도록 프롬프트와 출력 내용을 제한한다.

현재는 로딩 UI를 제공하여 AI 요청이 처리되는 동안 사용자에게 진행 상태를 안내하며, 캐시와 경량 모델은 향후 개선 사항으로 검토한다.

## 9. 보안 및 향후 확장

### 기능 확장

향후 사용자별 추천 기록, 추천 결과 저장, 상품 정보 연동 등의 기능으로 확장할 수 있다.

### API 키 유출 대응

API 키가 유출된 경우 해당 키를 즉시 폐기하고 새로운 키를 발급한다. 이후 GitHub 등 공개 저장소에 키가 포함되었는지 확인하고 환경 변수를 새로운 키로 변경한다.

### 프레임워크 변경 시 영향

현재는 Vanilla HTML/CSS/JavaScript와 Vercel Python Serverless Functions를 사용한다. 향후 React 등의 프레임워크로 변경할 경우 프론트엔드 구조와 빌드 설정을 수정해야 하며, Python API와의 통신 방식은 유지할 수 있다.


## 10. 실패 처리 중 사용자에게 안내 메시지 제공
① 빈 입력 처리 ✅

```text
function validateInput(recipient, budget, interest) {
    if (!recipient || !budget || !interest) {
        errorText.textContent =
            "받는 사람, 예산, 관심사를 모두 입력해주세요.";
        showOnly(errorMessage);
        return false;
    }
    return true;
}
```
필수값이 비어 있으면 사용자에게 안내 메시지를 보여줌.

② API 오류 처리 ✅
```text
if (!response.ok) {
    throw new Error(
        `API request failed: ${response.status}`
    );
}

그리고 오류가 발생하면:

catch (error) {
    console.error("Recommendation API error:", error);
    errorText.textContent =
        "서버와 통신하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
    showOnly(errorMessage);
}
```

## 11.입력값 검증 정책

### 길이 제한

- 받는 사람 / 예산 / 관심사: 최대 100자

## AI 코딩 도구 사용 증빙

- 개발자 모드 F12로 에러 확인 
     <p> <img width="554" height="336" alt="image" src="https://github.com/user-attachments/assets/6ab92582-b5d7-4680-b0fa-5ee805be5c8a" /></p>
     오류번호를 전송하였으나 제대로 잡아내지 못함


- Vercel Deployments 기록 확인
    <img width="1903" height="934" alt="image" src="https://github.com/user-attachments/assets/4d0fba3b-0abf-44e2-9e75-e891a29a30cc" />


- Deploy logs 확인
    <img width="1592" height="928" alt="image" src="https://github.com/user-attachments/assets/18e04c57-eab5-4d0d-b961-795b5f4f5403" />
    웹페이지에 'Error response Error code: 501 Message: Unsupported method ('GET'). Error code explanation: 501 - Server does not support this operation.' 확인


- Build & Settings 확인
  
  <img width="820" height="694" alt="image" src="https://github.com/user-attachments/assets/f8dc04f0-151f-40f4-96bc-805593f94771" />

  <img width="844" height="784" alt="image" src="https://github.com/user-attachments/assets/1c80fa0e-fd99-48e6-85e0-8e1f6ab3df33" />

  드롭다운에서 python -> other 변경: Python 웹 프레임워크 프로젝트가 아니라 HTML + CSS + JS 정적 프론트 + api/index.py Python API 구조이기 때문.
   빌드가 필요 없는 HTML/CSS/JS 프로젝트는 Framework Preset을 Other로 선택하고, 루트 디렉터리의 파일을 그대로 서비스할 수 있다


1. 사용자 입력 → JavaScript → 화면 반영

사용자가 입력한 값을 JavaScript가 가져와 fetch()로 Python 백엔드에 전달한다. 백엔드에서 받은 AI 결과를 다시 JavaScript가 받아 HTML 화면에 출력한다.

2. Vercel Serverless Functions

Vercel은 api/index.py를 서버에서 실행할 수 있게 해주는 환경이다. 프론트엔드가 /api로 요청하면 Vercel이 Python 함수를 실행하고, Python이 OpenAI API와 통신한 뒤 결과를 프론트엔드에 전달한다.

3. 환경 변수와 API 키

OpenAI API 키를 JavaScript나 GitHub 코드에 직접 넣으면 다른 사람이 키를 볼 수 있다. 따라서 Vercel 환경 변수에 API 키를 저장하고 Python에서 가져와 사용한다.

4. 로컬 환경과 배포 환경

로컬 환경은 내 컴퓨터에서 코드를 테스트하는 환경이고, 배포 환경은 Vercel을 통해 실제 사용자가 접속하는 환경이다. 로컬에서 기능을 확인한 후 GitHub에 변경사항을 반영하면 Vercel이 다시 배포하고, 배포 후 오류가 발생하면 로그를 확인 → 코드 수정 → 다시 배포하는 방식으로 해결한다.
