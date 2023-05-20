import { AfterViewInit, Component, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tweet } from '../share/model/tweet';
import { User } from '../share/model/user';
import { TweetService } from '../share/tweetservice/tweet.service';
import { UserService } from '../share/tweetservice/user.service';
import { Web3Service } from '../share/web3service/web3.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { edit_profileComponent } from '../share/edit-profile/edit-profile.component';

export interface DialogData {
  name: string;
  avatar: string;
  bio: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  public tweets: Tweet[] =[];
  public user: any;
  public subscription: Subscription = new Subscription();
  public name: string ="";
  public avatar: string ="";
  public bio: string ="";
  public constructor(
    private tweetService: TweetService, 
    private userService: UserService, 
    private web3Service: Web3Service,
    public dialog: MatDialog) 
  {
    this.web3Service.userConected$.subscribe(async (status: boolean) => {
      if (status) {
        this.user = await this.userService.getUserInSession();
        this.loadTweets();
        if (this.tweets.length > 0) {
          this.user = this.tweets[0].author;
        }
      }
    });
    this.user = this.userService.getUserInSession();
    this.loadTweets();
  }
  private async loadTweets(): Promise<void> {
    this.tweets = await this.tweetService.getMyTweets();
  
    this.tweetService.newTweets$.subscribe(async () => {
      this.tweets = await this.tweetService.getMyTweets();
    });
  }
  
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    if (this.tweets.length > 0) {
      this.user = this.tweets[0].author;
    }
    
    const dialogRef = this.dialog.open(edit_profileComponent, {
      data: { name: this.user?.name, avatar: this.user?.avatar, bio: this.user?.bio },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.name = result.name;
        this.user.avatar = result.avatar;
        this.user.bio = result.bio;
        this.userService.updateUser(this.user);
        this.web3Service.userConected$.next(true);
      }
    });
  }
}
