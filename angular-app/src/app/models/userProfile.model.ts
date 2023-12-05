export class UserProfile{
    username?: string;
    name?: string;
    surname?: string; 
    email?: string;
    phone?: string; 

    constructor() {
        this.username = '';
        this.name = '';
        this.surname = '';
        this.email = '';
        this.phone = '';
    }
}