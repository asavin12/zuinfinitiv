// API keys (thay bằng khóa hợp lệ từ Google Cloud Console)
const API_KEYS = [
    "AIzaSyCdxcJf9F3myEQjI_1ogbS-6_0RLRtOEY8",
    "AIzaSyCp_VB-bpgQ6wEvVZBR04akkXcSVvwtoiQ",
    "AIzaSyAXlZH48sepbUXX5yV7IsnYmdMiwynWyBc",
    "AIzaSyCTRvEKv14mwiKzG6-6cZ_o0WI3BHBl3ZI",
    "AIzaSyDB7FnEBtoGs_BNoQx6gHOVJTwGBGgGOgA",
    "AIzaSyAm8YrImdMCWZrh8Pot2HDs35y1gV1wQAU",
    "AIzaSyCG4R2bDJmU3nE13ZWeuusLDCBxfBOjzFE",
    "AIzaSyAnG2PgKsyyeWZeH6fGti-UzNHx2_hKF2c"
];

let PRIMARY_KEY = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
let VERIFY_KEY = API_KEYS.find(key => key !== PRIMARY_KEY) || API_KEYS[0];

// Danh sách động từ và cấu trúc zu + infinitiv
const zuInfinitivVerbs = [
    {
        category: "Động từ chỉ mong muốn, kế hoạch, dự định",
        verbs: [
            { verb: "anfangen", translation: "bắt đầu", usage: "bắt đầu làm gì đó" },
            { verb: "beginnen", translation: "bắt đầu", usage: "bắt đầu một hoạt động" },
            { verb: "aufhören", translation: "ngừng", usage: "ngừng làm gì đó" },
            { verb: "versuchen", translation: "cố gắng", usage: "cố gắng làm gì đó" },
            { verb: "planen", translation: "lập kế hoạch", usage: "lập kế hoạch làm gì" },
            { verb: "vorhaben", translation: "dự định", usage: "dự định làm gì đó" },
            { verb: "hoffen", translation: "hy vọng", usage: "hy vọng đạt được điều gì" },
            { verb: "vergessen", translation: "quên", usage: "quên làm gì đó" },
            { verb: "sich bemühen", translation: "nỗ lực", usage: "nỗ lực làm gì" },
            { verb: "sich entscheiden", translation: "quyết định", usage: "quyết định làm gì" },
            { verb: "sich vorbereiten", translation: "chuẩn bị", usage: "chuẩn bị cho việc gì" },
            { verb: "wagen", translation: "dám", usage: "dám làm gì đó" },
            { verb: "beabsichtigen", translation: "có ý định", usage: "có ý định làm gì" },
            { verb: "versprechen", translation: "hứa", usage: "hứa làm gì đó" },
            { verb: "drohen", translation: "đe dọa", usage: "đe dọa làm gì" }
        ]
    },
    {
        category: "Động từ chỉ cảm xúc hoặc nhận thức",
        verbs: [
            { verb: "scheinen", translation: "dường như", usage: "dường như làm gì đó" },
            { verb: "glauben", translation: "tin", usage: "tin rằng đã làm gì" },
            { verb: "meinen", translation: "cho rằng", usage: "cho rằng mình đúng về việc gì" },
            { verb: "bedauern", translation: "hối tiếc", usage: "hối tiếc vì đã làm gì" },
            { verb: "sich freuen", translation: "vui mừng", usage: "vui mừng khi làm gì" },
            { verb: "Angst haben", translation: "sợ", usage: "sợ làm gì đó" },
            { verb: "hoffen", translation: "hy vọng", usage: "hy vọng đạt được điều gì" },
            { verb: "überrascht sein", translation: "ngạc nhiên", usage: "ngạc nhiên khi được làm gì" }
        ]
    },
    {
        category: "Động từ chỉ khả năng, nhu cầu, nghĩa vụ",
        verbs: [
            { verb: "brauchen (Verneinung)", translation: "không cần (phủ định)", usage: "không cần làm gì (dạng phủ định)" },
            { verb: "pflegen", translation: "thường xuyên", usage: "thường xuyên làm gì (ít dùng)" },
            { verb: "sich weigern", translation: "từ chối", usage: "từ chối làm gì" },
            { verb: "sich entschließen", translation: "quyết tâm", usage: "quyết tâm làm gì" },
            { verb: "sich verpflichten", translation: "cam kết", usage: "cam kết làm gì" },
            { verb: "sich trauen", translation: "dám", usage: "không dám làm gì" }
        ]
    },
    {
        category: "Cấu trúc với 'es ist ... zu'",
        verbs: [
            { verb: "es ist wichtig", translation: "quan trọng", usage: "quan trọng khi làm gì" },
            { verb: "es ist schwer", translation: "khó khăn", usage: "khó khăn khi làm gì" },
            { verb: "es ist erlaubt", translation: "được phép", usage: "được phép làm gì" },
            { verb: "es ist verboten", translation: "bị cấm", usage: "bị cấm làm gì" }
        ]
    }
];

