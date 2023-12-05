export class UserRegistration {
    userID?: number;
    username?: string;
    name?: string;
    surname?: string; 
    email?: string;
    phone?: string; 
    password?: string; 

    constructor() {
        this.userID = 0;
        this.username = '';
        this.name = '';
        this.surname = '';
        this.email = '';
        this.phone = '';
        this.password = '';

    }
}