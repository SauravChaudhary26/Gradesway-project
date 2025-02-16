import { Router } from "express";
import {
   getAllQuizzes,
   insertQuiz,
   editQuiz,
   deleteQuiz,
} from "../controllers/quizController";

const router = Router();

router.get("/quiz", getAllQuizzes);
router.post("/quiz", insertQuiz);
router.put("/quiz", editQuiz);
router.delete("/quiz", deleteQuiz);

export default router;