// Danh sách chủ đề
const themes = [
    "Gia đình", "Công việc & Nghề nghiệp", "Du lịch & Nghỉ ngơi", "Giáo dục & Học tập",
    "Mua sắm & Tiêu dùng", "Sức khỏe & Cơ thể", "Giải trí & Sở thích", "Ăn uống",
    "Môi trường & Thiên nhiên", "Nhà cửa & Sinh sống", "Truyền thông & Công nghệ",
    "Cảm xúc & Cuộc sống hàng ngày", "Hành chính & Giấy tờ", "Giao thông & Di chuyển",
    "Các mối quan hệ & Xã hội"
];

// Biến trạng thái
let ruleStack = [];
let totalNewQuestions = 0;
let totalReviewQuestions = 0;
let totalQuestions = 0;
let totalCorrect = 0;
let totalWrong = 0;
let currentVerb = "";
let currentTranslation = "";
let currentUsage = "";
let currentCategory = "";
let currentExample = "";
let currentSentenceTranslation = "";
let currentExplanation = "";
let isVerbAnswered = false;
let isSentenceAnswered = false;
let reviewQuestions = JSON.parse(localStorage.getItem('wrongZuInfinitiv') || '[]');
let lastWrongQuestion = null;
const MAX_API_RETRIES = 3;

// Hiển thị popup
function showPopup(title, message) {
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popup').classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

// Ẩn popup
function hidePopup() {
    document.getElementById('popup').classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

// Hiển thị popup danh sách câu sai
function showWrongSentencesPopup() {
    const wrongSentencesList = document.getElementById('wrongSentencesList');
    if (reviewQuestions.length === 0) {
        wrongSentencesList.innerHTML = '<p class="text-center">Chưa có câu nào sai!</p>';
    } else {
        wrongSentencesList.innerHTML = '<ul>' + reviewQuestions.map((item, index) => `
            <li class="wrong-item">
                <p><strong>${index + 1}. Câu đúng:</strong> ${item.example} <button class="speak-wrong-btn" onclick="speakSentence('${item.example.replace(/'/g, "\\'")}')">Nghe</button></p>
                <p><strong>Câu bạn nhập:</strong> ${item.userAnswer}</p>
                <p><strong>Động từ:</strong> ${item.verb}</p>
                <p><strong>Nghĩa động từ:</strong> ${item.verbTranslation}</p>
                <p><strong>Loại động từ:</strong> ${item.category}</p>
                <p><strong>Giải thích:</strong> ${item.explanation}</p>
            </li>
        `).join('') + '</ul>';
    }
    document.getElementById('wrongSentencesPopup').classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

// Ẩn popup danh sách câu sai
function hideWrongSentencesPopup() {
    document.getElementById('wrongSentencesPopup').classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

// Gọi API Gemini
async function callGeminiAPI(prompt, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return fixJson(data.candidates[0].content.parts[0].text);
    } catch (error) {
        throw error;
    }
}

// Thử với các khóa API khác nhau
async function tryWithDifferentKey(prompt, excludedKey) {
    const availableKeys = API_KEYS.filter(key => key !== excludedKey);
    for (const key of availableKeys) {
        try {
            const response = await callGeminiAPI(prompt, key);
            if (response) {
                PRIMARY_KEY = key;
                return response;
            }
        } catch (error) {
            if (error.message.includes('429')) {
                await new Promise(resolve => setTimeout(resolve, 500));
                continue;
            }
            console.warn(`Lỗi với key ${key.slice(0, 5)}...: ${error}`);
        }
    }
    throw new Error('Tất cả API key không hoạt động');
}

// Sửa JSON không hợp lệ
function fixJson(jsonStr) {
    jsonStr = jsonStr.replace(/```json\s*|\s*```/g, '').trim();
    const startIdx = jsonStr.indexOf('{');
    const endIdx = jsonStr.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        jsonStr = jsonStr.slice(startIdx, endIdx + 1);
    } else {
        return null;
    }

    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        jsonStr = jsonStr.replace(/,\s*}/g, '}').replace(/(\w+)(?=\s*:)/g, '"$1"');
        try {
            return JSON.parse(jsonStr);
        } catch {
            return null;
        }
    }
}

