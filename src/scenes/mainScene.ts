export class MainScene extends Phaser.Scene {

  private backgroundCity: Phaser.GameObjects.Sprite;
  private correctSound: Phaser.Sound.BaseSound;
  private items: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.audio("car", [ "./assets/audio/auto.mp3" ]);
    this.load.audio("house", [ "./assets/audio/hause.mp3" ]);
    this.load.audio("building", [ "./assets/audio/gebaude.mp3" ]);
    this.load.audio("tree", [ "./assets/audio/baum.mp3" ]);
    this.load.audio("correct", [ "./assets/audio/correct.mp3" ]);
    this.load.audio("wrong", [ "./assets/audio/wrong.mp3" ]);

    this.load.image("background-city", "./assets/image/background-city.png");
    this.load.image("car", "./assets/image/car.png");
    this.load.image("house", "./assets/image/house.png");
    this.load.image("building", "./assets/image/building.png");
    this.load.image("tree", "./assets/image/tree.png");
  }

  create(): void {
    this.backgroundCity = this.add.sprite(0, 0, "background-city")
                                  .setOrigin(0, 0);
    this.backgroundCity .setInteractive();
    this.backgroundCity.on("pointerdown", pointer => {

    });
    this.correctSound = this.sound.add("correct");
    this.correctSound.play();

    this.items = this.add.group([
      {
        key: "building",
        setXY: {  x: 100, y: 240 }
      },
      {
        key: "house",
        setXY: {  x: 240, y: 280 },
        setScale: { x: 0.8, y: 0.8 }
      },
      {
        key: "car",
        setXY: {  x: 400, y: 300 }
      },
      {
        key: "tree",
        setXY: {  x: 550, y: 250 }
      }
    ] as GroupCreateConfig);
    Phaser.Actions.Call(this.items.getChildren(), item => {
        item.setInteractive();
        item.on("pointerdown", pointer => {
          alert("You have clicked on: " + item.texture.key)
        });
    }, this);
  }
}
