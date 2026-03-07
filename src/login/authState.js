export class AuthState {
    static Unknown = new AuthState("Unknown");
    static Authenticated = new AuthState("Authenticated");
    static Unauthenticated = new AuthState("Unauthenticated");

    constructor(name) {
        this.name = name;
    }
}