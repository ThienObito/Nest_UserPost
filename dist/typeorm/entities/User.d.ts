export declare class User {
    comparePassword(password: string): void;
    id: number;
    fullname: string;
    password: string;
    phone: string;
    address: string;
    dob: Date;
    sex: boolean;
    createdAt: Date;
    authStrategy: string;
}
