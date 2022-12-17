const { Console, Random } = require('@woowacourse/mission-utils');
const {
  START_MESSAGE,
  NOT_EAT_MENU,
  COMPLETE_MESSAGE,
} = require('./Constants');
const { checkValidateCoach, checkValidateCoachNames } = require('./Validate');
const { readCoachName, readNotEatMenu } = require('./InputView');
const { printResult } = require('./OutputView');
const SAMPLE = {
  일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
  한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
  중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
  아시안:
    '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
  양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
};

class App {
  constructor() {
    this.step = 0;
  }

  play() {
    Console.print(START_MESSAGE);
    this.getCoachName();
  }

  getCoachName() {
    readCoachName(coachName => {
      this.changeCoachNameToArray(coachName);
    });
  }

  changeCoachNameToArray(coachNames) {
    const nameSplit = coachNames.split(',');
    this.nameArray = Array.from(nameSplit);
    this.nameArrayLength = this.nameArray.length;

    this.validateCoachName(this.nameArray);
  }

  validateCoachName(nameArray) {
    try {
      checkValidateCoach(nameArray);
      checkValidateCoachNames(nameArray);
      this.moveName();
    } catch (error) {
      Console.print(error);
      this.getCoachName();
    }
  }

  moveName() {
    if (this.nameArray[this.step] === undefined) {
      console.log('끝');
    } else {
      this.getNotEatMenu(this.nameArray[this.step]);
    }
  }

  getNotEatMenu(name) {
    Console.readLine(NOT_EAT_MENU(name), menu => {
      this.step += 1;
      this.moveName();
    });
  }

  // getCategories() {
  //   const categoriesNumber = Random.pickNumberInRange(1, 5);
  //   this.categories = Object.keys(SAMPLE)[categoriesNumber];
  // }

  // getMenu() {
  //   const randomNumber = Random.pickUniqueNumbersInRange(1, 9, 9);
  // const menu = Random.shuffle(randomNumber)[0];
  // }

  getResult() {
    printResult();
    this.finish();
  }

  finish() {
    Console.print(COMPLETE_MESSAGE);
    Console.close();
  }
}

const app = new App();
app.play();
module.exports = App;
