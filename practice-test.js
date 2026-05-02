// Digital SAT Practice Test — App Logic
// Original practice content. Not affiliated with College Board.

'use strict';

// ── Constants ────────────────────────────────────────────────
const STORAGE_KEY = 'digital-sat-practice-test-state-v1';
const STUDENT_NAME = 'Practice Student';

// ── State ────────────────────────────────────────────────────
function defaultState() {
  return {
    phase: 'intro',           // intro | module-transition | test | break | results
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    answers: {},              // questionId → string
    markedForReview: {},      // questionId → bool
    eliminatedChoices: {},    // questionId → string[]
    submittedModules: [false, false, false, false],
    moduleEndTimestamps: [null, null, null, null],
    breakEndTimestamp: null,
    testCompleted: false,
    timerHidden: false,
    eliminationMode: {},      // questionId → bool (ABC-strike toggle)
  };
}

let state = loadState();
let timerInterval = null;
let resizing = false;

// ── Persistence ──────────────────────────────────────────────
function loadState() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return Object.assign(defaultState(), JSON.parse(s));
  } catch (_) {}
  return defaultState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  stopTimer();
}

// ── Timer ────────────────────────────────────────────────────
function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function moduleMinutes(idx) {
  return idx < 2 ? TEST_CONFIG.rwModuleMinutes : TEST_CONFIG.mathModuleMinutes;
}

function getRemainingMs(endTs) {
  return endTs ? Math.max(0, endTs - Date.now()) : 0;
}

function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function updateTestTimerDisplay() {
  const el = document.getElementById('pt-timer');
  if (!el) return;
  if (state.timerHidden) { el.textContent = '--:--'; el.className = 'pt-timer'; return; }
  const endTs = state.moduleEndTimestamps[state.currentModuleIndex];
  const sec = Math.floor(getRemainingMs(endTs) / 1000);
  el.textContent = formatTime(sec);
  el.className = sec < 60 ? 'pt-timer pt-timer--urgent'
    : sec < 300 ? 'pt-timer pt-timer--warning' : 'pt-timer';
}

function updateBreakTimerDisplay() {
  const el = document.getElementById('pt-break-timer');
  if (!el) return;
  const sec = Math.floor(getRemainingMs(state.breakEndTimestamp) / 1000);
  el.textContent = formatTime(sec);
  el.className = sec < 60 ? 'pt-break__timer pt-break__timer--urgent'
    : sec < 120 ? 'pt-break__timer pt-break__timer--warning' : 'pt-break__timer';
}

function startModuleTimer(moduleIndex) {
  stopTimer();
  if (!state.moduleEndTimestamps[moduleIndex]) {
    state.moduleEndTimestamps[moduleIndex] = Date.now() + moduleMinutes(moduleIndex) * 60 * 1000;
    saveState();
  }
  // Expired while away?
  if (Date.now() >= state.moduleEndTimestamps[moduleIndex]) {
    onModuleTimerExpired(moduleIndex); return;
  }
  updateTestTimerDisplay();
  timerInterval = setInterval(() => {
    updateTestTimerDisplay();
    if (Date.now() >= state.moduleEndTimestamps[state.currentModuleIndex]) {
      stopTimer(); onModuleTimerExpired(state.currentModuleIndex);
    }
  }, 500);
}

function startBreakTimerFn() {
  stopTimer();
  if (!state.breakEndTimestamp) {
    state.breakEndTimestamp = Date.now() + TEST_CONFIG.breakMinutes * 60 * 1000;
    saveState();
  }
  if (Date.now() >= state.breakEndTimestamp) { onBreakExpired(); return; }
  updateBreakTimerDisplay();
  timerInterval = setInterval(() => {
    updateBreakTimerDisplay();
    if (Date.now() >= state.breakEndTimestamp) { stopTimer(); onBreakExpired(); }
  }, 500);
}

function onModuleTimerExpired(moduleIndex) {
  state.submittedModules[moduleIndex] = true;
  saveState();
  advanceAfterModule(moduleIndex);
}

function onBreakExpired() { doStartModule(2); }

