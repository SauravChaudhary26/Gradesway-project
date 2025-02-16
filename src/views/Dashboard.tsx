import { useEffect, useState } from "react";
import axios from "axios";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard = () => {
   const url = "http://localhost:8080/api/quizes";
   const [quizes, setQuizes] = useState<number[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(url);
            console.log(response.data);
            // setQuizes(response.data);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      // Uncomment when your API is ready
      //   fetchData();

      // For now, set dummy data
      setQuizes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
   }, []);

   return (
      <div className="p-4 relative">
         {/* Responsive grid layout */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quizes.map((card, idx) => (
               <Card
                  key={idx}
                  className="transition-transform transform hover:scale-105 hover:shadow-xl"
               >
                  <CardHeader>
                     <CardTitle>Title {card}</CardTitle>
                     <CardDescription>Description {card}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <p>Content for quiz {card}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                     <Button variant="outline" size="sm">
                        Edit
                     </Button>
                     <Button variant="destructive" size="sm">
                        Delete
                     </Button>
                  </CardFooter>
               </Card>
            ))}
         </div>

         {/* Fixed "Add" button in the bottom right */}
         <Button
            variant="default"
            className="fixed bottom-10 right-9 rounded-full p-8 shadow-lg hover:shadow-2xl"
         >
            <Plus className="h-20 w-20" />
         </Button>
      </div>
   );
};

export default Dashboard;
