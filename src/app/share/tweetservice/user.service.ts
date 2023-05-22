import {Injectable} from "@angular/core";
import {User} from "../model/user";
import {Web3Service} from "../web3service/web3.service";
import {Subject} from "rxjs";

@Injectable()
export class UserService {

    public anonymousUser = new User('Jogaja', '', 'https://media.licdn.com/dms/image/C4E03AQEsd5reNnoC3Q/profile-displayphoto-shrink_800_800/0/1654126820683?e=2147483647&v=beta&t=83ZAG9tZv2GGsWqgEVChuWQLc6VYuyxVLIhV08B4TBw');

    protected userInSession: any;

    public userInSessionChanged$ = new Subject();

    public constructor(protected web3Service: Web3Service) {
        this.userInSession = this.anonymousUser; //by default;
        this.web3Service.status$.subscribe(async (status) => 
        {
            if(status == true) {
                this.userInSession = this.buildUser(await this.web3Service.getUserInSession());
            }
            else {
                this.userInSession = this.anonymousUser;
            }
            this.userInSessionChanged$.next(this.userInSession);
        });
    }

    public async updateUser(user: User): Promise<void> {
        this.anonymousUser = user;
        await this.web3Service.updateUser(user);
    }

    public async getUser(address: string) 
    {
        let user = this.anonymousUser; //by default
        try {
            return user = this.buildUser(await this.web3Service.getUser(address));
        }
        catch(error) {
            //nothing
        }
        return user;
    }

    public buildUser(userFromWeb3: any) {
        let avatarUrl = userFromWeb3.avatar;
        if (!avatarUrl.startsWith('http')) {
          avatarUrl = 'https://mysupercoolipfs.infura-ipfs.io/ipfs/' + avatarUrl;
        }
      
        let user = new User(
          userFromWeb3.name,
          userFromWeb3.bio,
          userFromWeb3.avatar
        );
      
        return user;
      }
      

    public getUserInSession() {
        return this.userInSession;
    }


}
