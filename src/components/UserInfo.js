export class UserInfo {
  constructor({ userName, userInfo }) {
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userInfo);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    };
  }
  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