// ── Flow Control ──────────────────────────────────────────────
function advanceAfterModule(moduleIndex) {
  stopTimer();
  if (moduleIndex === 1) {
    // After RW Module 2 → break
    state.phase = 'break';
    saveState();
    render();
    startBreakTimerFn();
  } else if (moduleIndex === 3) {
    state.phase = 'results';
    state.testCompleted = true;
    saveState();
    render();
  } else {
    state.phase = 'module-transition';
    saveState();
    render();
  }
}

function doStartModule(moduleIndex) {
  stopTimer();
  state.phase = 'test';
  state.currentModuleIndex = moduleIndex;
  state.currentQuestionIndex = 0;
  saveState();
  render();
  startModuleTimer(moduleIndex);
}

function continueToNextModule() {
  doStartModule(state.currentModuleIndex + 1);
}

// ── Answer Actions ────────────────────────────────────────────
function selectAnswer(questionId, value) {
  state.answers[questionId] = value;
  saveState();
}

function toggleMarkReview(questionId) {
  state.markedForReview[questionId] = !state.markedForReview[questionId];
  saveState();
}

function toggleEliminate(questionId, letter) {
  if (!state.eliminatedChoices[questionId]) state.eliminatedChoices[questionId] = [];
  const arr = state.eliminatedChoices[questionId];
  const i = arr.indexOf(letter);
  if (i === -1) arr.push(letter); else arr.splice(i, 1);
  saveState();
}

function toggleEliminationMode(questionId) {
  state.eliminationMode[questionId] = !state.eliminationMode[questionId];
  saveState();
}

// ── Scoring ───────────────────────────────────────────────────
function computeResults() {
  const modules = PRACTICE_TEST_DATA.modules.map((mod) => {
    let correct = 0;
    const questions = mod.questions.map((q) => {
      const userRaw = (state.answers[q.id] || '').trim();
      const correctRaw = q.correctAnswer.trim();
      // For MC: compare letter. For SPR: compare normalized strings.
      const isCorrect = userRaw.toUpperCase() === correctRaw.toUpperCase();
      if (isCorrect) correct++;
      return { ...q, userAnswer: userRaw, isCorrect, isUnanswered: !userRaw };
    });
    return { ...mod, questions, correct, total: mod.questions.length };
  });
  const totalCorrect = modules.reduce((s, m) => s + m.correct, 0);
  const totalQuestions = modules.reduce((s, m) => s + m.total, 0);
  return { modules, totalCorrect, totalQuestions };
}

// ── Submit Modal ──────────────────────────────────────────────
function showSubmitModal() {
  const overlay = document.getElementById('pt-submit-overlay');
  if (!overlay) return;
  const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
  const unanswered = mod.questions.filter(q => !state.answers[q.id]).length;
  const warningEl = document.getElementById('pt-modal-warning');
  const bodyEl = document.getElementById('pt-modal-body');
  if (unanswered > 0) {
    warningEl.textContent = `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}.`;
    warningEl.style.display = 'block';
    bodyEl.textContent = 'After submitting this module, you will not be able to return to it.';
  } else {
    warningEl.style.display = 'none';
    bodyEl.textContent = 'After submitting this module, you will not be able to return to it.';
  }
  overlay.classList.add('is-open');
}

function hideSubmitModal() {
  const overlay = document.getElementById('pt-submit-overlay');
  if (overlay) overlay.classList.remove('is-open');
}

function confirmSubmit() {
  hideSubmitModal();
  const idx = state.currentModuleIndex;
  state.submittedModules[idx] = true;
  saveState();
  advanceAfterModule(idx);
}

// ── Navigator ─────────────────────────────────────────────────
function openNavigator() {
  renderNavigatorPanel();
  const overlay = document.getElementById('pt-nav-overlay');
  if (overlay) overlay.classList.add('is-open');
}

function closeNavigator() {
  const overlay = document.getElementById('pt-nav-overlay');
  if (overlay) overlay.classList.remove('is-open');
}

