const board = document.getElementById('game-board');
const emojis = ['🍎','🍌','🍇','🍒','🍍','🍉','🥝','🍑'];
const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

let flipped = [];
let matched = 0;

if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

cards.forEach(emoji => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.emoji = emoji;
  card.onclick = () => flip(card);
  board.appendChild(card);
});

function flip(card) {
  if (flipped.length === 2 || card.textContent || card.classList.contains('matched')) return;

  card.textContent = card.dataset.emoji;
  flipped.push(card);

  if (flipped.length === 2) {
    setTimeout(check, 700);
  }
}

function check() {
  const [a, b] = flipped;

  if (a.dataset.emoji === b.dataset.emoji) {
    a.classList.add('matched');
    b.classList.add('matched');
    matched += 2;
    notify('Отлично!', `Пара ${a.dataset.emoji} найдена!`);
  } else {
    a.textContent = '';
    b.textContent = '';
  }

  flipped = [];

  if (matched === cards.length) {
    setTimeout(() => {
      notify('Победа!', 'Вы нашли все пары! 🎉');
      setTimeout(() => location.reload(), 1000);
    }, 500);
  }
}

function notify(title, msg) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: msg,
      icon: 'https://cdn-icons-png.flaticon.com/512/992/992651.png'
    });
  }
}