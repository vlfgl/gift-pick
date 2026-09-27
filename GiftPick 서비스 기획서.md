# GiftPick 서비스 기획서

## 1. 서비스 목적

**GiftPick**은 받는 사람, 예산, 관심사를 입력하면 AI가 조건에 맞는 선물을 추천해주는 서비스이다.

추천 결과와 함께 네이버 쇼핑 검색 기능을 제공하여 사용자가 추천 상품을 쉽게 확인할 수 있도록 한다.

---

## 2. 타겟 사용자

- 선물을 고르는 데 어려움을 느끼는 사용자
- 상대방의 취향에 맞는 선물을 찾고 싶은 사용자
- 정해진 예산에 맞는 선물을 찾는 사용자
- 선물 검색에 소요되는 시간을 줄이고 싶은 사용자

---

## 3. 페이지 구성

<img width="470" height="379" alt="image" src="https://github.com/user-attachments/assets/257be4dc-f458-4ab1-bb9f-c91ae282ace2" />
<img width="467" height="469" alt="image" src="https://github.com/user-attachments/assets/3d4785e3-e369-435e-aeea-e9989fb43812" />

.

<img width="292" height="633" alt="IMG_8136" src="https://github.com/user-attachments/assets/64bf0b16-5526-4f90-b2bb-65b2c3d7033e" />
<img width="292" height="633" alt="IMG_8137" src="https://github.com/user-attachments/assets/5f2da23d-b2b4-4b31-ac6b-08281ee274ab" />





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

## 9. AI 코딩 도구 사용 증빙
<img width="382" height="462" alt="image" src="https://github.com/user-attachments/assets/b4d4ba36-1344-4f05-8d7a-96e8737257e2" />

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
