const topicInput = document.getElementById("pb-topic");
const ageSelect = document.getElementById("pb-age");
const extraInput = document.getElementById("pb-extra");
const extraCount = document.getElementById("pb-extra-count");
const generateBtn = document.getElementById("pb-generate-btn");
const regenerateBtn = document.getElementById("pb-regenerate-btn");
const copyBtn = document.getElementById("pb-copy-btn");
const copyFeedback = document.getElementById("pb-copy-feedback");
const resultBox = document.getElementById("pb-result");
const resultNotice = document.getElementById("pb-result-notice");
const resultBooks = document.getElementById("pb-result-books");

if (generateBtn) {
  // Curated list of real, published picture books only. Every title/author/
  // publisher below was cross-checked against publisher and bookstore listings
  // before being added — never invent a book, author, or publisher here.
  const AGE_LABELS = {
    toddler: "유아(3-7세)",
    child: "어린이(8-12세)",
    teen: "청소년(13-18세)",
    adult: "성인(19-64세)",
    senior: "시니어(65세 이상)",
  };

  const BOOKS = [
    {
      title: "곰 사냥을 떠나자",
      author: "마이클 로젠 글 · 헬렌 옥슨버리 그림",
      publisher: "시공주니어",
      ages: ["toddler"],
      themes: ["용기", "가족", "도전", "우정", "모험"],
      description:
        "가족들이 커다란 곰을 사냥하러 떠나 숲과 강, 진흙탕을 신나게 헤쳐 나가는 이야기예요. 마침내 진짜 곰을 만나자 깜짝 놀라 허둥지둥 집으로 돌아와 이불 속에 숨어버리는 유쾌한 결말이 아이들에게 큰 웃음을 줍니다.",
      activities: ["부모·아이 함께 읽기", "그림책 수업"],
    },
    {
      title: "무지개 물고기",
      author: "마르쿠스 피스터 글그림",
      publisher: "시공주니어",
      ages: ["toddler", "child"],
      themes: ["우정", "나눔", "관계", "자존감"],
      description:
        "반짝이는 비늘을 가진 물고기가 자신의 아름다움만 뽐내다가 친구들을 잃고, 비늘을 하나씩 나누어 주면서 진짜 우정을 되찾는 이야기예요. 화려한 홀로그램 그림이 인상적인 스테디셀러 그림책입니다.",
      activities: ["부모·아이 함께 읽기", "그림책 수업"],
    },
    {
      title: "괴물들이 사는 나라",
      author: "모리스 센닥 글그림",
      publisher: "시공주니어",
      ages: ["toddler", "child"],
      themes: ["감정", "모험", "상상력", "가족"],
      description:
        "말썽꾸러기 맥스가 엄마에게 혼나고 방에 갇힌 뒤, 상상 속 배를 타고 괴물들이 사는 나라로 떠나 그곳의 왕이 되는 이야기예요. 마음껏 소동을 부리다가도 결국 엄마와 집을 그리워하며 돌아오는 모습이 아이의 감정을 있는 그대로 보여줍니다.",
      activities: ["부모·아이 함께 읽기", "그림책 수업"],
    },
    {
      title: "아낌없이 주는 나무",
      author: "쉘 실버스타인 글그림",
      publisher: "시공주니어",
      ages: ["toddler", "child", "teen", "adult", "senior"],
      themes: ["사랑", "관계", "삶", "가족", "감사"],
      description:
        "한 그루의 나무가 한 소년에게 아무 대가 없이 그늘과 열매, 가지와 줄기까지 모두 내어주는 이야기예요. 짧은 글 속에 사랑과 관계, 삶의 의미에 대해 오래 곱씹게 되는 스테디셀러 명작입니다.",
      activities: ["부모·아이 함께 읽기", "독서모임", "자기성찰", "세대 간 대화"],
    },
    {
      title: "돼지책",
      author: "앤서니 브라운 글그림",
      publisher: "웅진주니어",
      ages: ["child", "teen"],
      themes: ["가족", "관계", "변화"],
      description:
        "엄마 혼자 집안일을 도맡아 하다 지쳐 사라지자, 아빠와 두 아들이 그제야 집안일의 소중함을 깨닫는 이야기예요. 유머러스한 그림 속에 가족의 역할과 배려에 대한 묵직한 메시지를 담고 있습니다.",
      activities: ["그림책 수업", "독서토론", "세대 간 대화"],
    },
    {
      title: "고릴라",
      author: "앤서니 브라운 글그림",
      publisher: "웅진주니어",
      ages: ["child", "teen", "adult"],
      themes: ["가족", "외로움", "관계", "행복"],
      description:
        "아빠와 함께 시간을 보내고 싶은 한나가 생일에 받은 고릴라 인형이 밤사이 진짜 고릴라가 되어 함께 동물원에 가고 춤도 추는 이야기예요. 바쁜 어른과 외로운 아이 사이의 관계를 따뜻하게 그려냅니다.",
      activities: ["부모·아이 함께 읽기", "독서모임", "자기성찰"],
    },
    {
      title: "구름빵",
      author: "백희나 글그림",
      publisher: "한솔수북",
      ages: ["toddler"],
      themes: ["가족", "상상력", "행복"],
      description:
        "비 오는 날 나뭇가지에 걸린 작은 구름으로 엄마가 빵을 만들어 주자, 그 빵을 먹은 아이들이 하늘을 날아 회사에 늦은 아빠를 도와주는 이야기예요. 사랑스러운 상상력으로 오랫동안 사랑받아온 한국 창작 그림책입니다.",
      activities: ["부모·아이 함께 읽기", "그림책 수업"],
    },
    {
      title: "알사탕",
      author: "백희나 글그림",
      publisher: "책읽는곰",
      ages: ["toddler", "child"],
      themes: ["관계", "소통", "우정"],
      description:
        "혼자 노는 것이 익숙한 동동이가 신비한 알사탕을 하나씩 먹을 때마다 소파, 강아지, 아빠의 속마음이 들리기 시작하는 이야기예요. 서로의 마음에 귀 기울이는 법을 다정하게 보여줍니다.",
      activities: ["부모·아이 함께 읽기", "그림책 수업", "글쓰기 활동"],
    },
    {
      title: "프레드릭",
      author: "레오 리오니 글그림",
      publisher: "시공주니어",
      ages: ["toddler", "child"],
      themes: ["자존감", "나답게 살아가기", "다름"],
      description:
        "겨울 양식을 모으는 다른 들쥐들과 달리 프레드릭은 햇살과 색깔, 이야기를 모으는 데 열중해요. 긴 겨울, 프레드릭이 모아둔 말과 이야기가 모두에게 큰 위로가 되어준다는 것을 보여주는 칼데콧 명예상 수상작입니다.",
      activities: ["그림책 수업", "글쓰기 활동"],
    },
    {
      title: "까마귀 소년",
      author: "야시마 타로 글그림",
      publisher: "비룡소",
      ages: ["child", "teen"],
      themes: ["자존감", "외로움", "나답게 살아가기", "다름"],
      description:
        "친구들과 잘 어울리지 못해 외톨이로 지내던 땅꼬마가 한 선생님의 관심과 재능 발견을 통해 '까마귀 소년'으로 다시 태어나는 이야기예요. 다름을 있는 그대로 바라보는 시선의 소중함을 전하는 칼데콧 명예상 수상작입니다.",
      activities: ["그림책 수업", "독서토론", "자기성찰"],
    },
    {
      title: "종이 봉지 공주",
      author: "로버트 문치 글 · 마이클 마첸코 그림",
      publisher: "비룡소",
      ages: ["child", "teen"],
      themes: ["용기", "자존감", "도전", "선택"],
      description:
        "용에게 왕자를 빼앗긴 공주가 다 타버린 옷 대신 종이 봉지를 걸치고 기지를 발휘해 용을 물리치지만, 정작 왕자가 겉모습만으로 자신을 나무라자 결혼을 거절하는 이야기예요. 통쾌하고 당당한 현대판 공주 이야기로 사랑받고 있습니다.",
      activities: ["그림책 수업", "독서토론"],
    },
    {
      title: "행복을 나르는 버스",
      author: "맷 데 라 페냐 글 · 크리스티안 로빈슨 그림",
      publisher: "비룡소",
      ages: ["child", "teen", "adult"],
      themes: ["감사", "관계", "행복"],
      description:
        "할머니와 함께 버스를 타고 종점까지 가는 소년 CJ가, 이웃들과 낡은 동네 풍경 속에서 작은 것들의 아름다움과 함께하는 행복을 발견하는 이야기예요. 뉴베리상과 칼데콧 명예상을 동시에 받은 최초의 그림책입니다.",
      activities: ["부모·아이 함께 읽기", "독서모임", "자기성찰"],
    },
    {
      title: "오리, 죽음 그리고 튤립",
      author: "볼프 에를브루흐 글그림",
      publisher: "웅진주니어",
      ages: ["teen", "adult", "senior"],
      themes: ["죽음", "삶", "위로", "상실"],
      description:
        "자신을 줄곧 따라다니던 존재가 사실은 '죽음'이었음을 알게 된 오리가, 죽음과 함께 시간을 보내며 삶의 끝을 담담하게 받아들이는 이야기예요. 죽음을 두려운 것이 아니라 삶의 자연스러운 한 부분으로 그려낸 잔잔한 그림책입니다.",
      activities: ["독서모임", "자기성찰", "시니어 회상 활동"],
    },
    {
      title: "안녕, 나의 등대",
      author: "소피 블랙올 글그림",
      publisher: "비룡소",
      ages: ["child", "teen", "adult", "senior"],
      themes: ["변화", "삶", "추억", "새로운 시작"],
      description:
        "외딴 바위섬을 지키며 배들의 길잡이가 되어주던 등대지기의 삶이, 시대가 변하며 자동화 등대로 넘어가는 과정을 담담하게 그린 이야기예요. 한 시절의 끝과 새로운 시작을 아름다운 수채화로 보여주는 칼데콧 수상작입니다.",
      activities: ["독서모임", "시니어 회상 활동", "세대 간 대화"],
    },
    {
      title: "무릎 딱지",
      author: "샤를로트 문드리크 글 · 올리비에 탈레크 그림",
      publisher: "한울림어린이",
      ages: ["child", "teen", "adult"],
      themes: ["상실", "그리움", "가족", "위로"],
      description:
        "갑작스레 엄마를 떠나보낸 아이가 슬픔과 그리움 속에서 무릎의 딱지를 자꾸 뜯어내며 아픔을 확인하다가, 서서히 그 상처를 자기만의 방식으로 보듬어가는 이야기예요. 상실을 겪은 마음을 섬세하고 따뜻하게 어루만지는 그림책입니다.",
      activities: ["독서모임", "자기성찰", "글쓰기 활동"],
    },
    {
      title: "100만 번 산 고양이",
      author: "사노 요코 글그림",
      publisher: "비룡소",
      ages: ["child", "teen", "adult", "senior"],
      themes: ["삶", "죽음", "사랑", "선택"],
      description:
        "백만 번을 죽고 백만 번을 다시 살아난 얼룩 고양이가 그동안 자신만을 사랑하다가, 마침내 다른 고양이를 진심으로 사랑하게 되면서 처음으로 눈물을 흘리고 다시는 살아나지 않는 이야기예요. 삶과 사랑, 죽음의 의미를 깊이 생각하게 하는 스테디셀러입니다.",
      activities: ["독서모임", "독서토론", "자기성찰", "시니어 회상 활동"],
    },
    {
      title: "행복한 청소부",
      author: "모니카 페트 글 · 안토니 보라틴스키 그림",
      publisher: "풀빛",
      ages: ["teen", "adult", "senior"],
      themes: ["새로운 시작", "선택", "행복", "나답게 살아가기", "변화"],
      description:
        "거리의 표지판을 닦던 한 청소부가 자신이 닦아온 작가와 음악가의 이름들에 호기심을 갖고 책을 읽고 음악을 들으며 스스로 공부하다가, 마침내 대학에서 강의까지 하게 되는 이야기예요. 늦은 나이에도 새로운 배움과 선택으로 삶을 바꿀 수 있음을 보여줍니다.",
      activities: ["독서모임", "자기성찰", "글쓰기 활동", "세대 간 대화"],
    },
  ];

  function hasBatchim(word) {
    if (!word) return false;
    const lastChar = word.trim().slice(-1);
    const code = lastChar.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return false;
    return code % 28 !== 0;
  }

  function eunNeun(word) {
    return hasBatchim(word) ? `${word}은` : `${word}는`;
  }

  function eulReul(word) {
    return hasBatchim(word) ? `${word}을` : `${word}를`;
  }

  function iGa(word) {
    return hasBatchim(word) ? `${word}이` : `${word}가`;
  }

  function eulReulSuffix(word) {
    return hasBatchim(word) ? "을" : "를";
  }

  function iGaSuffix(word) {
    return hasBatchim(word) ? "이" : "가";
  }

  const QUESTION_BANKS = {
    toddler: [
      () => "주인공은 어떤 기분이었을까요?",
      () => "내가 주인공이라면 어떻게 했을까요?",
      () => "가장 마음에 드는 장면은 어디인가요?",
      (topic) => `이 책에서 ${eunNeun(topic)} 어떤 모습으로 나왔나요?`,
      (topic, title) => `『${title}』에서 가장 기억에 남는 그림은 무엇인가요?`,
    ],
    child: [
      (topic) => `주인공이 ${eulReul(topic)} 느꼈다고 생각한 순간은 언제인가요?`,
      () => "나도 비슷한 경험을 한 적이 있나요?",
      () => "주인공에게 한마디 해준다면 어떤 말을 해주고 싶나요?",
      (topic) => `이 책은 ${eulReul(topic)} 어떻게 보여주고 있나요?`,
      (topic, title) => `『${title}』${eulReulSuffix(title)} 읽고 친구에게 들려주고 싶은 이야기가 있나요?`,
    ],
    teen: [
      () => "주인공의 선택에 동의하나요? 그 이유는 무엇인가요?",
      () => "나라면 어떤 선택을 했을까요?",
      () => "이 이야기가 지금 우리의 삶과 닿아 있는 부분은 무엇인가요?",
      (topic) => `${eunNeun(topic)} 나에게 어떤 의미인가요?`,
      (topic, title) => `『${title}』${eulReulSuffix(title)} 읽고 ${eulReul(topic)} 대해 새롭게 생각하게 된 점은 무엇인가요?`,
    ],
    adult: [
      () => "이 책에서 현재의 나와 닮았다고 느낀 부분은 무엇인가요?",
      () => "내가 지금 지키고 싶은 삶의 가치는 무엇인가요?",
      () => "이 이야기를 읽고 새롭게 바라보게 된 것은 무엇인가요?",
      (topic) => `요즘 나에게 ${eunNeun(topic)} 어떤 의미로 다가오나요?`,
      (topic, title) => `『${title}』${iGaSuffix(title)} 건넨 이야기에 지금의 나는 어떤 대답을 하고 싶나요?`,
    ],
    senior: [
      () => "이 책을 읽으며 떠오른 내 삶의 한 장면은 무엇인가요?",
      () => "지금까지 살아오며 내가 잘했다고 생각하는 선택은 무엇인가요?",
      () => "앞으로의 삶에서 더 소중히 하고 싶은 것은 무엇인가요?",
      (topic) => `${eunNeun(topic)} 지나온 세월 속에서 어떤 모습으로 곁에 있었나요?`,
      (topic, title) => `『${title}』${eulReulSuffix(title)} 읽으며, ${eulReul(topic)} 자녀나 손주에게 들려주고 싶은 이야기가 있나요?`,
    ],
  };

  function pickN(list, n) {
    const pool = [...list];
    const picked = [];
    while (pool.length && picked.length < n) {
      const index = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(index, 1)[0]);
    }
    return picked;
  }

  function parseKeywords(text) {
    return text
      .split(/[,\s·/、]+/)
      .map((word) => word.trim())
      .filter(Boolean);
  }

  function matchThemes(book, keywords, extraText) {
    const matched = new Set();
    book.themes.forEach((theme) => {
      const inKeywords = keywords.some((word) => word.includes(theme) || theme.includes(word));
      const inExtra = extraText && extraText.includes(theme);
      if (inKeywords || inExtra) {
        matched.add(theme);
      }
    });
    return matched;
  }

  function selectBooks(ageGroup, topicText, extraText) {
    const keywords = parseKeywords(topicText);
    const ageMatched = BOOKS.filter((book) => book.ages.includes(ageGroup));

    const scored = ageMatched.map((book) => {
      const matched = matchThemes(book, keywords, extraText);
      return { book, matched, score: matched.size, jitter: Math.random() };
    });

    scored.sort((a, b) => b.score - a.score || b.jitter - a.jitter);

    const withMatch = scored.filter((entry) => entry.score > 0);
    const broadened = withMatch.length < 5;
    const chosen = broadened ? scored.slice(0, 5) : withMatch.slice(0, 5);

    return { chosen, broadened: broadened && withMatch.length < scored.length };
  }

  function buildReason(entry, ageGroup, topicText) {
    const ageLabel = AGE_LABELS[ageGroup];
    if (entry.matched.size > 0) {
      const keywordList = Array.from(entry.matched).join("', '");
      return `${ageLabel} 독자에게 잘 어울리는 그림책이에요. 입력하신 '${keywordList}' 주제와 맞닿아 있어요.`;
    }
    const fallbackTheme = entry.book.themes[0];
    return `입력하신 '${topicText}' 주제와 정확히 일치하진 않지만, ${ageLabel} 독자가 자주 마주하는 '${fallbackTheme}' 이야기를 담고 있어 함께 추천해요.`;
  }

  function buildQuestions(entry, ageGroup, topicText) {
    const bank = QUESTION_BANKS[ageGroup] || QUESTION_BANKS.child;
    const picks = pickN(bank, 3);
    const primaryKeyword = entry.matched.size > 0 ? Array.from(entry.matched)[0] : parseKeywords(topicText)[0] || topicText;
    return picks.map((fn) => fn(primaryKeyword, entry.book.title));
  }

  let lastRender = null;

  function render(ageGroup, topicText, extraText) {
    const { chosen, broadened } = selectBooks(ageGroup, topicText, extraText);

    resultNotice.hidden = !broadened;
    if (broadened) {
      resultNotice.textContent =
        "입력하신 주제와 직접적으로 일치하는 책이 많지 않아, 관련 주제로 범위를 넓혀 추천합니다.";
    }

    resultBooks.innerHTML = "";
    const renderedBooks = [];

    chosen.forEach((entry, index) => {
      const { book } = entry;
      const reason = buildReason(entry, ageGroup, topicText);
      const questions = buildQuestions(entry, ageGroup, topicText);
      renderedBooks.push({ book, reason, questions });

      const li = document.createElement("li");
      li.className = "pb-book-card";

      const indexBadge = document.createElement("span");
      indexBadge.className = "pb-book-index";
      indexBadge.textContent = `추천 그림책 ${String(index + 1).padStart(2, "0")}`;
      li.appendChild(indexBadge);

      const titleEl = document.createElement("h5");
      titleEl.className = "pb-book-title";
      titleEl.textContent = book.title;
      li.appendChild(titleEl);

      const metaEl = document.createElement("p");
      metaEl.className = "pb-book-meta";
      metaEl.textContent = book.publisher ? `${book.author} | ${book.publisher}` : book.author;
      li.appendChild(metaEl);

      const sections = [
        { label: "책 소개", content: book.description },
        { label: "이 책을 추천하는 이유", content: reason },
      ];

      sections.forEach((section) => {
        const wrap = document.createElement("div");
        wrap.className = "pb-book-section";
        const label = document.createElement("span");
        label.className = "pb-book-section-label";
        label.textContent = section.label;
        const p = document.createElement("p");
        p.textContent = section.content;
        wrap.appendChild(label);
        wrap.appendChild(p);
        li.appendChild(wrap);
      });

      const activitiesWrap = document.createElement("div");
      activitiesWrap.className = "pb-book-section";
      const activitiesLabel = document.createElement("span");
      activitiesLabel.className = "pb-book-section-label";
      activitiesLabel.textContent = "이런 활동에 좋아요";
      const tagsWrap = document.createElement("div");
      tagsWrap.className = "pb-book-tags";
      book.activities.forEach((activity) => {
        const tag = document.createElement("span");
        tag.className = "pb-book-tag";
        tag.textContent = activity;
        tagsWrap.appendChild(tag);
      });
      activitiesWrap.appendChild(activitiesLabel);
      activitiesWrap.appendChild(tagsWrap);
      li.appendChild(activitiesWrap);

      const questionsWrap = document.createElement("div");
      questionsWrap.className = "pb-book-section";
      const questionsLabel = document.createElement("span");
      questionsLabel.className = "pb-book-section-label";
      questionsLabel.textContent = "함께 나눌 질문";
      const questionsList = document.createElement("ol");
      questionsList.className = "pb-book-questions";
      questions.forEach((question) => {
        const qItem = document.createElement("li");
        qItem.textContent = question;
        questionsList.appendChild(qItem);
      });
      questionsWrap.appendChild(questionsLabel);
      questionsWrap.appendChild(questionsList);
      li.appendChild(questionsWrap);

      resultBooks.appendChild(li);
    });

    lastRender = { ageGroup, topicText, extraText, renderedBooks };
    resultBox.hidden = false;
    copyFeedback.textContent = "";
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function generate() {
    const topicText = topicInput.value.trim();
    if (!topicText) {
      topicInput.focus();
      return;
    }
    const ageGroup = ageSelect.value;
    const extraText = extraInput.value.trim();
    render(ageGroup, topicText, extraText);
  }

  function buildCopyText() {
    if (!lastRender) return "";
    const lines = ["당신을 위한 그림책 5권", ""];
    lastRender.renderedBooks.forEach((entry, index) => {
      const { book, reason, questions } = entry;
      lines.push(`추천 그림책 ${String(index + 1).padStart(2, "0")}`);
      lines.push(`『${book.title}』`);
      lines.push(book.publisher ? `${book.author} | ${book.publisher}` : book.author);
      lines.push("");
      lines.push("[책 소개]");
      lines.push(book.description);
      lines.push("");
      lines.push("[이 책을 추천하는 이유]");
      lines.push(reason);
      lines.push("");
      lines.push("[이런 활동에 좋아요]");
      lines.push(book.activities.join(" · "));
      lines.push("");
      lines.push("[함께 나눌 질문]");
      questions.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
      lines.push("");
    });
    return lines.join("\n").trim();
  }

  extraInput.addEventListener("input", () => {
    extraCount.textContent = String(extraInput.value.length);
  });

  generateBtn.addEventListener("click", generate);

  regenerateBtn.addEventListener("click", () => {
    if (!topicInput.value.trim()) {
      topicInput.focus();
      return;
    }
    generate();
  });

  copyBtn.addEventListener("click", async () => {
    const text = buildCopyText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copyFeedback.textContent = "복사되었어요! 블로그나 독서모임 자료에 붙여넣기 해보세요.";
    } catch (error) {
      copyFeedback.textContent = "복사에 실패했어요. 텍스트를 직접 선택해 복사해주세요.";
    }
    setTimeout(() => {
      copyFeedback.textContent = "";
    }, 4000);
  });
}
