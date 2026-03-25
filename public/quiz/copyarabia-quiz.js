/*
 * Logic for rendering the CopyArabia copywriting quiz.
 */
(function () {
  const QUIZ = {
    title: "Copywriting Skills Quiz",
    ctaText: "Join the A to Z Copywriting Course",
    ctaUrl: "https://atozcopywritingcourse.thinkific.com/courses/atozcopywritingcourse",
    questions: [
      {
        q: "What is the primary purpose of a headline in copywriting?",
        choices: [
          "To explain every feature in detail",
          "To grab attention and make the reader continue",
          "To sound clever and artistic",
          "To summarize the entire brand story",
        ],
        correct: 1,
        hint: "Think about the first psychological hook.",
      },
      {
        q: "Which element is most critical for persuasive copy?",
        choices: [
          "Complex vocabulary",
          "Clear understanding of the target audience",
          "Long sentences",
          "Formal tone",
        ],
        correct: 1,
        hint: "Good copy starts before writing.",
      },
      {
        q: "What does AIDA stand for in copywriting?",
        choices: [
          "Awareness, Interest, Desire, Action",
          "Attention, Interest, Desire, Action",
          "Attraction, Interaction, Decision, Action",
          "Attention, Information, Direction, Action",
        ],
        correct: 1,
        hint: "It is a classic persuasion framework.",
      },
      {
        q: "Which CTA is strongest?",
        choices: [
          "Click here",
          "Learn more about our services",
          "Start your free trial today",
          "If you have time, check this out",
        ],
        correct: 2,
        hint: "Clarity plus immediacy usually wins.",
      },
      {
        q: "What is a key difference between features and benefits?",
        choices: [
          "Features describe the company; benefits describe the product",
          "Features explain what it is; benefits explain why it matters",
          "Features are emotional; benefits are technical",
          "There is no real difference",
        ],
        correct: 1,
        hint: "Always answer: so what?",
      },
      {
        q: "Which tone is generally most effective in modern digital copy?",
        choices: [
          "Authoritative and distant",
          "Conversational and human",
          "Overly poetic",
          "Academic and complex",
        ],
        correct: 1,
        hint: "Think clear, direct, human.",
      },
      {
        q: "What is the goal of social proof in copy?",
        choices: [
          "To show creativity",
          "To reduce perceived risk",
          "To increase word count",
          "To improve grammar",
        ],
        correct: 1,
        hint: "It reassures hesitant buyers.",
      },
      {
        q: "Which metric best reflects copy effectiveness?",
        choices: [
          "Word count",
          "Engagement or conversion rate",
          "Font choice",
          "Brand colours",
        ],
        correct: 1,
        hint: "Results beat aesthetics.",
      },
      {
        q: "What is ‘above the fold’ copy?",
        choices: [
          "Text hidden at the bottom of a page",
          "Content visible before scrolling",
          "Legal disclaimers",
          "Footer navigation text",
        ],
        correct: 1,
        hint: "The first screen view.",
      },
      {
        q: "What is the biggest mistake beginner copywriters make?",
        choices: [
          "Writing too short",
          "Focusing on themselves instead of the audience",
          "Using simple language",
          "Editing too much",
        ],
        correct: 1,
        hint: "Copy is about the reader.",
      },
    ],
  };

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach((c) => node.appendChild(c));
    return node;
  }

  function renderQuiz(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;

    const state = {
      idx: 0,
      answers: Array(QUIZ.questions.length).fill(null),
      score: 0,
      finished: false,
    };

    const card = el("section", { class: "caq-card", "aria-labelledby": "caq-title" });
    const header = el("header");
    const title = el("h2", { class: "caq-title", id: "caq-title" }, [document.createTextNode(QUIZ.title)]);
    const intro = el("p", { class: "caq-intro", id: "caq-intro" }, [
      document.createTextNode(
        "For beginner to intermediate writers, this quick self-assessment highlights where your copywriting fundamentals are strong and where to improve next."
      ),
    ]);
    const meta = el("p", { class: "caq-meta", "aria-live": "polite" }, []);
    header.appendChild(title);
    header.appendChild(intro);
    header.appendChild(meta);

    const questionWrap = el("section", { class: "caq-questionWrap", "aria-labelledby": "caq-question-text", "aria-describedby": "caq-hint" });
    const qText = el("h3", { class: "caq-q", id: "caq-question-text" }, []);
    const choicesWrap = el("fieldset", { class: "caq-choiceGroup", "aria-describedby": "caq-hint" });
    const choicesLegend = el("legend", { class: "caq-srOnly" }, []);
    const hint = el("p", { class: "caq-hint", id: "caq-hint", "aria-live": "polite" }, []);

    choicesWrap.appendChild(choicesLegend);
    questionWrap.appendChild(qText);
    questionWrap.appendChild(choicesWrap);
    questionWrap.appendChild(hint);

    const actions = el("nav", { class: "caq-actions", "aria-label": "Quiz navigation controls" });
    const backBtn = el("button", { class: "caq-btn", type: "button", "aria-label": "Go to previous question" }, [document.createTextNode("Back")]);
    const nextBtn = el("button", { class: "caq-btn caq-btnPrimary", type: "button", "aria-label": "Go to next question" }, [document.createTextNode("Next")]);
    actions.appendChild(backBtn);
    actions.appendChild(nextBtn);

    const resultWrap = el("section", { class: "caq-resultWrap", role: "status", "aria-live": "polite", "aria-atomic": "true", "aria-label": "Quiz results" });

    function scoreBand(score, total) {
      const pct = Math.round((score / total) * 100);
      if (pct >= 80) return { label: "Strong", msg: "You already think like a copywriter. Your next jump is consistency and portfolio output." };
      if (pct >= 50) return { label: "Developing", msg: "You have solid instincts. Sharpen structure, CTAs, and testing mindset to level up fast." };
      return { label: "Starter", msg: "You have the basics. A clear framework will upgrade you quickly, especially in headlines and benefits." };
    }

    function renderQuestion() {
      const total = QUIZ.questions.length;
      const i = state.idx;
      const item = QUIZ.questions[i];
      meta.textContent = "Question " + (i + 1) + " of " + total;
      qText.textContent = item.q;
      choicesLegend.textContent = item.q;
      choicesWrap.innerHTML = "";
      choicesWrap.appendChild(choicesLegend);
      hint.textContent = "";

      const list = el("ul", { class: "caq-choiceList" });

      item.choices.forEach((c, choiceIndex) => {
        const li = el("li", { class: "caq-choiceItem" });
        const inputId = "caq-q" + i + "-choice" + choiceIndex;
        const input = el("input", {
          class: "caq-choiceInput",
          type: "radio",
          name: "caq-question-" + i,
          id: inputId,
          value: String(choiceIndex),
        });
        const label = el("label", {
          class: "caq-choice",
          for: inputId,
        }, [document.createTextNode(c)]);

        input.addEventListener("change", () => {
          if (!input.checked) return;
          state.answers[i] = choiceIndex;
          if (item.hint) hint.textContent = "Hint: " + item.hint;
        });

        li.appendChild(input);
        li.appendChild(label);
        list.appendChild(li);
      });

      choicesWrap.appendChild(list);

      backBtn.disabled = i === 0;
      nextBtn.textContent = i === total - 1 ? "Finish" : "Next";
      nextBtn.setAttribute("aria-label", i === total - 1 ? "Finish quiz and see result" : "Go to next question");

      const selected = state.answers[i];
      if (selected !== null) {
        const selectedInput = choicesWrap.querySelectorAll(".caq-choiceInput")[selected];
        if (selectedInput) selectedInput.checked = true;
        if (item.hint) hint.textContent = "Hint: " + item.hint;
      }

      resultWrap.innerHTML = "";
    }

    function finishQuiz() {
      const total = QUIZ.questions.length;
      let score = 0;
      for (let i = 0; i < total; i++) {
        if (state.answers[i] === QUIZ.questions[i].correct) score++;
      }
      state.score = score;
      state.finished = true;
      const band = scoreBand(score, total);

      resultWrap.innerHTML = "";
      const result = el("p", { class: "caq-result" }, [
        document.createTextNode("Your score: " + score + " out of " + total + ". Level: " + band.label + ". " + band.msg),
      ]);

      const cta = el("a", { class: "caq-cta", href: QUIZ.ctaUrl, target: "_blank", rel: "noopener", "aria-label": QUIZ.ctaText }, [
        document.createTextNode(QUIZ.ctaText),
      ]);
      const restart = el("button", { class: "caq-btn", type: "button", "aria-label": "Restart quiz from question one" }, [
        document.createTextNode("Restart quiz"),
      ]);
      restart.addEventListener("click", () => {
        state.idx = 0;
        state.answers = Array(total).fill(null);
        state.finished = false;
        renderQuestion();
      });

      resultWrap.appendChild(result);
      resultWrap.appendChild(cta);
      resultWrap.appendChild(document.createElement("br"));
      resultWrap.appendChild(restart);
    }

    backBtn.addEventListener("click", () => {
      if (state.idx > 0) {
        state.idx--;
        renderQuestion();
      }
    });

    nextBtn.addEventListener("click", () => {
      const total = QUIZ.questions.length;
      if (state.answers[state.idx] === null) {
        hint.textContent = "Hint: Please select an answer to continue.";
        const firstInput = choicesWrap.querySelector(".caq-choiceInput");
        if (firstInput) firstInput.focus();
        return;
      }
      if (state.idx < total - 1) {
        state.idx++;
        renderQuestion();
      } else {
        finishQuiz();
      }
    });

    card.appendChild(header);
    card.appendChild(questionWrap);
    card.appendChild(actions);
    card.appendChild(resultWrap);

    mount.innerHTML = "";
    mount.appendChild(card);
    renderQuestion();
  }

  renderQuiz("copyarabia-quiz");
})();
