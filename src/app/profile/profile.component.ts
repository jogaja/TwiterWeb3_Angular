import { AfterViewInit, Component, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tweet } from '../share/model/tweet';
import { User } from '../share/model/user';
import { TweetService } from '../share/tweetservice/tweet.service';
import { UserService } from '../share/tweetservice/user.service';
import { Web3Service } from '../share/web3service/web3.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
  public save: string="";
  public constructor(
    private tweetService: TweetService, 
    private userService: UserService, 
    private web3Service: Web3Service,
    public dialog: MatDialog) 
  {
    this.web3Service.user$.subscribe(async (status: boolean) => {
      if (status) {
        this.user = await this.userService.getUserInSession();
        this.loadTweets();
      }
    });
    this.user = this.userService.getUserInSession();
    this.loadTweets();
    
  }
  

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private async loadTweets(): Promise<void> {
    this.tweetService.getMyTweets().then((tweets: Tweet[]) => {
      this.tweets = tweets;
  });

  this.subscription = this.tweetService.newTweets$.subscribe(async () => {
    this.tweets = await this.tweetService.getMyTweets();
  });
  
  }
  openDialog(): void {
    
    const dialogRef = this.dialog.open(edit_profileComponent, {
      data: { name: this.user?.name, avatar: this.user?.avatar,bio: this.tweets[0].author?.bio },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.name = result.name;
        this.user.avatar = result.avatar;
        this.user.bio = result.bio;
        this.userService.updateUser(this.user);
        this.web3Service.user$.next(true);
      }
    });
  }
}