// Tạo stack quy tắc
function createRuleStack() {
    const stack = [];
    totalNewQuestions = 0;

    zuInfinitivVerbs.forEach(category => {
        category.verbs.forEach((verb, idx) => {
            stack.push(`${category.category}_${idx}`);
            totalNewQuestions++;
        });
    });

    // Xáo trộn stack
    for (let i = stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [stack[i], stack[j]] = [stack[j], stack[i]];
    }

    console.log('ruleStack created:', stack);
    return stack;
}

// Tạo câu ví dụ từ động từ
async function getSentenceFromVerb(verb, usage, category) {
    console.log('getSentenceFromVerb called, verb:', verb);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const prompt = `
Tạo một câu ví dụ đơn giản ở trình độ A1-B1 tiếng Đức sử dụng động từ '${verb}' với cấu trúc zu + infinitiv, thuộc chủ đề '${randomTheme}'.
Câu phải dễ hiểu, phù hợp với người học tiếng Đức cơ bản, và phản ánh ngữ cảnh đời thường ở Đức.
Sử dụng ngữ cảnh ngẫu nhiên khác nhau mỗi lần (seed: ${Math.random()}).
Cung cấp giải thích chi tiết bằng tiếng Việt, bao gồm:
- Ngữ cảnh sử dụng của câu ví dụ (câu này thường được dùng trong tình huống nào).
- Tại sao động từ này được dùng với zu + infinitiv trong trường hợp này (liên quan đến ngữ nghĩa và cấu trúc).
- Mẹo ghi nhớ: đưa ra một cụm từ ví dụ minh họa (theo dạng 'Deutsch zu lernen') để người học dễ nhớ cách dùng.
Giải thích phải rõ ràng, dễ hiểu, và thân thiện với người học tiếng Đức ở trình độ cơ bản.
Trả về JSON:
{
  "example": "câu tiếng Đức hoàn chỉnh",
  "translation": "dịch nghĩa sang tiếng Việt",
  "explanation": "giải thích chi tiết bằng tiếng Việt (bao gồm ngữ cảnh, lý do, và mẹo ghi nhớ)"
}
`;

    for (let retry = 0; retry < MAX_API_RETRIES; retry++) {
        try {
            const response = await tryWithDifferentKey(prompt, VERIFY_KEY);
            if (!response) continue;

            console.log('getSentenceFromVerb response:', response);
            return [
                response.example,
                response.translation,
                response.explanation
            ];
        } catch (error) {
            console.warn(`Lỗi API retry ${retry + 1}: ${error}`);
            if (retry === MAX_API_RETRIES - 1) {
                showPopup('Lỗi API', 'Không thể lấy câu mới. Vui lòng kiểm tra kết nối hoặc thử lại sau.');
                return [
                    `Không có câu - lỗi API`,
                    "Không có dịch nghĩa (lỗi API)",
                    "Không có giải thích (lỗi API)"
                ];
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

// Phát âm câu ví dụ
function speakSentence(sentence) {
    if (!('speechSynthesis' in window)) {
        showPopup('Lỗi phát âm', 'Trình duyệt không hỗ trợ Web Speech API. Vui lòng sử dụng trình duyệt hiện đại như Chrome, Edge, hoặc Safari mới nhất.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => voice.lang === 'de-DE' || voice.lang.startsWith('de'));

    if (germanVoice) {
        utterance.voice = germanVoice;
    } else {
        showPopup('Cảnh báo phát âm', 'Không tìm thấy giọng tiếng Đức trên thiết bị. Vui lòng cài đặt giọng tiếng Đức hoặc thử trình duyệt khác (Chrome/Edge).');
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    utterance.onerror = (event) => {
        showPopup('Lỗi phát âm', `Không thể phát âm "${sentence}": ${event.error}. Vui lòng kiểm tra cài đặt âm thanh hoặc thử lại.`);
    };
}

// Đảm bảo danh sách giọng nói được tải trước
function loadVoices() {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve();
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                setTimeout(() => resolve(), 100);
            };
        }
    });
}

// Lưu câu trả lời sai
function saveWrongAnswer(verb, verbTranslation, usage, category, userAnswer, example, sentenceTranslation, explanation) {
    reviewQuestions.push({ verb, verbTranslation, usage, category, userAnswer, example, sentenceTranslation, explanation });
    localStorage.setItem('wrongZuInfinitiv', JSON.stringify(reviewQuestions.slice(-100)));
}

// Xóa câu trả lời đúng
function removeCorrectAnswer(verb, usage) {
    reviewQuestions = reviewQuestions.filter(q => q.verb !== verb || q.usage !== usage);
    localStorage.setItem('wrongZuInfinitiv', JSON.stringify(reviewQuestions));
}

// Cập nhật thống kê
function updateStats() {
    totalQuestions = totalCorrect + totalWrong;
    document.getElementById('stats').textContent = `Tổng số câu hỏi: ${totalQuestions} | Đúng: ${totalCorrect} | Sai: ${totalWrong}`;
}

// Chuyển sang động từ hoặc câu tiếp theo
async function nextQuestion() {
    console.log('nextQuestion called, isVerbAnswered:', isVerbAnswered, 'isSentenceAnswered:', isSentenceAnswered, 'ruleStack length:', ruleStack.length, 'reviewQuestions length:', reviewQuestions.length);

    // Đặt lại trạng thái để bắt đầu câu hỏi mới
    isVerbAnswered = false;
    isSentenceAnswered = false;

    if (ruleStack.length > 0) {
        // Bước 1: Hiển thị động từ mới
        const ruleId = ruleStack.shift();
        const parts = ruleId.split('_');
        const category = parts[0];
        const idx = parseInt(parts[1]);
        const verbData = zuInfinitivVerbs.find(cat => cat.category === category).verbs[idx];
        currentVerb = verbData.verb;
        currentTranslation = verbData.translation;
        currentUsage = verbData.usage;
        currentCategory = category;
        currentExample = "";
        currentSentenceTranslation = "";
        currentExplanation = "";

        document.getElementById('section-title').textContent = 'Động từ';
        document.getElementById('sentence').textContent = currentTranslation;
        document.getElementById('input-label').textContent = 'Nhập động từ tiếng Đức:';
        document.getElementById('answer').placeholder = 'Động từ hoặc cấu trúc';
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').classList.remove('correct', 'wrong');
        document.getElementById('answer').value = '';
        document.getElementById('answer').disabled = false;
        document.getElementById('speakBtn').disabled = true;
        document.getElementById('answer').focus();
        console.log('nextQuestion: Showing verb, translation:', currentTranslation, 'verb:', currentVerb);
    } else if (reviewQuestions.length > 0) {
        // Ôn tập câu sai
        const availableQuestions = reviewQuestions.filter(q => 
            !lastWrongQuestion || (q.verb !== lastWrongQuestion.verb || q.usage !== lastWrongQuestion.usage)
        );
        let question;
        if (availableQuestions.length === 0) {
            question = reviewQuestions[Math.floor(Math.random() * reviewQuestions.length)];
        } else {
            question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        }
        currentVerb = question.verb;
        currentTranslation = question.verbTranslation;
        currentUsage = question.usage;
        currentCategory = question.category;
        currentExample = question.example;
        currentSentenceTranslation = question.sentenceTranslation;
        currentExplanation = question.explanation;

        document.getElementById('section-title').textContent = 'Động từ';
        document.getElementById('sentence').textContent = currentTranslation;
        document.getElementById('input-label').textContent = 'Nhập động từ tiếng Đức:';
        document.getElementById('answer').placeholder = 'Động từ hoặc cấu trúc';
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').classList.remove('correct', 'wrong');
        document.getElementById('answer').value = '';
        document.getElementById('answer').disabled = false;
        document.getElementById('speakBtn').disabled = true;
        reviewQuestions = reviewQuestions.filter(q => q.verb !== currentVerb || q.usage !== currentUsage);
        localStorage.setItem('wrongZuInfinitiv', JSON.stringify(reviewQuestions));
        document.getElementById('answer').focus();
        console.log('nextQuestion: Reviewing wrong question, verb:', currentVerb);
    } else {
        showPopup('Hoàn thành', `Bạn đã hoàn thành!\nTổng số câu hỏi: ${totalQuestions}\nĐúng: ${totalCorrect}\nSai: ${totalWrong}`);
        document.getElementById('answer').disabled = true;
        document.getElementById('nextBtn').disabled = true;
        document.getElementById('speakBtn').disabled = true;
        document.getElementById('viewWrongBtn').disabled = true;
        document.getElementById('clearWrongBtn').disabled = true;
        return;
    }
}

// Hiển thị câu ví dụ sau khi nhập đúng động từ
async function showSentence() {
    try {
        [currentExample, currentSentenceTranslation, currentExplanation] = await getSentenceFromVerb(currentVerb, currentUsage, currentCategory);
    } catch (error) {
        console.error('Lỗi trong getSentenceFromVerb:', error);
        showPopup('Lỗi', 'Không thể lấy câu mới. Vui lòng thử lại.');
        return;
    }

    document.getElementById('section-title').textContent = 'Câu ví dụ (bản dịch tiếng Việt)';
    document.getElementById('sentence').textContent = currentSentenceTranslation;
    document.getElementById('input-label').textContent = 'Nhập câu tiếng Đức:';
    document.getElementById('answer').placeholder = 'Câu tiếng Đức';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').classList.remove('correct', 'wrong');
    document.getElementById('answer').value = '';
    document.getElementById('answer').disabled = false;
    document.getElementById('speakBtn').disabled = false;
    isSentenceAnswered = false;
    document.getElementById('answer').focus();
    console.log('showSentence: Showing sentence, translation:', currentSentenceTranslation, 'example:', currentExample);
}

// Kiểm tra câu trả lời
function checkAnswer() {
    console.log('checkAnswer called, isVerbAnswered:', isVerbAnswered, 'isSentenceAnswered:', isSentenceAnswered);
    const userAnswer = document.getElementById('answer').value.trim();
    if (!userAnswer) {
        showPopup('Cảnh báo', isVerbAnswered ? 'Vui lòng nhập câu tiếng Đức!' : 'Vui lòng nhập động từ!');
        return;
    }

    if (!isVerbAnswered) {
        // Kiểm tra động từ
        const isCorrect = userAnswer.toLowerCase() === currentVerb.toLowerCase();
        if (isCorrect) {
            document.getElementById('feedback').textContent = `Đúng! 🎉 Vui lòng nhập câu ví dụ sử dụng "${currentVerb}".`;
            document.getElementById('feedback').classList.add('correct');
            isVerbAnswered = true;
            showSentence();
        } else {
            document.getElementById('feedback').textContent = `Sai! 😔 Động từ đúng: ${currentVerb}`;
            document.getElementById('feedback').classList.add('wrong');
            document.getElementById('answer').focus();
        }
        console.log('checkAnswer: Verb check, isCorrect:', isCorrect);
    } else {
        // Kiểm tra câu ví dụ
        const isCorrect = userAnswer.toLowerCase() === currentExample.toLowerCase();
        const feedbackText = `Câu đúng: ${currentExample}\nNghĩa: ${currentSentenceTranslation}\nLoại động từ: ${currentCategory}\nGiải thích: ${currentExplanation}`;

        if (isCorrect) {
            totalCorrect++;
            document.getElementById('feedback').textContent = `Đúng! 🎉\n${feedbackText}`;
            document.getElementById('feedback').classList.add('correct');
            removeCorrectAnswer(currentVerb, currentUsage);
            lastWrongQuestion = null;
        } else {
            totalWrong++;
            document.getElementById('feedback').textContent = `Sai! 😔\n${feedbackText}`;
            document.getElementById('feedback').classList.add('wrong');
            lastWrongQuestion = { verb: currentVerb, usage: currentUsage };
            saveWrongAnswer(currentVerb, currentTranslation, currentUsage, currentCategory, userAnswer, currentExample, currentSentenceTranslation, currentExplanation);
        }

        updateStats();
        isSentenceAnswered = true;
        speakSentence(currentExample);
        document.getElementById('answer').focus();
        console.log('checkAnswer: Sentence check, isCorrect:', isCorrect);
    }
}

// Sự kiện
document.getElementById('nextBtn').addEventListener('click', () => {
    console.log('nextBtn clicked, isVerbAnswered:', isVerbAnswered, 'isSentenceAnswered:', isSentenceAnswered);
    if (isVerbAnswered && isSentenceAnswered) {
        nextQuestion();
    } else {
        showPopup('Cảnh báo', isVerbAnswered ? 'Vui lòng trả lời câu ví dụ trước khi chuyển câu!' : 'Vui lòng trả lời động từ trước khi chuyển câu!');
    }
});

document.getElementById('popup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        console.log('Clicked outside popup, closing');
        hidePopup();
    }
});

document.getElementById('wrongSentencesPopup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        console.log('Clicked outside wrongSentencesPopup, closing');
        hideWrongSentencesPopup();
    }
});

