// Edit this slide content directly, or use “Edit slides” in the presentation.
const presentationData = {
  slides: [
    {
      type: "title",
      kicker: "Project presentation",
      title: "Welcare Sanitech",
      subtitle: "Menstrual health and sanitation",
    },
    {
      kicker: "The challenge",
      title: "Menstrual hygiene in Kakuma and Kalobeyei",
      intro:
        "According to International Rescue Committee statistics, 65% of girls and women of reproductive age (15–35) living in Kakuma Refugee Camp and Kalobeyei Settlement experience poor menstrual hygiene and sanitation.",
      problems: [
        "Limited access to reusable sanitary pads",
        "Insufficient sanitary resources and funds",
        "Limited menstrual health awareness",
        "Social rejection and isolation",
        "Low self-esteem",
        "School dropouts and missed workdays",
      ],
    },
    {
      kicker: "Our solution",
      title: "Practical products. Better menstrual health.",
      description:
        "We will offer quality, safe pocket hand sanitizer and produce reusable sanitary pads, while equipping girls and women of reproductive age with menstrual management awareness.",
      outcomes: [
        { title: "Reusable pads", text: "A practical, reusable menstrual product." },
        { title: "Pocket sanitizer", text: "A convenient hygiene product to carry." },
        { title: "Awareness", text: "Menstrual management information and education." },
      ],
    },
    {
      kicker: "Theory of change",
      title: "Access and awareness can improve menstrual hygiene",
      description:
        "If reusable sanitary pads and pocket hand sanitizer are made available, girls and women of reproductive age can use them and build healthier menstrual hygiene practices.",
      outcomes: [
        { title: "Access", text: "Make reusable products available to the community." },
        { title: "Use", text: "Support informed, practical menstrual management." },
        { title: "Outcome", text: "Reduce menstrual hygiene challenges." },
      ],
    },
    {
      kicker: "Unique value proposition",
      title: "Affordable, useful products with community value",
      description:
        "We produce reusable sanitary pads and provide safe pocket hand sanitizer at affordable prices for girls and women of reproductive age. This helps them manage their menstrual cycle while supporting income for additional care.",
      callout:
        "Reusable menstrual products, convenient hygiene, and menstrual health awareness — brought together in one community-focused project.",
    },
    {
      kicker: "Sustainability plan",
      title: "A simple path to ongoing revenue",
      revenue: [
        {
          audience: "B2B · PHS",
          title: "KSh 7,500 / month",
          formula: "30 × KSh 250",
          annual: "KSh 90,000 per year",
        },
        {
          audience: "B2C · RSP",
          title: "KSh 20,000 / month",
          formula: "100 × KSh 200",
          annual: "KSh 240,000 per year",
        },
      ],
      note: "Estimates are based on the quantities and prices in the original project presentation.",
    },
  ],
};

const storageKey = "welcare-sanitech-slide-edits";
const stage = document.getElementById("slide-stage");
const dots = document.getElementById("slide-dots");
const count = document.getElementById("slide-count");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const editButton = document.getElementById("edit-button");
let currentSlide = 0;
let isEditing = false;

function readSavedEdits() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Saved slide edits could not be loaded.", error);
    return {};
  }
}

function saveEdits() {
  const edits = {};
  stage.querySelectorAll("[data-edit-key]").forEach((element) => {
    edits[element.dataset.editKey] = element.textContent;
  });

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(edits));
  } catch (error) {
    console.error("Slide edits could not be saved in this browser.", error);
  }
}

function editableText(key, value, tag = "p", className = "") {
  return `<${tag} class="${className}" data-edit-key="${key}">${value}</${tag}>`;
}

