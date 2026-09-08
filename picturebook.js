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
    toddler: ["아기 토끼", "작은 병아리", "몽실이", "아기 곰"],
    child: ["탐험가 준이", "용감한 하늘이", "똑똑한 여우 두리", "다정한 별이"],
    teen: ["고민 많은 지우", "꿈 많은 태오", "섬세한 소율", "조용한 은우"],
    adult: ["바쁜 하루를 보내던 지안", "다시 시작하려는 그 사람", "평범한 회사원 서윤", "마음이 지친 한 사람"],
    senior: ["정원을 가꾸는 할아버지", "인생을 되돌아보는 할머니", "오랜 친구를 그리워하는 노신사", "평생의 이야기를 모아온 어르신"],
  };

  const TONE_ADJECTIVES = {
    toddler: ["포근한", "아기자기한", "말랑말랑한"],
    child: ["씩씩한", "두근두근한", "신나는"],
    teen: ["풋풋한", "흔들리는", "성장하는"],
    adult: ["잔잔한", "담담한", "위로가 되는"],
    senior: ["따뜻한", "그리운", "잔잔한"],
  };

  const TITLE_TEMPLATES = [
    (topic, hero) => `${gwaWa(hero)} 함께하는 ${topic} 이야기`,
    (topic, hero) => `${eulReul(topic)} 찾아 떠난 ${hero}`,
    (topic, hero) => `${hero}의 특별한 ${topic}`,
    (topic, hero) => `오늘, ${eunNeun(topic)} 시작돼요`,
  ];

  const SENIOR_TITLE_TEMPLATES = [
    (topic, hero) => `지나온 날들 속의 ${topic}`,
    (topic, hero) => `${iGa(hero)} 되돌아보는 ${topic}`,
    (topic, hero) => `삶이 전하는 ${topic}`,
    (topic, hero) => `${topic}, 그리고 남은 날들의 이야기`,
  ];

  const AGE_STYLE = {
    toddler: "young",
    child: "young",
    teen: "grown",
    adult: "grown",
    senior: "senior",
  };

  const SCENE_TEMPLATES = [
    {
      label: "1장. 이야기의 시작",
      young: [
        (topic, hero, tone) => `${eunNeun(hero)} 여느 때처럼 ${tone} 하루를 보내고 있었어요. 그런데 오늘은 ${iGa(topic)} 유난히 마음에 걸렸어요.`,
        (topic, hero, tone) => `${tone} 마을에 사는 ${eunNeun(hero)} 아직 ${iGa(topic)} 무엇인지 잘 몰랐어요.`,
      ],
      grown: [
        (topic, hero, tone) => `${eunNeun(hero)} 여느 때처럼 ${tone} 하루를 보내고 있었어요. 그런데 요즘 들어 ${iGa(topic)} 자꾸만 마음에 걸렸어요.`,
        (topic, hero, tone) => `${tone} 시간을 보내던 ${eunNeun(hero)} 문득 ${iGa(topic)} 무엇인지 다시 생각하게 되었어요.`,
      ],
    },
    {
      label: "2장. 두근두근 사건",
      young: [
        (topic, hero) => `어느 날, ${eunNeun(hero)} ${gwaWa(topic)} 관련된 작은 문제를 마주하게 되었어요.`,
        (topic, hero) => `친구들과 놀던 중, ${iGa(topic)} 없이는 해결할 수 없는 일이 생기고 말았어요.`,
      ],
      grown: [
        (topic, hero) => `어느 날, ${eunNeun(hero)} ${gwaWa(topic)} 관련된 뜻밖의 고민과 마주하게 되었어요.`,
        (topic, hero) => `바쁜 일상 속에서, ${iGa(topic)} 없이는 답을 찾기 어려운 순간이 찾아왔어요.`,
      ],
    },
    {
      label: "3장. 좌충우돌 도전",
      young: [
        (topic, hero) => `${eunNeun(hero)} 여러 번 실패했지만, 포기하지 않고 ${eulReul(topic)} 향해 한 걸음씩 나아갔어요.`,
        (topic, hero) => `쉽지 않았지만 ${eunNeun(hero)} 친구들과 힘을 모아 ${eulReul(topic)} 배워가기 시작했어요.`,
      ],
      grown: [
        (topic, hero) => `${eunNeun(hero)} 여러 번 흔들렸지만, 포기하지 않고 ${eulReul(topic)} 향해 한 걸음씩 나아갔어요.`,
        (topic, hero) => `쉽지 않았지만 ${eunNeun(hero)} 주변 사람들과 마음을 나누며 ${eulReul(topic)} 다시 배워가기 시작했어요.`,
      ],
    },
    {
      label: "4장. 반짝이는 깨달음",
      young: [
        (topic, hero) => `그 순간 ${eunNeun(hero)} 깨달았어요. ${eunNeun(topic)} 멀리 있는 게 아니라, 바로 마음속에 있었다는 것을요.`,
        (topic, hero) => `${eunNeun(hero)} 웃으며 말했어요. "${eunNeun(topic)} 혼자가 아니라 함께할 때 더 빛나는구나!"`,
      ],
      grown: [
        (topic, hero) => `그 순간 ${eunNeun(hero)} 조용히 깨달았어요. ${eunNeun(topic)} 멀리 있는 게 아니라, 이미 자신의 삶 속에 있었다는 것을요.`,
        (topic, hero) => `${eunNeun(hero)} 나지막이 되뇌었어요. "${eunNeun(topic)} 혼자가 아니라 함께할 때 더 빛나는구나."`,
      ],
    },
    {
      label: "5장. 행복한 마무리",
      young: [
        (topic, hero) => `${eunNeun(hero)} 이제 ${eulReul(topic)} 마음에 품고, 내일도 씩씩하게 하루를 시작하기로 했어요.`,
        (topic, hero) => `그날 이후 ${eunNeun(hero)} 친구들에게 ${eulReul(topic)} 나누는 다정한 이웃이 되었답니다.`,
      ],
      grown: [
        (topic, hero) => `${eunNeun(hero)} 이제 ${eulReul(topic)} 마음에 품고, 내일을 조금 더 다정하게 맞이하기로 했어요.`,
        (topic, hero) => `그날 이후 ${eunNeun(hero)} 주변 사람들과 ${eulReul(topic)} 나누는, 조금 더 다정한 사람이 되었답니다.`,
      ],
    },
  ];

  const SENIOR_SCENE_TEMPLATES = [
    {
      label: "1장. 지나온 날들 (추억)",
      variants: [
        (topic, hero, tone) => `${eunNeun(hero)} ${tone} 오후, 지나온 날들을 가만히 떠올려 보았어요. 돌이켜보면 그 안엔 늘 ${iGa(topic)} 함께하고 있었어요.`,
        (topic, hero, tone) => `${eunNeun(hero)} 오래된 사진첩을 넘기듯 ${tone} 마음으로 ${eulReul(topic)} 하나씩 떠올려 보았어요.`,
      ],
    },
    {
      label: "2장. 지금의 삶",
      variants: [
        (topic, hero) => `${eunNeun(hero)} 오늘의 하루를 가만히 바라보았어요. 젊은 날과는 다르지만, ${eunNeun(topic)} 여전히 마음 한켠에 남아 있었어요.`,
        (topic, hero) => `이제는 조금 느려진 걸음으로, ${eunNeun(hero)} 지금 이 순간의 ${eulReul(topic)} 가만히 들여다보았어요.`,
      ],
    },
    {
      label: "3장. 마음의 위로",
      variants: [
        (topic, hero) => `${eunNeun(hero)} 스스로에게 조용히 말을 건넸어요. "그동안 참 애썼다. ${eunNeun(topic)} 몰라도 괜찮았어."`,
        (topic, hero) => `힘들었던 시간들도 있었지만, ${eunNeun(hero)} 그 모든 순간이 ${eulReul(topic)} 향한 여정이었음을 느끼며 마음이 편안해졌어요.`,
      ],
    },
    {
      label: "4장. 잔잔한 깨달음",
      variants: [
        (topic, hero) => `그 순간 ${eunNeun(hero)} 깨달았어요. ${eunNeun(topic)} 화려한 곳에 있는 게 아니라, 지나온 삶 하나하나에 스며 있었다는 것을요.`,
        (topic, hero) => `${eunNeun(hero)} 나지막이 되뇌었어요. "${eunNeun(topic)} 늦지 않았구나. 지금부터도 충분하구나."`,
      ],
    },
    {
      label: "5장. 앞으로의 바람 (희망)",
      variants: [
        (topic, hero) => `${eunNeun(hero)} 남은 날들도 ${eulReul(topic)} 마음에 품고, 소중한 사람들과 더 따뜻하게 걸어가고 싶어졌어요.`,
        (topic, hero) => `그날 이후 ${eunNeun(hero)} 하루하루를 ${eulReul(topic)} 품은 채, 감사한 마음으로 채워가기로 했답니다.`,
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
    const heroes = PROTAGONISTS_BY_AGE[ageGroup] || PROTAGONISTS_BY_AGE.toddler;
    const tones = TONE_ADJECTIVES[ageGroup] || TONE_ADJECTIVES.toddler;
    const style = AGE_STYLE[ageGroup] || "young";
    const hero = pick(heroes);
    const tone = pick(tones);

    if (style === "senior") {
      const title = pick(SENIOR_TITLE_TEMPLATES)(topic, hero);
      const scenes = SENIOR_SCENE_TEMPLATES.map((scene) => ({
        label: scene.label,
        text: pick(scene.variants)(topic, hero, tone),
      }));
      return { title, scenes };
    }

    const title = pick(TITLE_TEMPLATES)(topic, hero);
    const scenes = SCENE_TEMPLATES.map((scene) => ({
      label: scene.label,
      text: pick(scene[style])(topic, hero, tone),
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
