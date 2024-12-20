"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";
import { Mail } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const { mutate: subscribe } = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have successfully subscribed to our newsletter.",
      });
      reset();
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    setIsLoading(true);
    subscribe({ email: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <Input
          {...register("email")}
          type="email"
          placeholder="Your Email"
          className={`${errors.email ? "border-red-500" : ""} pr-10`}
        />
        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full bg-[#4B6BFB] hover:bg-[#3b4cd0] hover:scale-[1.02] transition-all text-white"
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
} 