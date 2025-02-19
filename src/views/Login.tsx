"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormSchema = z.object({
   username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
   }),
   password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
   }),
});

export function Login() {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         username: "username",
         password: "password",
      },
   });

   const navigate = useNavigate();
   const [loading, setLoading] = useState(false); // Add loading state

   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      setLoading(true); // Start loading
      try {
         const url = import.meta.env.VITE_SERVER_URL + "login";
         const response = await axios.post(url, data);

         if (response.status === 201) {
            console.log("User created successfully");
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("teacher_id", response.data.id);
            navigate("/dashboard");
            return;
         }
      } catch (error) {
         console.error("Error while logging in", error);
      } finally {
         setLoading(false); // Stop loading after request completes
      }
   };

   return (
      <div className="flex h-screen flex-col items-center justify-center px-4">
         <h1 className="text-5xl font-bold mb-9">Gradesway</h1>
         <div className="w-full max-w-sm p-6 rounded-lg shadow-md border-2 border-white">
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  {/* Username Field */}
                  <FormField
                     control={form.control}
                     name="username"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Username</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter your username"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              Must be at least 5 characters.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Password Field */}
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 type="password"
                                 placeholder="Enter your password"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              Default form values will work.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type="submit" className="w-full" disabled={loading}>
                     {loading ? "Loading..." : "Submit"}
                  </Button>
               </form>
            </Form>
         </div>
         <h2 className="mt-6">
            *Please wait for atleast 30 seconds after pressing submit as the
            free server of Render.com is extremely slow to start if there are no
            recent incoming traffic to the site.
         </h2>
         <h2>Apologies for the inconvinience.</h2>
      </div>
   );
}