function jumpToQuestion(index) {
  closeNavigator();
  state.currentQuestionIndex = index;
  saveState();
  renderQuestion();
}

// ── Main Render ───────────────────────────────────────────────
function render() {
  // Hide all screens
  document.querySelectorAll('.pt-screen').forEach(s => s.classList.remove('active'));

  switch (state.phase) {
    case 'intro':             renderIntro();      break;
    case 'module-transition': renderTransition(); break;
    case 'test':              renderTest();       break;
    case 'break':             renderBreak();      break;
    case 'results':           renderResults();    break;
    default: renderIntro();
  }

  // Re-init lucide icons for any new SVGs
  if (window.lucide) lucide.createIcons();
}

// ── Intro Screen ──────────────────────────────────────────────
function renderIntro() {
  document.getElementById('pt-intro-screen').classList.add('active');
}

// ── Module Transition Screen ──────────────────────────────────
function renderTransition() {
  const screen = document.getElementById('pt-transition-screen');
  screen.classList.add('active');

  const nextIdx = state.currentModuleIndex + 1;
  const nextMod = PRACTICE_TEST_DATA.modules[nextIdx];
  const doneMod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
  const mins = moduleMinutes(nextIdx);

  document.getElementById('pt-transition-done').textContent =
    doneMod.displayName + ' — Complete';
  document.getElementById('pt-transition-next-label').textContent =
    'Up Next: ' + nextMod.displayName;
  document.getElementById('pt-transition-time').textContent =
    `${mins} minutes`;
  document.getElementById('pt-transition-qcount').textContent =
    `${nextMod.questions.length} questions`;
}

// ── Test Screen ───────────────────────────────────────────────
function renderTest() {
  const screen = document.getElementById('pt-test-screen');
  screen.classList.add('active');

  const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
  document.getElementById('pt-section-title').textContent = mod.displayName;

  renderQuestion();
  updateTestTimerDisplay();
}

