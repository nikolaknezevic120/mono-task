import { observable, action, makeObservable } from "mobx";

class UserStore {
  userName = "";
  userAddress = "";

  constructor() {
    makeObservable(this, {
      userName: observable,
      userAddress: observable,
      setUserName: action,
      setUserAddress: action,
    });
  }

  setUserName(name) {
    this.userName = name;
  }

  setUserAddress(address) {
    this.userAddress = address;
  }
}

const userStore = new UserStore();

export const useUserStore = () => userStore;