document.getElementById('speakBtn').addEventListener('click', () => {
    console.log('speakBtn clicked');
    speakSentence(currentExample);
});

document.getElementById('viewWrongBtn').addEventListener('click', () => {
    console.log('viewWrongBtn clicked, reviewQuestions length:', reviewQuestions.length);
    showWrongSentencesPopup();
});

document.getElementById('clearWrongBtn').addEventListener('click', () => {
    console.log('clearWrongBtn clicked');
    reviewQuestions = [];
    localStorage.setItem('wrongZuInfinitiv', '[]');
    showPopup('Thông báo', 'Đã xóa lịch sử câu sai!');
});

document.getElementById('popupClose').addEventListener('click', hidePopup);
document.getElementById('wrongSentencesPopupClose').addEventListener('click', hideWrongSentencesPopup);

document.getElementById('answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('Enter pressed, isVerbAnswered:', isVerbAnswered, 'isSentenceAnswered:', isSentenceAnswered);
        if (!isVerbAnswered || !isSentenceAnswered) {
            checkAnswer();
        } else {
            nextQuestion();
        }
    }
});

// Khởi tạo
async function init() {
    console.log('init started');
    await loadVoices();
    ruleStack = createRuleStack();
    totalReviewQuestions = reviewQuestions.length;
    totalQuestions = totalNewQuestions + totalReviewQuestions;
    updateStats();
    await nextQuestion();
    console.log('init completed');
}

init();