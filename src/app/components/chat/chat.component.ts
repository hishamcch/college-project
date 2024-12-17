import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { User, Message } from '../../models/user.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <div class="chat-header">
        <button class="back-button" (click)="goBack()">←</button>
        @if (selectedUser) {
          <div class="user-info">
            <span class="avatar">{{ selectedUser.avatar }}</span>
            <span class="name">{{ selectedUser.name }}</span>
          </div>
        }
      </div>
      
      <div class="messages" #messageContainer>
        @for (message of messages; track message.id) {
          <div class="message" [class.sent]="message.senderId === 0">
            <div class="message-content">
              {{ message.text }}
              <span class="timestamp">{{ message.timestamp }}</span>
            </div>
          </div>
        }
      </div>

      <div class="input-area">
        <input
          type="text"
          [(ngModel)]="newMessage"
          (keyup.enter)="sendMessage()"
          placeholder="Type a message"
        >
        <button (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .chat-header {
      display: flex;
      align-items: center;
      padding: 12px;
      background: #075e54;
      color: white;
    }
    .back-button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0 12px;
    }
    .user-info {
      display: flex;
      align-items: center;
      margin-left: 12px;
    }
    .avatar {
      font-size: 24px;
      margin-right: 8px;
    }
    .messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: #e5ddd5;
    }
    .message {
      margin: 8px 0;
      display: flex;
    }
    .message-content {
      padding: 8px 12px;
      background: white;
      border-radius: 8px;
      max-width: 70%;
      position: relative;
    }
    .message.sent {
      justify-content: flex-end;
    }
    .message.sent .message-content {
      background: #dcf8c6;
    }
    .timestamp {
      font-size: 11px;
      color: #999;
      margin-left: 8px;
    }
    .input-area {
      display: flex;
      padding: 12px;
      background: #f0f0f0;
    }
    input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 24px;
      margin-right: 8px;
    }
    button {
      padding: 8px 16px;
      background: #075e54;
      color: white;
      border: none;
      border-radius: 24px;
      cursor: pointer;
    }
  `]
})
export class ChatComponent implements OnInit {
  selectedUser: User | null = null;
  messages: Message[] = [];
  newMessage = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.chatService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });

    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.messages = this.chatService.getMessages(userId);
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      this.chatService.sendMessage(this.selectedUser.id, this.newMessage);
      this.messages = this.chatService.getMessages(this.selectedUser.id);
      this.newMessage = '';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}