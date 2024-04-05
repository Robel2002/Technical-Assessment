import { randomUUID } from "crypto";
import { EncryptService } from "../../config/encrypt";
import { Database } from "../../database/database";
import { IDatabase } from "../../database/idatabase";
import { ServiceError, ServiceErrorType } from "../../shared/error";
import { GetPasswordsQuery, Password } from "../../shared/types";

export class PasswordManagerComponent {
  private constructor(private database: IDatabase) {}

  public static build(): PasswordManagerComponent {
    const database = Database.getInstance();
    return new PasswordManagerComponent(database);
  }

  
  public async getPasswords(query: GetPasswordsQuery): Promise<Password[]> {
    let passwords = this.database.getPasswords(query);

    // Decrypt passwords before returning
    passwords.forEach((password) => {
      password.password = EncryptService.decryptPassword(password.password);
    });

    return passwords;
  }

  public createPassword(newPassword: Partial<Password>): string {
    if (!newPassword.password || !newPassword.username) {
      throw new ServiceError(ServiceErrorType.BAD_REQUEST, "Password and username are required");
    }

    const encrypted = EncryptService.encryptPassword(newPassword.password);
    const id = randomUUID();

    const password: Password = {
      id,
      username: newPassword.username,
      password: encrypted,
      website: newPassword.website || "",
    };

    this.database.createPassword(password);
    return id;
  }

  public updatePassword(id: string, updates: Partial<Password>): void {
    const password = this.database.getPassword(id);
    if (!password) {
      throw new ServiceError(ServiceErrorType.NOT_FOUND, "Password not found");
    }
  
    if (updates.id) {
      throw new ServiceError(ServiceErrorType.BAD_REQUEST, "ID cannot be updated");
    }
  
    if (!updates.username && !updates.password && !updates.website) {
      throw new ServiceError(ServiceErrorType.BAD_REQUEST, "No fields to update");
    }
  
    if (updates.password) {
      
      updates.password = EncryptService.encryptPassword(updates.password);
    }
  
    Object.assign(password, updates);
    this.database.updatePassword(password);
  }

  public deletePassword(id: string): void {
    this.database.deletePassword(id);
  }
}