import { EncryptService } from "../config/encrypt";
import { GetPasswordsQuery, Password } from "../shared/types";
import { IDatabase } from "./idatabase";
import * as fs from "fs";

export class Database implements IDatabase {
  private static _instance: IDatabase;
  private passwords: Password[] = [];

  private constructor() {
    const passwordsData = fs.readFileSync("./passwords/passwords.json", "utf-8");
    const passwords = JSON.parse(passwordsData).savedPasswords;
    
    for (const password of passwords) {
      const encrypted = EncryptService.encryptPassword(password.password);
      password.password = encrypted;
      this.passwords.push(password);
    }
    console.log(this.passwords);
  }

  public static getInstance(): IDatabase {
    if (!Database._instance) {
      Database._instance = new Database();
    }
    return Database._instance;
  }

  public getPasswords(query: GetPasswordsQuery): Password[] {
    const { username, website, id } = query;
    let passwords = this.passwords;

    if (username) {
      passwords = passwords.filter((password) => password.username === username);
    }
    if (website) {
      passwords = passwords.filter((password) => password.website === website);
    }
    if (id) {
      passwords = passwords.filter((password) => password.id === id);
    }

    return passwords;
  }

  public createPassword(newPassword: Password): void {
    const encrypted = EncryptService.encryptPassword(newPassword.password);
    newPassword.password = encrypted;
    this.passwords.push(newPassword);

    const data = { savedPasswords: this.passwords };
    fs.writeFileSync("./passwords/passwords.json", JSON.stringify(data, null, 2));
  }

  public getPassword(id: string): Password | undefined {
    return this.passwords.find((password) => password.id === id);
  }

  public updatePassword(updatedPassword: Password): void {
    const index = this.passwords.findIndex((password) => password.id === updatedPassword.id);
    if (index !== -1) {
      this.passwords[index] = updatedPassword;

      const data = { savedPasswords: this.passwords };
      fs.writeFileSync("./passwords/passwords.json", JSON.stringify(data, null, 2));
    } else {
      throw new Error("Password not found");
    }
  }

  public deletePassword(id: string): void {
    const index = this.passwords.findIndex((password) => password.id === id);
    if (index !== -1) {
      this.passwords.splice(index, 1);

      const data = { savedPasswords: this.passwords };
      fs.writeFileSync("./passwords/passwords.json", JSON.stringify(data, null, 2));
    } else {
      throw new Error("Password not found");
    }
  }
}
