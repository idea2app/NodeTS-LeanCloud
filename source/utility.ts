import { Context } from 'koa';
import { User } from 'leanengine';

export interface LCUser extends User {
    logOut(): any;
}

export interface LCContext extends Context {
    saveCurrentUser(user: User): any;
    currentUser: LCUser;
    clearCurrentUser(): any;
}
