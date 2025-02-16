import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { SelectQuery, InsertQuery } from "../models/Teacher";

interface Teacher extends RowDataPacket {
   id: number;
   username: string;
   password: string;
}

export const login = async (req: Request, res: Response): Promise<void> => {
   try {
      //extract username and password from the request body
      const { username, password } = req.body;

      //backend validation to check if username and password are provided
      if (!username || !password) {
         res.status(400).send("Please provide a username and password.");
         return;
      }

      //check if the user exists in the database
      const [user] = await SelectQuery<Teacher>(
         `SELECT * FROM teachers WHERE username = '${username}'`
      );

      //if the user does not exist, create a new user
      if (!user) {
         const data = await InsertQuery(
            `INSERT INTO teachers (username, password) VALUES ('${username}', '${password}');`
         );
      }

      const [userCache] = await SelectQuery<Teacher>(
         `SELECT * FROM teachers WHERE username = '${username}'`
      );

      //send a success response
      res.status(201).json({ id: userCache.id, username: userCache.username });
   } catch (error) {
      console.log("Error while Loggin in", error);
      res.status(500).json({ error: "Something went wrong." });
   }
};
