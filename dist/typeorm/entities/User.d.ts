import { Post } from './Post';
import { Profile } from './Profile';
export declare class User {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    authStrategy: string;
    profile: Profile;
    posts: Post[];
}
