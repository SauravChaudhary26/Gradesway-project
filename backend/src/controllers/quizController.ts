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
   teacher_id: number;
}

export const getAllQuizzes = async (req: Request, res: Response) => {
   try {
      console.log(req.params);
      const quizzes = await SelectQuery<Quiz>("SELECT * FROM quizzes");
      res.json(quizzes);
   } catch (error) {
      console.log("Error while fetching quizzes", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const insertQuiz = async (req: Request, res: Response) => {
   try {
      const { title, description, teacher_id } = req.body;
      if (!title || !description) {
         res.status(400).send("Please provide a title and description.");
         return;
      }

      if (!teacher_id) {
         res.status(404).json({ message: "Not Authorized" });
      }

      const data = await InsertQuery(
         `INSERT INTO quizzes (title, description, teacher_id) VALUES ('${title}', '${description}', '${teacher_id}');`
      );

      res.status(201).json("Quiz created successfully.");
   } catch (error) {
      console.log("Error while creating a quiz", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const editQuiz = async (req: Request, res: Response) => {
   try {
      const { title, description, id } = req.body;
      if (!title || !description || !id) {
         res.status(400).send(
            "Please provide a title, description, and quiz ID."
         );
         return;
      }

      const data = await EditQuery(
         `UPDATE quizzes SET title = '${title}', description = '${description}' WHERE id = ${id};`
      );
      res.status(200).json("Quiz updated successfully.");
   } catch (error) {
      console.log("Error while updating a quiz", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const deleteQuiz = async (req: Request, res: Response) => {
   try {
      const { id } = req.body;
      if (!id) {
         res.status(400).send("Please provide an id.");
         return;
      }

      const data = await DeleteQuery(`DELETE FROM quizzes WHERE id = ${id};`);
      res.status(200).json("Quiz deleted successfully.");
   } catch (error) {
      console.log("Error while deleting a quiz", error);
      res.status(500).json({ error: "Internal server error" });
   }
};
