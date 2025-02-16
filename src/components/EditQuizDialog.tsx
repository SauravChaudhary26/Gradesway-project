import { useState } from "react";
import axios from "axios";
import {
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const url = "https://gradesway-project.onrender.com/api/quiz";

interface EditQuizDialogProps {
   quiz: {
      id: number;
      title: string;
      description: string;
   };
   fetchData: () => void; // Function to refresh the dashboard after editing
}

const EditQuizDialog: React.FC<EditQuizDialogProps> = ({ quiz, fetchData }) => {
   const [open, setOpen] = useState(false);
   const [title, setTitle] = useState(quiz.title);
   const [description, setDescription] = useState(quiz.description);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleUpdateQuiz = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         await axios.put(`${url}/${quiz.id}`, {
            title,
            description,
         });

         fetchData(); // Refresh UI after update
         setOpen(false); // Close dialog after successful update
      } catch (error) {
         console.error("Error updating quiz:", error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
               Edit
            </Button>
         </DialogTrigger>
         <DialogContent className="p-6 rounded-lg shadow-lg bg-black text-white">
            <DialogTitle>Edit Quiz</DialogTitle>
            <form onSubmit={handleUpdateQuiz} className="space-y-4">
               {/* Title Input */}
               <div>
                  <Label htmlFor="title" className="text-white">
                     Title
                  </Label>
                  <Input
                     id="title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     required
                     className="bg-gray-800 text-white border border-gray-600"
                  />
               </div>

               {/* Description Input */}
               <div>
                  <Label htmlFor="description" className="text-white">
                     Description
                  </Label>
                  <Textarea
                     id="description"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     required
                     className="bg-gray-800 text-white border border-gray-600"
                  />
               </div>

               {/* Submit & Cancel Buttons */}
               <div className="flex justify-end space-x-2">
                  <Button
                     type="button"
                     variant="outline"
                     className="border-gray-600 text-white"
                     onClick={() => setOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                     {isSubmitting ? "Updating..." : "Update"}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default EditQuizDialog;
