"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

   const onSubmit = (data: z.infer<typeof FormSchema>) => {
      console.log("Form Submitted:", data);
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

                  <Button type="submit" className="w-full">
                     Submit
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
}
