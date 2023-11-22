import { UsersService } from '../services/users/users.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(username: string, password: string): Promise<any>;
}
export {};
