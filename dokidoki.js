const scenes = {
  start: {
    text: "今日は上智大学の入学式だ。あそこにいるのは教授かな。",
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
  },
  greetFriendly: {
    text: "私は情報理工学科教授の角皆です。君には数学者の素質がある！！",
    choices: [
      {
        label: "進む",
        next: "entranceCeremony",
        affectionDiff: 0
    }],
    nextScene: "entranceCeremony",
  },
  greetShy: {
    text: "私は情報理工学科教授の角皆です。よろしく",
    choices: [ /* … */ ],
    nextScene: "entranceCeremony",
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
  currentScene: "start",
  affection: 0
};

// タグを取得
const text      = document.getElementById("scene-text");
const choices   = document.getElementById("choices");
const affection = document.getElementById("affection");

// シーンを描画する関数
function renderScene() {
  const scene = scenes[state.currentScene];

  // テキストを更新
  text.textContent = scene.text;

  // 選択肢ボタンをクリア
  choices.innerHTML = "";

  // 選択肢ごとにボタンを生成
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.label;
    btn.addEventListener("click", () => {
      // 好感度を更新
      state.affection += choice.affectionDiff || 0;
      affection.textContent = state.affection;

      // シーンを遷移
      state.currentScene = choice.next;
      renderScene();
    });
    choices.appendChild(btn);
  });
}

// ゲーム開始
renderScene();

