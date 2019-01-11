export class MainScene extends Phaser.Scene {

  private backgroundCity: Phaser.GameObjects.Sprite;
  private correctSound: Phaser.Sound.BaseSound;
  private wrongSound: Phaser.Sound.BaseSound;
  private items: Phaser.GameObjects.Group;
  private textWord: Phaser.GameObjects.Text;
  private textScore: Phaser.GameObjects.Text;
  private words: any[];
  private nextWord;
  private score: { wins: number, losses: number };

  constructor() {
    super({
      key: "MainScene"
    });
  }

  public init(): void {
    this.score = {
      wins: 0,
      losses: 0
    };
    this.words = [
      {
        key: "building",
        setXY: {  x: 100, y: 240 },
        german: "Gebäude"
      },
      {
        key: "house",
        setXY: {  x: 240, y: 280 },
        setScale: { x: 0.8, y: 0.8 },
        german: "Hause"
      },
      {
        key: "car",
        setXY: {  x: 400, y: 300 },
        german: "Auto"
      },
      {
        key: "tree",
        setXY: {  x: 550, y: 250 },
        german: "Baum"
      }
    ];
  }

  private showNextQuestion(): void {
    this.nextWord = Phaser.Math.RND.pick(this.words); 
    this.nextWord.sound.play();
    this.textWord.setText(this.nextWord.german);
    this.updateScore();
  }

  private processAnswer(userResponse: string): boolean {
    if (this.nextWord.german === userResponse) {
      this.correctSound.play();
      return true;
    }
    this.wrongSound.play();
    return false;
  }

  private updateScore(): void {
    this.textScore.setText(`Wins: ${this.score.wins} | Losses: ${this.score.losses}`);
  }

  public preload(): void {
    this.load.audio("buildingAudio", [ "./assets/audio/gebaude.mp3" ]);
    this.load.audio("houseAudio", [ "./assets/audio/hause.mp3" ]);
    this.load.audio("carAudio", [ "./assets/audio/auto.mp3" ]);
    this.load.audio("treeAudio", [ "./assets/audio/baum.mp3" ]);
    this.load.audio("correct", [ "./assets/audio/correct.mp3" ]);
    this.load.audio("wrong", [ "./assets/audio/wrong.mp3" ]);

    this.load.image("background-city", "./assets/image/background-city.png");
    this.load.image("car", "./assets/image/car.png");
    this.load.image("house", "./assets/image/house.png");
    this.load.image("building", "./assets/image/building.png");
    this.load.image("tree", "./assets/image/tree.png");
  }

  public create(): void {
    const gameW = this.sys.game.config.width as number;

    this.backgroundCity = this.add.sprite(0, 0, "background-city")
                                  .setOrigin(0, 0);
    this.backgroundCity .setInteractive();

    this.correctSound = this.sound.add("correct");
    this.wrongSound = this.sound.add("wrong");

    this.items = this.add.group(this.words as GroupCreateConfig);
    const childrenItems = this.items.getChildren();

    for (let i = 0;i < childrenItems.length; i++) {
      const item = childrenItems[i];
      item.setInteractive();

      item.setData("resizeCorrectTween", this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        yoyo: true,
        paused: true
      }));


      item.setData("resizeWrongTween", this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        angle: 90,
        duration: 300,
        yoyo: true,
        paused: true
      }));

      item.setData("alphaTween", this.tweens.add({
        targets: item,
        alpha: 0.7,
        duration: 200,
        paused: true
      }));

      item.on("pointerdown", pointer => {
        if (this.processAnswer(this.words[i].german)) {
          const resizeCorrectTween = item.getData("resizeCorrectTween") as Phaser.Tweens.Tween;
          resizeCorrectTween.restart();
          this.score.wins += 1;
        } else {
          const resizeWrongTween = item.getData("resizeWrongTween") as Phaser.Tweens.Tween;
          resizeWrongTween.restart();
          this.score.losses += 1;
        }
        this.showNextQuestion();
      }, this);

      item.on("pointerover", pointer => {
        const currentItem = item.getData("alphaTween") as Phaser.Tweens.Tween;
        currentItem.restart();
      }, this);

      item.on("pointerout", pointer => {
        const currentItem = item.getData("alphaTween") as Phaser.Tweens.Tween;
        currentItem.stop();
        item.alpha = 1;
      }, this);

      this.words[i].sound = this.sound.add(`${this.words[i].key}Audio`);
    }
    this.textWord = this.add.text(30, 20, "", {
      font: "28px Arial",
      fill: "#FFFFFF"
    });
    this.textScore = this.add.text(gameW - 180, 20, '', {
      font: "18px Arial",
      fill: "#FFFFFF"
    });
    this.showNextQuestion();
  }
}
