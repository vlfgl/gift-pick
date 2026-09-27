const form = document.getElementById("recommend-form");

const resultEmpty = document.getElementById("result-empty");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const errorText = document.getElementById("error-text");
const resultContent = document.getElementById("result-content");

const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const giftList = document.getElementById("gift-list");

const recommendButton = document.querySelector(".recommend-button");

/* =========================
GNB Smooth Scroll
========================= */

document.querySelectorAll(".nav-links a, .logo, .primary-button").forEach(link => {
link.addEventListener("click", event => {
const targetId = link.getAttribute("href");


    if (!targetId || !targetId.startsWith("#")) {
        return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
        return;
    }

    event.preventDefault();

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


});

/* =========================
UI Helpers
========================= */

function showOnly(element) {
[
resultEmpty,
loading,
errorMessage,
resultContent
].forEach(item => {
item.classList.add("hidden");
});


element.classList.remove("hidden");


}

/* =========================
Empty Input Validation
========================= */

function validateInput(recipient, budget, interest) {


if (!recipient || !budget || !interest) {
    errorText.textContent =
        "받는 사람, 예산, 관심사를 모두 입력해주세요.";

    showOnly(errorMessage);
    return false;
}

return true;


}

/* =========================
Render Result
========================= */

function renderResult(data) {


resultTitle.textContent = data.title || "추천 선물";
resultDescription.textContent =
    data.description || "AI가 추천한 선물입니다.";

giftList.innerHTML = "";

if (Array.isArray(data.gifts)) {

    data.gifts.forEach(gift => {

        const item = document.createElement("div");
        item.className = "gift-item";

        const title = document.createElement("h4");
        title.textContent = gift.name || "추천 선물";

        const description = document.createElement("p");
        description.textContent =
            gift.reason || "추천 이유가 없습니다.";

        item.appendChild(title);
        item.appendChild(description);

        giftList.appendChild(item);
    });
}

showOnly(resultContent);


}

/* =========================
API Request
========================= */

form.addEventListener("submit", async event => {


event.preventDefault();

const recipient =
    document.getElementById("recipient").value.trim();

const budget =
    document.getElementById("budget").value.trim();

const interest =
    document.getElementById("interest").value.trim();


// 빈 입력 검사
if (!validateInput(recipient, budget, interest)) {
    return;
}


// 로딩 상태
showOnly(loading);
recommendButton.disabled = true;


try {

    const response = await fetch("/api/recommend", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            recipient: recipient,
            budget: budget,
            interest: interest
        })
    });


    // HTTP 오류
    if (!response.ok) {
        throw new Error(
            `API request failed: ${response.status}`
        );
    }


    const data = await response.json();

    renderResult(data);

} catch (error) {

    console.error("Recommendation API error:", error);

    errorText.textContent =
        "서버와 통신하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";

    showOnly(errorMessage);

} finally {

    recommendButton.disabled = false;
}


});
