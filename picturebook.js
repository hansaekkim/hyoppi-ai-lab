const topicInput = document.getElementById("pb-topic");
const ageSelect = document.getElementById("pb-age");
const extraInput = document.getElementById("pb-extra");
const extraCount = document.getElementById("pb-extra-count");
const generateBtn = document.getElementById("pb-generate-btn");
const regenerateBtn = document.getElementById("pb-regenerate-btn");
const exampleBtn = document.getElementById("pb-example-btn");
const copyBtn = document.getElementById("pb-copy-btn");
const copyFeedback = document.getElementById("pb-copy-feedback");
const resultBox = document.getElementById("pb-result");
const resultTitle = document.getElementById("pb-result-title");
const resultScenes = document.getElementById("pb-result-scenes");

if (generateBtn) {
  const PROTAGONISTS_BY_AGE = {
    "3-4": ["아기 토끼", "작은 병아리", "몽실이", "아기 곰"],
    "5-7": ["씩씩한 토끼", "호기심 많은 곰돌이", "다은이", "별이"],
    "8-9": ["탐험가 준이", "용감한 하늘이", "똑똑한 여우 두리", "다정한 나무"],
    "10-12": ["모험가 시우", "생각 많은 리아", "씩씩한 로봇 두리", "별빛 마을의 우주"],
  };

  const TONE_ADJECTIVES = {
    "3-4": ["포근한", "아기자기한", "말랑말랑한"],
    "5-7": ["다정한", "따뜻한", "포근한"],
    "8-9": ["씩씩한", "두근두근한", "신나는"],
    "10-12": ["잔잔한", "묵직한", "성장하는"],
  };

  const TITLE_TEMPLATES = [
    (topic, hero) => `${gwaWa(hero)} 함께하는 ${topic} 이야기`,
    (topic, hero) => `${eulReul(topic)} 찾아 떠난 ${hero}`,
    (topic, hero) => `${hero}의 특별한 ${topic}`,
    (topic, hero) => `오늘, ${eunNeun(topic)} 시작돼요`,
  ];

  const SCENE_TEMPLATES = [
    {
      label: "1장. 이야기의 시작",
      variants: [
        (topic, hero, tone) => `${eunNeun(hero)} 여느 때처럼 ${tone} 하루를 보내고 있었어요. 그런데 오늘은 ${iGa(topic)} 유난히 마음에 걸렸어요.`,
        (topic, hero, tone) => `${tone} 마을에 사는 ${eunNeun(hero)} 아직 ${iGa(topic)} 무엇인지 잘 몰랐어요.`,
      ],
    },
    {
      label: "2장. 두근두근 사건",
      variants: [
        (topic, hero) => `어느 날, ${eunNeun(hero)} ${gwaWa(topic)} 관련된 작은 문제를 마주하게 되었어요.`,
        (topic, hero) => `친구들과 놀던 중, ${iGa(topic)} 없이는 해결할 수 없는 일이 생기고 말았어요.`,
      ],
    },
    {
      label: "3장. 좌충우돌 도전",
      variants: [
        (topic, hero) => `${eunNeun(hero)} 여러 번 실패했지만, 포기하지 않고 ${eulReul(topic)} 향해 한 걸음씩 나아갔어요.`,
        (topic, hero) => `쉽지 않았지만 ${eunNeun(hero)} 친구들과 힘을 모아 ${eulReul(topic)} 배워가기 시작했어요.`,
      ],
    },
    {
      label: "4장. 반짝이는 깨달음",
      variants: [
        (topic, hero) => `그 순간 ${eunNeun(hero)} 깨달았어요. ${eunNeun(topic)} 멀리 있는 게 아니라, 바로 마음속에 있었다는 것을요.`,
        (topic, hero) => `${eunNeun(hero)} 웃으며 말했어요. "${eunNeun(topic)} 혼자가 아니라 함께할 때 더 빛나는구나!"`,
      ],
    },
    {
      label: "5장. 행복한 마무리",
      variants: [
        (topic, hero) => `${eunNeun(hero)} 이제 ${eulReul(topic)} 마음에 품고, 내일도 씩씩하게 하루를 시작하기로 했어요.`,
        (topic, hero) => `그날 이후 ${eunNeun(hero)} 친구들에게 ${eulReul(topic)} 나누는 다정한 이웃이 되었답니다.`,
      ],
    },
  ];

  const EXAMPLE_STORY = {
    title: "토끼와 함께하는 용기 이야기",
    scenes: [
      { label: "1장. 이야기의 시작", text: "다정한 마을에 사는 아기 토끼는 여느 때처럼 포근한 하루를 보내고 있었어요. 그런데 오늘은 용기가 유난히 마음에 걸렸어요." },
      { label: "2장. 두근두근 사건", text: "친구들과 놀던 중, 용기가 없이는 건널 수 없는 커다란 통나무 다리를 마주하게 되었어요." },
      { label: "3장. 좌충우돌 도전", text: "아기 토끼는 여러 번 망설였지만, 포기하지 않고 다리를 향해 한 걸음씩 나아갔어요." },
      { label: "4장. 반짝이는 깨달음", text: "그 순간 아기 토끼는 깨달았어요. 용기는 멀리 있는 게 아니라, 바로 마음속에 있었다는 것을요." },
      { label: "5장. 행복한 마무리", text: "그날 이후 아기 토끼는 친구들에게 용기를 나누는 다정한 이웃이 되었답니다." },
    ],
  };

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

  function iGa(word) {
    return hasBatchim(word) ? `${word}이` : `${word}가`;
  }

  function eulReul(word) {
    return hasBatchim(word) ? `${word}을` : `${word}를`;
  }

  function gwaWa(word) {
    return hasBatchim(word) ? `${word}과` : `${word}와`;
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function buildStory(topic, ageGroup) {
    const heroes = PROTAGONISTS_BY_AGE[ageGroup] || PROTAGONISTS_BY_AGE["5-7"];
    const tones = TONE_ADJECTIVES[ageGroup] || TONE_ADJECTIVES["5-7"];
    const hero = pick(heroes);
    const tone = pick(tones);

    const title = pick(TITLE_TEMPLATES)(topic, hero);
    const scenes = SCENE_TEMPLATES.map((scene) => ({
      label: scene.label,
      text: pick(scene.variants)(topic, hero, tone),
    }));

    return { title, scenes };
  }

  function renderStory(story, extraNote) {
    resultTitle.textContent = `📚 ${story.title}`;
    resultScenes.innerHTML = "";

    story.scenes.forEach((scene) => {
      const li = document.createElement("li");
      const label = document.createElement("span");
      label.className = "pb-scene-label";
      label.textContent = scene.label;
      const text = document.createElement("span");
      text.textContent = scene.text;
      li.appendChild(label);
      li.appendChild(text);
      resultScenes.appendChild(li);
    });

    if (extraNote) {
      const li = document.createElement("li");
      const label = document.createElement("span");
      label.className = "pb-scene-label";
      label.textContent = "작가의 한마디";
      const text = document.createElement("span");
      text.textContent = extraNote;
      li.appendChild(label);
      li.appendChild(text);
      resultScenes.appendChild(li);
    }

    resultBox.hidden = false;
    copyFeedback.textContent = "";
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  let lastStory = null;
  let lastExtraNote = "";

  function generate() {
    const topic = topicInput.value.trim();
    if (!topic) {
      topicInput.focus();
      return;
    }

    const ageGroup = ageSelect.value;
    const extraNote = extraInput.value.trim();

    lastStory = buildStory(topic, ageGroup);
    lastExtraNote = extraNote;
    renderStory(lastStory, extraNote);
  }

  function buildCopyText(story, extraNote) {
    const lines = [`📚 ${story.title}`, ""];
    story.scenes.forEach((scene) => {
      lines.push(`[${scene.label}]`);
      lines.push(scene.text);
      lines.push("");
    });
    if (extraNote) {
      lines.push("[작가의 한마디]");
      lines.push(extraNote);
    }
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

  exampleBtn.addEventListener("click", () => {
    lastStory = EXAMPLE_STORY;
    lastExtraNote = "";
    renderStory(lastStory, "");
  });

  copyBtn.addEventListener("click", async () => {
    if (!lastStory) return;
    const text = buildCopyText(lastStory, lastExtraNote);
    try {
      await navigator.clipboard.writeText(text);
      copyFeedback.textContent = "복사되었어요! 블로그 글쓰기 화면에 붙여넣기 해보세요.";
    } catch (error) {
      copyFeedback.textContent = "복사에 실패했어요. 텍스트를 직접 선택해 복사해주세요.";
    }
    setTimeout(() => {
      copyFeedback.textContent = "";
    }, 4000);
  });
}
