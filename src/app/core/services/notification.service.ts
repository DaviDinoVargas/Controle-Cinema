import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  show(message: string, type: 'success' | 'error' = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;

    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : '#F44336'};
      color: white;
      padding: 12px 18px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 9999;
      opacity: 0;
      transform: translateY(10px);
      transition: all .3s ease;
    `;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}
