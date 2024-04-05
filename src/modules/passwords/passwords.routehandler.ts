import { NextFunction, Request, Response, Router } from "express";
import { PasswordManagerComponent } from "./passwords.component";
import { GetPasswordsQuery } from "../../shared/types";
import { Database } from "../../database/database";

export class PasswordsRoutehandler {
  public static build(): Router {
    const router = Router();

    router.get("/passwords", this.getPasswords);
    router.post("/passwords", this.createPassword);
    router.patch("/passwords/:id", this.updatePassword);
    router.delete("/passwords/:id", this.deletePassword);

    return router;
  }

  private static async getPasswords(req: Request, res: Response, next: NextFunction) {
    try {
        const query: GetPasswordsQuery = {
            username: req.query.username as string,
            website: req.query.website as string,
            id: req.query.id as string,
        };
        const passwords = await PasswordManagerComponent.build().getPasswords(query);
        if (passwords.length > 0) {
            res.status(200).json({
                message: "Successfully retrieved passwords.",
                passwords,
            });
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        next(error);
    }
}

private static async createPassword(req: Request, res: Response, next: NextFunction) {
  try {
      const { username, password, website } = req.body;

      if (!username || !password) {
          return res.status(400).send({ message: "Username and password are required." });
      }

      const id = PasswordManagerComponent.build().createPassword({ username, password, website });
      res.status(201).send({ message: "Successfully added password.", id });
  } catch (error) {
      next(error);
  }
}

private static async updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updates = req.body;

    PasswordManagerComponent.build().updatePassword(id, updates);
    res.status(204).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
}

private static async deletePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const database = Database.getInstance();
    const password = database.getPassword(id);

    if (!password) {
      res.status(404).json({ message: "Password not found" });
    } else {
      database.deletePassword(id);
      res.status(204).json({ message: "Password successfully deleted" });
    }
  } catch (error) {
    next(error);
  }
}}