function renderOutcomes(slide, slideIndex) {
  return `
    <div class="outcome-row">
      ${slide.outcomes
        .map(
          (outcome, index) => `
            <article class="outcome">
              ${editableText(`slide-${slideIndex}-outcome-${index}-title`, outcome.title, "strong")}
              ${editableText(`slide-${slideIndex}-outcome-${index}-text`, outcome.text, "span")}
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderSlide(slide, slideIndex) {
  if (slide.type === "title") {
    return `
      <section class="slide title-slide" aria-label="Slide ${slideIndex + 1}">
        ${editableText(`slide-${slideIndex}-kicker`, slide.kicker, "p", "slide-kicker")}
        <div class="logo-seal" aria-label="Welcare Hygiene and Sanitation">
          <div>
            ${editableText(`slide-${slideIndex}-title`, slide.title, "strong")}
            <span class="logo-symbol" aria-hidden="true">🩸</span>
            ${editableText(`slide-${slideIndex}-subtitle`, slide.subtitle, "span")}
          </div>
        </div>
        ${editableText(`slide-${slideIndex}-title-caption`, slide.title, "h1")}
        ${editableText(`slide-${slideIndex}-subtitle-caption`, slide.subtitle, "p")}
      </section>
    `;
  }

  const intro =
    slide.intro &&
    editableText(`slide-${slideIndex}-intro`, slide.intro, "p", "problem-intro");
  const description =
    slide.description && editableText(`slide-${slideIndex}-description`, slide.description);
  const problems =
    slide.problems &&
    `<div class="problem-grid">${slide.problems
      .map(
        (problem, index) =>
          `<div class="problem-item" data-edit-key="slide-${slideIndex}-problem-${index}">${problem}</div>`,
      )
      .join("")}</div>`;
  const outcomes = slide.outcomes && renderOutcomes(slide, slideIndex);
  const callout =
    slide.callout &&
    `<div class="value-callout">${editableText(`slide-${slideIndex}-callout`, slide.callout)}</div>`;
  const revenue =
    slide.revenue &&
    `<div class="sustainability-grid">${slide.revenue
      .map(
        (item, index) => `
          <article class="revenue-card">
            ${editableText(`slide-${slideIndex}-audience-${index}`, item.audience, "p", "audience")}
            ${editableText(`slide-${slideIndex}-revenue-title-${index}`, item.title, "h3")}
            ${editableText(`slide-${slideIndex}-formula-${index}`, item.formula)}
            ${editableText(`slide-${slideIndex}-annual-${index}`, item.annual, "p", "annual")}
          </article>
        `,
      )
      .join("")}</div>
      ${editableText(`slide-${slideIndex}-note`, slide.note, "p", "slide-note")}`;

  return `
    <section class="slide" aria-label="Slide ${slideIndex + 1}">
      ${editableText(`slide-${slideIndex}-kicker`, slide.kicker, "p", "slide-kicker")}
      ${editableText(`slide-${slideIndex}-title`, slide.title, "h2")}
      ${intro || description || ""}
      ${problems || ""}
      ${outcomes || ""}
      ${callout || ""}
      ${revenue || ""}
    </section>
  `;
}

function renderDeck() {
  stage.innerHTML = presentationData.slides.map(renderSlide).join("");
  dots.innerHTML = presentationData.slides
    .map(
      (_, index) =>
        `<button class="slide-dot" type="button" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>`,
    )
    .join("");

  const savedEdits = readSavedEdits();
  stage.querySelectorAll("[data-edit-key]").forEach((element) => {
    const key = element.dataset.editKey;
    if (Object.hasOwn(savedEdits, key)) {
      element.textContent = savedEdits[key];
    }
  });

  showSlide(currentSlide);
}

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, presentationData.slides.length - 1));

  stage.querySelectorAll(".slide").forEach((slide, slideIndex) => {
    const active = slideIndex === currentSlide;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });

  dots.querySelectorAll(".slide-dot").forEach((dot, dotIndex) => {
    if (dotIndex === currentSlide) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  count.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(
    presentationData.slides.length,
  ).padStart(2, "0")}`;
  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === presentationData.slides.length - 1;
}

function setEditMode(enabled) {
  isEditing = enabled;
  document.body.classList.toggle("edit-mode", isEditing);
  stage.querySelectorAll("[data-edit-key]").forEach((element) => {
    element.contentEditable = String(isEditing);
    element.spellcheck = isEditing;
  });
  editButton.textContent = isEditing ? "Done editing" : "Edit slides";
  editButton.setAttribute("aria-pressed", String(isEditing));
  if (!isEditing) saveEdits();
}

previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
editButton.addEventListener("click", () => setEditMode(!isEditing));
dots.addEventListener("click", (event) => {
  const button = event.target.closest("[data-slide]");
  if (button) showSlide(Number(button.dataset.slide));
});
stage.addEventListener("input", (event) => {
  if (isEditing && event.target.matches("[data-edit-key]")) saveEdits();
});
document.addEventListener("keydown", (event) => {
  if (event.target.isContentEditable) return;
  if (event.key === "ArrowRight") showSlide(currentSlide + 1);
  if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
});

renderDeck();
