import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public GetItem(name: string): string {
    return localStorage.getItem(name);
  }

  public SetItem(name: string, value: any): void {
    localStorage.setItem(name, value);
  }

   public Clear(): void {
    localStorage.clear();
  }
}
