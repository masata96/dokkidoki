const scenes = {
  start: {
    dialogue: "今日は上智大学の入学式だ。あそこにいるのは教授かな。",
    choices: [
      {
        label: "「こんにちは！」と元気に挨拶する",
        next: "greetFriendly",
        affectionDiff: +5
      },
      {
        label: "小さく会釈する",
        next: "greetShy",
        affectionDiff: +2
      }
    ],
    background: "images/mainStreet.jpg",
    character: "images/silhouette/紳士２.png",
    name: "あなた"
  },
  greetFriendly: {
    dialogue: "私は情報理工学科教授の角皆です。君には数学者の素質がある！！",
    choices: [
      {
        label: "進む",
        next: "entranceCeremony",
        affectionDiff: 0
    }],
    background: "images/mainStreet.jpg",
    character: "images/tunogai.webp",
    name: "角皆",
  },
  greetShy: {
    text: "私は情報理工学科教授の角皆です。よろしく",
    choices: [
            {
        label: "進む",
        next: "entranceCeremony",
        affectionDiff: 0
    }],
  },
  entranceCeremony: {
    text: "入学式はすごい",
    choices: [
      {
        label: "「こんにちは！」と元気に挨拶する",
        next: "greetFriendly",
        affectionDiff: +5
      },
      {
        label: "小さく会釈する",
        next: "greetShy",
        affectionDiff: +2
      }
    ]
  }
};

const state = {
  currentScene: 'start',
  affection: 0
};

    const bgEl = document.getElementById('background');
    const charEl = document.getElementById('character');
    const nameEl = document.getElementById('name');
    const dlgEl  = document.getElementById('dialogue');
    const affEl  = document.getElementById('affection');
    const choicesEl = document.getElementById('choices');

function renderScene() {
  const scene = scenes[state.currentScene];

  // 画像、テキスト更新
  bgEl.src = scene.background;
  charEl.src = scene.character;
  nameEl.textContent = scene.name;
  dlgEl.textContent = scene.dialogue;
  affEl.textContent = state.affection;

  choicesEl.innerHTML = '';
  if (scene.choices && scene.choices.length) {
    scene.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.label;
      btn.onclick = () => {
        // 好感度を足す、クリックしたら次のシーンに遷移
        state.affection += choice.affectionDiff || 0;
        state.currentScene = choice.next;
        renderScene();
      };
      choicesEl.appendChild(btn);
    });
  }
}
// ロードしてからレンダーする
document.addEventListener('DOMContentLoaded', renderScene);