function renderQuestion() {
  const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
  const q = mod.questions[state.currentQuestionIndex];
  const totalQ = mod.questions.length;
  const qNum = state.currentQuestionIndex;

  // Question header
  document.getElementById('pt-question-num').textContent = q.number;
  const markBtn = document.getElementById('pt-mark-review-btn');
  const isMarked = !!state.markedForReview[q.id];
  markBtn.className = 'pt-mark-review-btn' + (isMarked ? ' is-marked' : '');
  markBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${isMarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> Mark for Review`;

  const elimBtn = document.getElementById('pt-elim-mode-btn');
  const elimMode = !!state.eliminationMode[q.id];
  elimBtn.className = 'pt-abc-strike-btn' + (elimMode ? ' is-active' : '');

  // Passage
  const leftPane = document.getElementById('pt-left-pane');
  const resizer = document.getElementById('pt-resizer');
  const rightPane = document.getElementById('pt-right-pane');
  const passageEl = document.getElementById('pt-passage');

  if (q.passage) {
    leftPane.classList.remove('pt-left-pane--hidden');
    resizer.classList.remove('pt-resizer--hidden');
    rightPane.classList.remove('pt-right-pane--full');
    // Handle two-text passages
    if (q.passage.startsWith('Text 1:')) {
      const parts = q.passage.split(/\n\nText 2:/);
      passageEl.innerHTML = `<div class="pt-passage--two-text">
        <div class="pt-passage__text-label">Text 1</div>
        <div>${escHtml(parts[0].replace('Text 1: ', ''))}</div>
        <div class="pt-passage__text-label">Text 2</div>
        <div>${escHtml(parts[1] || '')}</div>
      </div>`;
    } else {
      passageEl.textContent = q.passage;
    }
  } else {
    leftPane.classList.add('pt-left-pane--hidden');
    resizer.classList.add('pt-resizer--hidden');
    rightPane.classList.add('pt-right-pane--full');
  }

  // Question text
  document.getElementById('pt-question-text').textContent = q.prompt;

  // Choices
  const choicesContainer = document.getElementById('pt-choices-container');
  const sprContainer = document.getElementById('pt-spr-container');
  const selectedAnswer = state.answers[q.id] || '';
  const eliminated = state.eliminatedChoices[q.id] || [];

  if (q.type === 'multiple-choice') {
    sprContainer.classList.add('pt-hidden');
    choicesContainer.classList.remove('pt-hidden');
    choicesContainer.innerHTML = q.choices.map(c => {
      const isSelected = selectedAnswer === c.letter;
      const isEliminated = eliminated.includes(c.letter);
      const elimActive = !!state.eliminationMode[q.id];
      return `
        <div class="pt-option${isSelected ? ' is-selected' : ''}${isEliminated ? ' is-eliminated' : ''}"
             data-letter="${c.letter}"
             role="button" tabindex="0"
             aria-pressed="${isSelected}"
             aria-label="Choice ${c.letter}: ${c.text}">
          <div class="pt-option__content">
            <span class="pt-option__letter">${c.letter}</span>
            <span class="pt-option__text${isEliminated ? ' is-struck' : ''}">${escHtml(c.text)}</span>
          </div>
          ${elimActive ? `<button class="pt-eliminate-btn${isEliminated ? ' is-eliminated' : ''}"
              data-elim-letter="${c.letter}"
              aria-label="Eliminate choice ${c.letter}"
              title="Eliminate choice ${c.letter}">
            <span class="pt-eliminate-letter" style="font-size:10px;font-weight:700;">${c.letter}</span>
            ${isEliminated ? '<div class="pt-eliminate-btn__strike"></div>' : ''}
          </button>` : ''}
        </div>`;
    }).join('');

    // Bind choice clicks
    choicesContainer.querySelectorAll('.pt-option').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.pt-eliminate-btn')) return;
        selectAnswer(q.id, el.dataset.letter);
        renderQuestion();
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!e.target.closest('.pt-eliminate-btn')) {
            selectAnswer(q.id, el.dataset.letter);
            renderQuestion();
          }
        }
      });
    });

    // Bind eliminate buttons
    choicesContainer.querySelectorAll('.pt-eliminate-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleEliminate(q.id, btn.dataset.elimLetter);
        renderQuestion();
      });
    });

  } else {
    // Student-produced response
    choicesContainer.classList.add('pt-hidden');
    sprContainer.classList.remove('pt-hidden');
    const input = document.getElementById('pt-spr-input');
    input.value = selectedAnswer;
    input.oninput = () => { selectAnswer(q.id, input.value); };
  }

  // Nav buttons
  document.getElementById('pt-back-btn').disabled = qNum === 0;
  const nextBtn = document.getElementById('pt-next-btn');
  const isLast = qNum === totalQ - 1;
  nextBtn.textContent = isLast ? 'Next ›' : 'Next';

  // Footer question indicator
  document.getElementById('pt-q-indicator').textContent =
    `Question ${qNum + 1} of ${totalQ}`;

  // Scroll right pane to top on question change
  const rp = document.getElementById('pt-right-pane');
  if (rp) rp.scrollTop = 0;
  const lp = document.getElementById('pt-left-pane');
  if (lp) lp.scrollTop = 0;

  if (window.lucide) lucide.createIcons();
}

// ── Navigator Panel ───────────────────────────────────────────
function renderNavigatorPanel() {
  const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
  const panel = document.getElementById('pt-nav-panel');

  let answered = 0, unanswered = 0, marked = 0;
  mod.questions.forEach(q => {
    if (state.answers[q.id]) answered++; else unanswered++;
    if (state.markedForReview[q.id]) marked++;
  });

  document.getElementById('pt-nav-panel-title').textContent = mod.displayName;
  document.getElementById('pt-nav-answered-count').textContent = `${answered} answered`;
  document.getElementById('pt-nav-unanswered-count').textContent = `${unanswered} unanswered`;
  document.getElementById('pt-nav-marked-count').textContent = `${marked} marked`;

  const grid = document.getElementById('pt-nav-grid');
  grid.innerHTML = mod.questions.map((q, i) => {
    const isAnswered = !!state.answers[q.id];
    const isMarked = !!state.markedForReview[q.id];
    const isCurrent = i === state.currentQuestionIndex;
    let cls = 'pt-nav-cell';
    if (isMarked) cls += ' pt-nav-cell--marked';
    else if (isAnswered) cls += ' pt-nav-cell--answered';
    if (isCurrent) cls += ' pt-nav-cell--current';
    return `<button class="${cls}" data-qidx="${i}" aria-label="Go to question ${q.number}">${q.number}</button>`;
  }).join('');

  grid.querySelectorAll('.pt-nav-cell').forEach(cell => {
    cell.addEventListener('click', () => jumpToQuestion(parseInt(cell.dataset.qidx)));
  });
}

// ── Break Screen ──────────────────────────────────────────────
function renderBreak() {
  document.getElementById('pt-break-screen').classList.add('active');
  updateBreakTimerDisplay();
}

// ── Results Screen ────────────────────────────────────────────
function renderResults() {
  const screen = document.getElementById('pt-results-screen');
  screen.classList.add('active');

  const results = computeResults();
  const pct = Math.round((results.totalCorrect / results.totalQuestions) * 100);

  document.getElementById('pt-score-total').textContent = `${results.totalCorrect}/${results.totalQuestions}`;
  document.getElementById('pt-score-pct').textContent = `${pct}%`;

  // Module breakdown in score card
  const breakdownEl = document.getElementById('pt-score-breakdown');
  breakdownEl.innerHTML = results.modules.map(m => `
    <div class="pt-score-module">
      <div class="pt-score-module__name">${m.section} M${m.moduleNumber}</div>
      <div class="pt-score-module__score">${m.correct}/${m.total}</div>
    </div>
  `).join('');

  // Full review
  const reviewEl = document.getElementById('pt-review-sections');
  reviewEl.innerHTML = results.modules.map(m => `
    <div class="pt-review-section">
      <div class="pt-review-section__header">
        <span>${m.displayName}</span>
        <span class="pt-review-section__score">${m.correct} / ${m.total} correct</span>
      </div>
      ${m.questions.map(q => {
        const status = q.isUnanswered ? 'unanswered' : (q.isCorrect ? 'correct' : 'incorrect');
        const statusLabel = { correct: '✓', incorrect: '✗', unanswered: '—' }[status];
        const userDisp = q.isUnanswered ? 'No answer' : (q.type === 'multiple-choice' ? `Choice ${q.userAnswer.toUpperCase()}` : q.userAnswer);
        const correctDisp = q.type === 'multiple-choice' ? `Choice ${q.correctAnswer.toUpperCase()}` : q.correctAnswer;
        return `
          <div class="pt-review-item">
            <div class="pt-review-item__top">
              <div class="pt-review-item__status pt-review-item__status--${status}" aria-label="${status}">${statusLabel}</div>
              <div class="pt-review-item__q">Question ${q.number} — ${q.domain}</div>
            </div>
            <div class="pt-review-item__answers">
              <span><span class="pt-review-item__answer-label">Your answer: </span><span class="pt-review-item__answer--${q.isUnanswered ? 'unanswered' : (q.isCorrect ? 'correct' : 'incorrect')}">${escHtml(userDisp)}</span></span>
              <span><span class="pt-review-item__answer-label">Correct: </span><span class="pt-review-item__answer--correct">${escHtml(correctDisp)}</span></span>
            </div>
            <div class="pt-review-item__explanation">${escHtml(q.explanation)}</div>
          </div>`;
      }).join('')}
    </div>
  `).join('');
}

// ── Helper ────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Resizer ───────────────────────────────────────────────────
function initResizer() {
  const resizerEl = document.getElementById('pt-resizer');
  const leftPane = document.getElementById('pt-left-pane');
  const contentArea = document.getElementById('pt-content');

  resizerEl.addEventListener('mousedown', () => {
    resizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!resizing || leftPane.classList.contains('pt-left-pane--hidden')) return;
    const rect = contentArea.getBoundingClientRect();
    const newWidth = e.clientX - rect.left;
    const min = rect.width * 0.2;
    const max = rect.width * 0.75;
    if (newWidth >= min && newWidth <= max) {
      leftPane.style.flex = `0 0 ${newWidth}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (resizing) { resizing = false; document.body.style.cursor = ''; document.body.style.userSelect = ''; }
  });
}

