"use client";

import { signIn } from "next-auth/react";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Hoş Geldiniz</h1>
            <p className="text-muted-foreground">
              Devam etmek için giriş yapın
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub ile devam et
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Mail className="mr-2 h-4 w-4" />
                Google ile devam et
              </Button>
            </motion.div>
          </div>
        </Card>
      </main>
      <Footer />
    </>
  );
} 