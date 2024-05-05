export class UserModel {
    constructor(
      private UserID: string,
      private Name: string,
      private Email: string,
      private Age: number,
      private Address: string
    ) {
    }

  get userID(): string {
    return this.UserID;
  }
  // Getter for Name
  get userName(): string {
    return this.Name;
  }

  // Getter for Email
  get userEmail(): string {
    return this.Email;
  }

  // Getter for Age
  get userAge(): number {
    return this.Age;
  }

  // Getter for Address
  get userAddress(): string {
    return this.Address;
  }
}
