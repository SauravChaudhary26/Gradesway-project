import { Request, Response } from "express";
import {
   SelectQuery,
   InsertQuery,
   EditQuery,
   DeleteQuery,
} from "../models/Quiz";
import { RowDataPacket } from "mysql2";

interface Quiz extends RowDataPacket {
   id: number;
   username: string;
   password: string;
}

export const getAllQuizzes = async (req: Request, res: Response) => {
   try {
      const quizzes = await SelectQuery<Quiz>("SELECT * FROM quizzes");
      res.json(quizzes);
   } catch (error) {
      res.status(500).json({ error: error });
   }
};
