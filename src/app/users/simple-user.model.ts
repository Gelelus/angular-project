export class SimpleUser {
    constructor(
      public email: string,
      public id: string,
      public avatarImgUrl: string,
      public firstName: string,
      public secondName: string,
      public date: string,
      public phoneNumber: string
    ) {}
  
    get name() {
      return this.firstName + ' ' + this.secondName;
    } 
  }