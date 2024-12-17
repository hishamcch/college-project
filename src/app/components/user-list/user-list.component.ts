import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-list">
      <div class="header">
        <h1>WhatsApp Clone</h1>
      </div>
      <div class="users">
        @for (user of users; track user.id) {
          <div class="user-item" (click)="selectUser(user)">
            <div class="avatar">{{ user.avatar }}</div>
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="last-message">{{ user.lastMessage }}</div>
            </div>
            <div class="time">{{ user.lastMessageTime }}</div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .user-list {
      height: 100vh;
      background: #fff;
      border-right: 1px solid #ddd;
    }
    .header {
      padding: 16px;
      background: #075e54;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
    }
    .user-item {
      display: flex;
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }
    .user-item:hover {
      background: #f5f5f5;
    }
    .avatar {
      font-size: 24px;
      margin-right: 12px;
    }
    .user-info {
      flex: 1;
    }
    .user-name {
      font-weight: bold;
      margin-bottom: 4px;
    }
    .last-message {
      color: #666;
      font-size: 14px;
    }
    .time {
      color: #999;
      font-size: 12px;
    }
  `]
})
export class UserListComponent {
  users: User[] = [];

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {
    this.users = this.chatService.getUsers();
  }

  selectUser(user: User) {
    this.chatService.setSelectedUser(user);
    this.router.navigate(['/chat', user.id]);
  }
}