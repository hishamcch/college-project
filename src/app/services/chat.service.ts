import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Message } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private users: User[] = [
    { id: 1, name: 'John Doe', avatar: '👨', lastMessage: 'Hey there!', lastMessageTime: '10:30 AM' },
    { id: 2, name: 'Jane Smith', avatar: '👩', lastMessage: 'See you later', lastMessageTime: '9:45 AM' },
    { id: 3, name: 'Mike Johnson', avatar: '👨', lastMessage: 'Ok, got it!', lastMessageTime: 'Yesterday' }
  ];

  private messages: { [key: number]: Message[] } = {
    1: [
      { id: 1, senderId: 1, text: 'Hey there!', timestamp: '10:30 AM' },
      { id: 2, senderId: 0, text: 'Hi! How are you?', timestamp: '10:31 AM' }
    ],
    2: [
      { id: 1, senderId: 2, text: 'See you later', timestamp: '9:45 AM' },
      { id: 2, senderId: 0, text: 'Bye!', timestamp: '9:46 AM' }
    ]
  };

  private selectedUser = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUser.asObservable();

  getUsers(): User[] {
    return this.users;
  }

  getMessages(userId: number): Message[] {
    return this.messages[userId] || [];
  }

  setSelectedUser(user: User) {
    this.selectedUser.next(user);
  }

  sendMessage(userId: number, text: string) {
    const newMessage: Message = {
      id: this.messages[userId]?.length + 1 || 1,
      senderId: 0,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    if (!this.messages[userId]) {
      this.messages[userId] = [];
    }
    
    this.messages[userId].push(newMessage);
  }
}