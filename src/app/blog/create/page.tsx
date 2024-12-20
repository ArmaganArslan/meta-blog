"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type PostContent } from "@/lib/types";

const sectionSchema = z.object({
  type: z.enum(["paragraph", "heading", "image"]),
  content: z.string(),
  imageUrl: z.string().optional(),
});

const createPostSchema = z.object({
  title: z.string().min(1, "Başlık gerekli"),
  sections: z.array(sectionSchema),
  categoryId: z.string().min(1, "Kategori gerekli"),
  image: z.string().optional(),
});

type CreatePostForm = z.infer<typeof createPostSchema>;
type Section = z.infer<typeof sectionSchema>;

export default function CreatePostPage() {
  const [sections, setSections] = useState<Section[]>([
    { type: "paragraph", content: "" }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      sections: sections
    }
  });

  const addSection = (type: "paragraph" | "heading" | "image") => {
    setSections([...sections, { type, content: "", imageUrl: type === "image" ? "" : undefined }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
    setValue("sections", newSections);
  };

  const createPost = trpc.post.createPost.useMutation({
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Blog yazısı başarıyla oluşturuldu",
      });
      router.push("/blog");
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: CreatePostForm) => {
    setIsLoading(true);
    try {
      const postContent: PostContent = {
        sections: sections
      };

      await createPost.mutateAsync({
        title: data.title,
        content: postContent,
        categoryId: data.categoryId,
        image: data.image,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { 
    data: categories, 
    isLoading: isCategoriesLoading,
    error: categoriesError 
  } = trpc.category.getCategories.useQuery(undefined, {
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Kategoriler yüklenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container max-w-2xl mx-auto mt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">Yeni Blog Yazısı</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            {...register("title")}
            placeholder="Başlık"
            className="w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Select
            {...register("categoryId")}
            onValueChange={(value) => {
              setValue("categoryId", value);
            }}
            disabled={isCategoriesLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={
                isCategoriesLoading 
                  ? "Kategoriler yükleniyor..." 
                  : "Kategori seçin"
              } />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
          )}
          {categoriesError && (
            <p className="text-red-500 text-sm mt-1">Kategoriler yüklenirken bir hata oluştu</p>
          )}
        </div>

        <div>
          <Input
            {...register("image")}
            placeholder="Kapak Görseli URL'si"
            className="w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="relative border p-4 rounded-lg">
              <div className="flex gap-2 mb-2">
                <Select
                  value={section.type}
                  onValueChange={(value: "paragraph" | "heading" | "image") => 
                    updateSection(index, "type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bölüm tipi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraph">Paragraf</SelectItem>
                    <SelectItem value="heading">Başlık</SelectItem>
                    <SelectItem value="image">Görsel</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  type="button" 
                  variant="destructive"
                  onClick={() => removeSection(index)}
                >
                  Sil
                </Button>
              </div>

              {section.type === "image" ? (
                <Input
                  value={section.imageUrl || ""}
                  onChange={(e) => updateSection(index, "imageUrl", e.target.value)}
                  placeholder="Görsel URL'si"
                  className="mb-2"
                />
              ) : null}

              <Textarea
                value={section.content}
                onChange={(e) => updateSection(index, "content", e.target.value)}
                placeholder={
                  section.type === "paragraph" ? "Paragraf içeriği..." :
                  section.type === "heading" ? "Başlık içeriği..." :
                  "Görsel açıklaması..."
                }
                className="w-full"
                rows={section.type === "paragraph" ? 4 : 1}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addSection("paragraph")}
          >
            Paragraf Ekle
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addSection("heading")}
          >
            Başlık Ekle
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addSection("image")}
          >
            Görsel Ekle
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Oluşturuluyor..." : "Blog Yazısı Oluştur"}
        </Button>
      </form>
    </div>
  );
} 