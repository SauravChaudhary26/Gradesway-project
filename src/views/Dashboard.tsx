import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateQuizDialog from "@/components/CreateQuizDialog";
import EditQuizDialog from "@/components/EditQuizDialog"; // Import Edit Dialog

const url = "https://gradesway-project.onrender.com/api/quiz"; // Backend URL

const Dashboard = () => {
   const [quizes, setQuizes] = useState<
      {
         id: number;
         title: string;
         description: string;
         teacher_id: number;
         date_created: string;
      }[]
   >([]);

   const navigate = useNavigate(); // Hook to navigate between pages

   const fetchData = async () => {
      try {
         const teacher_id = localStorage.getItem("teacher_id");
         if (!teacher_id) {
            navigate("/"); // Redirect if no teacher_id is found
            return;
         }

         const response = await axios.get(url, { params: { teacher_id } });

         // Convert `date_created` to a readable format
         const formattedData = response.data.map((quiz: any) => ({
            ...quiz,
            date_created: new Intl.DateTimeFormat("en-US", {
               year: "numeric",
               month: "long",
               day: "2-digit",
               hour: "2-digit",
               minute: "2-digit",
            }).format(new Date(quiz.date_created)),
         }));

         setQuizes(formattedData);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = async (id: number) => {
      try {
         await axios.delete(url, { data: { id } });
         setQuizes(quizes.filter((quiz) => quiz.id !== id));
      } catch (error) {
         console.error("Error deleting quiz:", error);
      }
   };

   // Function to update state when a new quiz is created
   const handleQuizCreated = (newQuiz: any) => {
      setQuizes([...quizes, newQuiz]);
   };

   // Logout function
   const handleLogout = () => {
      localStorage.removeItem("teacher_id");
      localStorage.removeItem("username");
      navigate("/"); // Redirect to login page after logout
   };

   return (
      <div className="p-4 relative">
         {/* Logout Button (Top-Right Corner) */}
         <Button
            variant="outline"
            className="absolute top-4 right-4"
            onClick={handleLogout}
         >
            Logout
         </Button>

         <h1 className="text-4xl font-bold mb-9 text-center">
            Hi {localStorage.getItem("username") || "User"}
         </h1>

         {/* Responsive grid layout */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quizes.map((card, idx) => (
               <Card
                  key={idx}
                  className="transition-transform transform hover:scale-105 hover:shadow-xl border border-white"
               >
                  <CardHeader>
                     <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p>{card.description}</p>
                     <p className="text-gray-500 text-sm mt-8">
                        📅 Created at: {card.date_created}
                     </p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                     {/* Edit Button */}
                     <EditQuizDialog quiz={card} fetchData={fetchData} />
                     <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(card.id)}
                     >
                        Delete
                     </Button>
                  </CardFooter>
               </Card>
            ))}
         </div>

         {/* "Create New Quiz" Dialog Component */}
         <CreateQuizDialog
            onQuizCreated={handleQuizCreated}
            fetchData={fetchData}
         />
      </div>
   );
};

export default Dashboard;