// ── Event Wiring ──────────────────────────────────────────────
function wireEvents() {
  // Intro
  document.getElementById('pt-start-btn').addEventListener('click', () => {
    doStartModule(0);
  });

  document.getElementById('pt-reset-btn').addEventListener('click', () => {
    if (confirm('Reset all saved test progress?')) {
      resetState(); render();
    }
  });

  // Transition screen
  document.getElementById('pt-continue-btn').addEventListener('click', continueToNextModule);

  // Test screen: header
  document.getElementById('pt-hide-timer-btn').addEventListener('click', () => {
    state.timerHidden = !state.timerHidden;
    saveState();
    document.getElementById('pt-hide-timer-btn').textContent = state.timerHidden ? 'Show' : 'Hide';
    updateTestTimerDisplay();
  });

  // Test screen: mark for review
  document.getElementById('pt-mark-review-btn').addEventListener('click', () => {
    const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
    const q = mod.questions[state.currentQuestionIndex];
    toggleMarkReview(q.id);
    renderQuestion();
  });

  // Test screen: elimination mode
  document.getElementById('pt-elim-mode-btn').addEventListener('click', () => {
    const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
    const q = mod.questions[state.currentQuestionIndex];
    toggleEliminationMode(q.id);
    renderQuestion();
  });

  // Footer: back / next / submit
  document.getElementById('pt-back-btn').addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      saveState();
      renderQuestion();
    }
  });

  document.getElementById('pt-next-btn').addEventListener('click', () => {
    const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
    if (state.currentQuestionIndex < mod.questions.length - 1) {
      state.currentQuestionIndex++;
      saveState();
      renderQuestion();
    } else {
      showSubmitModal();
    }
  });

  document.getElementById('pt-submit-module-btn').addEventListener('click', showSubmitModal);

  // Footer: navigator
  document.getElementById('pt-nav-toggle-btn').addEventListener('click', openNavigator);

  // Navigator overlay
  document.getElementById('pt-nav-close-btn').addEventListener('click', closeNavigator);
  document.getElementById('pt-nav-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('pt-nav-overlay')) closeNavigator();
  });
  document.getElementById('pt-nav-submit-btn').addEventListener('click', () => {
    closeNavigator(); showSubmitModal();
  });

  // Submit modal
  document.getElementById('pt-modal-cancel-btn').addEventListener('click', hideSubmitModal);
  document.getElementById('pt-modal-confirm-btn').addEventListener('click', confirmSubmit);
  document.getElementById('pt-submit-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('pt-submit-overlay')) hideSubmitModal();
  });

  // Break screen
  document.getElementById('pt-end-break-btn').addEventListener('click', () => {
    stopTimer();
    doStartModule(2);
  });

  // Results screen
  document.getElementById('pt-restart-btn').addEventListener('click', () => {
    resetState(); render();
  });

  // Keyboard: A/B/C/D to select answers in MC
  document.addEventListener('keydown', (e) => {
    if (state.phase !== 'test') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const key = e.key.toUpperCase();
    if (['A', 'B', 'C', 'D'].includes(key)) {
      const mod = PRACTICE_TEST_DATA.modules[state.currentModuleIndex];
      const q = mod.questions[state.currentQuestionIndex];
      if (q.type === 'multiple-choice' && q.choices.find(c => c.letter === key)) {
        selectAnswer(q.id, key);
        renderQuestion();
      }
    }
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  wireEvents();
  initResizer();

  // Set hide button initial state
  document.getElementById('pt-hide-timer-btn').textContent = state.timerHidden ? 'Show' : 'Hide';

  render();

  // Resume timer if mid-test
  if (state.phase === 'test') startModuleTimer(state.currentModuleIndex);
  else if (state.phase === 'break') startBreakTimerFn();
});
