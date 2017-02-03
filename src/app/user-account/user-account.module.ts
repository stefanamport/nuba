import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserAccountComponent } from './user-account.component';
import { userAccountRouting } from './user-account.routes';


@NgModule({
    declarations: [UserAccountComponent],
    imports: [
    	userAccountRouting,
    	FormsModule,
    	CommonModule
    ]   
})
export class UserAccountModule { }
