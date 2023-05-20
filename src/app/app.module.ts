import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TweetComponent} from "./share/tweetcomponent/tweet.componet";
import { MainFeedComponent } from './main-feed/main-feed.component';
import { ProfileComponent } from './profile/profile.component';
import {TweetService} from "./share/tweetservice/tweet.service";
import {NewTweetComponent} from "./share/newtweet/newtweet.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./share/tweetservice/user.service";
import {Web3Service} from "./share/web3service/web3.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './share/material.modules';
import { edit_profileComponent } from './share/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    MainFeedComponent,
    ProfileComponent,
    NewTweetComponent,
    edit_profileComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    TweetService,
    UserService,
    Web3Service,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
