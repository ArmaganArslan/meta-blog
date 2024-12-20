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
  title: z.string().min(1, "Title is required"),
  sections: z.array(sectionSchema),
  categoryId: z.string().min(1, "Category is required"),
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
        title: "Success",
        description: "Blog post created successfully",
      });
      router.push("/blog");
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error",
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
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container max-w-2xl mx-auto mt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">New Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            {...register("title")}
            placeholder="Title"
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
                  ? "Loading categories..." 
                  : "Select category"
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
            <p className="text-red-500 text-sm mt-1">Failed to load categories</p>
          )}
        </div>

        <div>
          <Input
            {...register("image")}
            placeholder="Cover Image URL"
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
                    <SelectValue placeholder="Section type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="heading">Heading</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  type="button" 
                  variant="destructive"
                  onClick={() => removeSection(index)}
                >
                  Delete
                </Button>
              </div>

              {section.type === "image" ? (
                <Input
                  value={section.imageUrl || ""}
                  onChange={(e) => updateSection(index, "imageUrl", e.target.value)}
                  placeholder="Image URL"
                  className="mb-2"
                />
              ) : null}

              <Textarea
                value={section.content}
                onChange={(e) => updateSection(index, "content", e.target.value)}
                placeholder={
                  section.type === "paragraph" ? "Paragraph content..." :
                  section.type === "heading" ? "Heading content..." :
                  "Image description..."
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
            Add Paragraph
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addSection("heading")}
          >
            Add Heading
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addSection("image")}
          >
            Add Image
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Blog Post"}
        </Button>
      </form>
    </div>
  );
} 