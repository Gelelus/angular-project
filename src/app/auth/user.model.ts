export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public avatarImgUrl: string,
    public firstName: string,
    public secondName: string,
    public date: string,
    public phoneNumber: string
  ) {}

  get name() {
    return this.firstName + ' ' + this.secondName;
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
