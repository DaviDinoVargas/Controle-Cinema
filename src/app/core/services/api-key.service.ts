import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private readonly storageKey = 'tmdb-api-key';

  constructor() {}

  setApiKey(key: string) {
    localStorage.setItem(this.storageKey, key);
  }

  getApiKey(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}
