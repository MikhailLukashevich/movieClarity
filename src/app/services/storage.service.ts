import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {


  constructor() {
  }

  getItem(key: string) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  setItem(key: string, data: string) {
    try {
      sessionStorage.setItem(key, data);
    } catch (e) {
      console.error(e);
    }

  }

  removeItem(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }

  isAccessible(): boolean {
    try {
      const session = sessionStorage;
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

}
