import { UsersService } from 'src/users/services/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<any>;
    static isAccessTokenExpired(payload: any): boolean;
    generateAccessToken(user: any): string;
}
export {};
