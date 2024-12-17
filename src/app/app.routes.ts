import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'chat/:id', component: ChatComponent }
];