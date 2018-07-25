
export default class Event {
  private _type: string = null;
  private _data: any = null;

  public get type(): string {
    return this._type;
  }

  public get data(): any {
    return this._data;
  }

  public set type(value: string) {
    this._type = value;
  }

  public set data(value: any) {
    this._data = value;
  }

  constructor(type: string, data?: any) {
    this._type = type;
    this._data = data;
  }
}