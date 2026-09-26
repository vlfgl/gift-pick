import json
import os
from http.server import BaseHTTPRequestHandler

from openai import OpenAI


client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)


class handler(BaseHTTPRequestHandler):

    def do_POST(self):

        try:
            # -------------------------
            # 1. 요청 데이터 받기
            # -------------------------

            content_length = int(
                self.headers.get("Content-Length", 0)
            )

            body = self.rfile.read(content_length)

            data = json.loads(body)

            recipient = data.get("recipient", "").strip()
            budget = data.get("budget", "").strip()
            interest = data.get("interest", "").strip()


            # -------------------------
            # 2. 입력값 검사
            # -------------------------

            if not recipient or not budget or not interest:

                self.send_json(
                    400,
                    {
                        "error": "받는 사람, 예산, 관심사를 모두 입력해주세요."
                    }
                )

                return


            # -------------------------
            # 3. AI에게 전달할 프롬프트
            # -------------------------

            prompt = f"""
당신은 선물 추천 전문 AI입니다.

다음 정보를 바탕으로 선물을 추천해주세요.

받는 사람:
{recipient}

예산:
{budget}

관심사:
{interest}

추천 조건:
1. 실제로 선물하기 좋은 상품을 추천하세요.
2. 사용자가 입력한 예산을 최대한 고려하세요.
3. 관심사를 반영하세요.
4. 선물 추천은 3개만 제시하세요.
5. 각각의 선물에 추천 이유를 작성하세요.
6. 한국어로 답변하세요.

반드시 다음 JSON 형식으로만 답변하세요.

{{
    "title": "추천 결과 제목",
    "description": "전체 추천 설명",
    "gifts": [
        {{
            "name": "선물 이름",
            "reason": "추천 이유"
        }},
        {{
            "name": "선물 이름",
            "reason": "추천 이유"
        }},
        {{
            "name": "선물 이름",
            "reason": "추천 이유"
        }}
    ]
}}
"""


            # -------------------------
            # 4. OpenAI API 호출
            # -------------------------

            response = client.responses.create(
                model="gpt-5",
                input=prompt
            )


            ai_text = response.output_text


            # -------------------------
            # 5. AI 응답을 JSON으로 변환
            # -------------------------

            result = json.loads(ai_text)


            # -------------------------
            # 6. 프론트엔드에 결과 반환
            # -------------------------

            self.send_json(
                200,
                result
            )


        except json.JSONDecodeError:

            self.send_json(
                500,
                {
                    "error": "AI 응답을 처리하지 못했습니다."
                }
            )


        except Exception as error:

            print("API Error:", error)

            self.send_json(
                500,
                {
                    "error": "AI 추천 중 오류가 발생했습니다."
                }
            )


    def send_json(self, status_code, data):

        self.send_response(status_code)

        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )

        self.end_headers()

        self.wfile.write(
            json.dumps(
                data,
                ensure_ascii=False
            ).encode("utf-8")
        )