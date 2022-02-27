export default class DateTime {
  private year: number;
  private month: number;
  private date: number;
  private japaneseDay: string;
  private hour: number;
  private minute: number;
  private second: number;

  constructor(datetimeString: string) {
    const datetime = new Date(datetimeString)

    this.year = datetime.getFullYear();
    this.month = datetime.getMonth() + 1;
    this.date = datetime.getDate();

    const weekdays = [ '月', '火', '水', '木', '金', '土', '日' ];
    this.japaneseDay = weekdays[datetime.getDay()];

    this.hour = datetime.getHours();
    this.minute = datetime.getMinutes();
    this.second = datetime.getSeconds();
  }

  public getJapaneseShortDate(): string {
    return `${this.month}月${this.date}日(${this.japaneseDay})`;
  }

  public getShortTime(): string {
    return `${this.formatTimeAlignment(this.hour)}:${this.formatTimeAlignment(this.minute)}`;
  }

  private formatTimeAlignment(timeValue: number) {
    return ("00" + timeValue).slice(-2);
  }
}