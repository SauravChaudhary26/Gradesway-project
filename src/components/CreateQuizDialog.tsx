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
import { Plus } from "lucide-react";

const url = "http://localhost:8080/api/quiz";

interface CreateQuizDialogProps {
   onQuizCreated: (newQuiz: any) => void; // Function to update the Dashboard state
   fetchData: () => void;
}

const CreateQuizDialog: React.FC<CreateQuizDialogProps> = ({
   onQuizCreated,
   fetchData,
}) => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [open, setOpen] = useState(false); // State to control dialog open/close

   const handleCreateQuiz = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const teacher_id = localStorage.getItem("teacher_id");
         const response = await axios.post(url, {
            title,
            description,
            teacher_id,
         });

         onQuizCreated(response.data);
         setTitle("");
         setDescription("");
         fetchData();
         setOpen(false); // Close the dialog after successful submission
      } catch (error) {
         console.error("Error creating quiz:", error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button
               variant="default"
               className="fixed bottom-10 right-9 rounded-full p-8 shadow-lg hover:shadow-2xl"
               onClick={() => setOpen(true)}
            >
               <Plus className="h-20 w-20" />
            </Button>
         </DialogTrigger>
         <DialogTitle></DialogTitle>
         <DialogContent className="p-6 rounded-lg shadow-lg bg-black text-white">
            <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
            <form onSubmit={handleCreateQuiz} className="space-y-4">
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
                     {isSubmitting ? "Creating..." : "Create"}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default CreateQuizDialog;
