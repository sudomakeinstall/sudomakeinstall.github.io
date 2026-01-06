class Flashcard {
  constructor(container, options = {}) {
    this.container = container;
    this.allCards = [];
    this.cards = [];
    this.currentIndex = 0;
    this.reversed = false;
    this.shuffled = true;
    this.selectedTags = new Set();
    this.availableTags = [];
    this.selectedDifficulties = new Set();
    this.availableDifficulties = [];
    this.dataUrl = options.dataUrl || null;

    if (options.cards) {
      this.init(options.cards);
    } else if (this.dataUrl) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      const response = await fetch(this.dataUrl);
      const data = await response.json();
      this.init(data.cards || data);
    } catch (error) {
      this.container.innerHTML = '<p>Error loading flashcard data.</p>';
    }
  }

  init(cards) {
    this.allCards = cards.slice();
    this.extractTags();
    this.extractDifficulties();
    this.filterCards();
    this.render();
    this.bindEvents();
    this.bindKeyboard();
  }

  bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === ' ') {
        e.preventDefault();
        this.flip();
      }
    });
  }

  extractTags() {
    const tagSet = new Set();
    this.allCards.forEach(card => {
      if (card.tags) {
        card.tags.forEach(tag => tagSet.add(tag));
      }
    });
    this.availableTags = Array.from(tagSet).sort();
  }

  extractDifficulties() {
    const diffSet = new Set();
    this.allCards.forEach(card => {
      if (card.difficulty) {
        diffSet.add(card.difficulty);
      }
    });
    const order = ['beginner', 'intermediate', 'advanced'];
    this.availableDifficulties = order.filter(d => diffSet.has(d));
    this.selectedDifficulties = new Set(this.availableDifficulties);
  }

  filterCards() {
    if (this.selectedTags.size === 0) {
      this.cards = [];
    } else {
      this.cards = this.allCards.filter(card => {
        const matchesTag = card.tags && card.tags.some(tag => this.selectedTags.has(tag));
        const matchesDiff = this.selectedDifficulties.size === 0 ||
          this.selectedDifficulties.has(card.difficulty);
        return matchesTag && matchesDiff;
      });
    }
    if (this.shuffled && this.cards.length > 0) {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
    this.currentIndex = 0;
  }

  renderTags() {
    if (this.availableTags.length === 0) return '';
    const buttons = this.availableTags.map(tag => {
      const selected = this.selectedTags.has(tag) ? ' selected' : '';
      return `<button class="tag-btn${selected}" data-tag="${tag}">${tag}</button>`;
    }).join('');
    return `<div class="flashcard-tags">${buttons}</div>`;
  }

  renderDifficulties() {
    if (this.availableDifficulties.length === 0) return '';
    const buttons = this.availableDifficulties.map(diff => {
      const selected = this.selectedDifficulties.has(diff) ? ' selected' : '';
      return `<button class="difficulty-btn${selected}" data-difficulty="${diff}">${diff}</button>`;
    }).join('');
    return `<div class="flashcard-difficulties">${buttons}</div>`;
  }

  render() {
    const tagsHtml = this.renderTags();
    const diffHtml = this.renderDifficulties();

    if (this.cards.length === 0) {
      this.container.innerHTML = `
        <div class="flashcard-deck">
          <p class="flashcard-prompt">Select topics below to start studying.</p>
          ${tagsHtml}
          ${diffHtml}
        </div>
      `;
      return;
    }

    const card = this.cards[this.currentIndex];
    const front = this.reversed ? card.back : card.front;
    const back = this.reversed ? card.front : card.back;
    const extra = this.renderExtra(card);
    this.container.innerHTML = `
      <div class="flashcard-deck">
        <div class="flashcard" id="flashcard">
          <div class="flashcard-inner">
            <div class="flashcard-front">${front}</div>
            <div class="flashcard-back">
              <div class="flashcard-answer">${back}</div>
              ${extra}
            </div>
          </div>
        </div>
        <div class="flashcard-nav">
          <button id="prev-btn" ${this.currentIndex === 0 ? 'disabled' : ''}>Previous</button>
          <button id="next-btn" ${this.currentIndex === this.cards.length - 1 ? 'disabled' : ''}>Next</button>
        </div>
        <div class="flashcard-progress">${this.currentIndex + 1} / ${this.cards.length}</div>
        ${tagsHtml}
        ${diffHtml}
        <div class="flashcard-controls">
          <button id="direction-btn">${this.reversed ? 'EN → ES' : 'ES → EN'}</button>
          <button id="shuffle-btn">${this.shuffled ? 'Ordered' : 'Shuffle'}</button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.tag-btn').forEach(btn => {
      btn.addEventListener('click', () => this.toggleTag(btn.dataset.tag));
    });
    this.container.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', () => this.toggleDifficulty(btn.dataset.difficulty));
    });

    const flashcard = this.container.querySelector('#flashcard');
    const prevBtn = this.container.querySelector('#prev-btn');
    const nextBtn = this.container.querySelector('#next-btn');
    const directionBtn = this.container.querySelector('#direction-btn');
    const shuffleBtn = this.container.querySelector('#shuffle-btn');

    if (flashcard) {
      flashcard.addEventListener('click', () => this.flip());
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }
    if (directionBtn) {
      directionBtn.addEventListener('click', () => this.toggleDirection());
    }
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    }
  }

  toggleTag(tag) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }
    this.filterCards();
    this.render();
    this.bindEvents();
  }

  toggleDifficulty(difficulty) {
    if (this.selectedDifficulties.has(difficulty)) {
      this.selectedDifficulties.delete(difficulty);
    } else {
      this.selectedDifficulties.add(difficulty);
    }
    this.filterCards();
    this.render();
    this.bindEvents();
  }

  toggleDirection() {
    this.reversed = !this.reversed;
    this.render();
    this.bindEvents();
  }

  toggleShuffle() {
    this.shuffled = !this.shuffled;
    this.filterCards();
    this.render();
    this.bindEvents();
  }

  renderExtra(card) {
    if (!card.synonym && !card.sentence) return '';
    let html = '<div class="flashcard-extra">';
    if (card.synonym) {
      html += `<div class="flashcard-synonym">${card.synonym}</div>`;
    }
    if (card.sentence) {
      html += `<div class="flashcard-sentence">${card.sentence}</div>`;
      if (card.sentenceEn) {
        html += `<div class="flashcard-sentence-en">${card.sentenceEn}</div>`;
      }
    }
    html += '</div>';
    return html;
  }

  flip() {
    const flashcard = this.container.querySelector('#flashcard');
    if (flashcard) {
      flashcard.classList.toggle('flipped');
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
      this.bindEvents();
    }
  }

  next() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.render();
      this.bindEvents();
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-flashcard-src]').forEach(function(el) {
    new Flashcard(el, { dataUrl: el.dataset.flashcardSrc });
  });
});
