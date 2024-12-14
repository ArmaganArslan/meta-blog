"use client";

interface AdvertisementSectionProps {
  spacing?: "normal" | "small";
}

export function AdvertisementSection({ spacing = "normal" }: AdvertisementSectionProps) {
  return (
    <section className={spacing === "normal" ? "pt-16 pb-8" : "pt-8 pb-8"}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className="bg-muted rounded-xl p-6 text-center max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-2">Advertisement</p>
          <p className="text-lg text-muted-foreground font-medium">You can place ads</p>
          <p className="text-xs text-muted-foreground mt-1">750x100</p>
        </div>
      </div>
    </section>
  );
}