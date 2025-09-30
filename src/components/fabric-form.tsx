"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { type Product as Fabric } from "@/lib/types";
import { addProductAction, generateDescriptionAction, updateProductAction } from "@/lib/actions";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  articleNo: z.string().min(1, "Article Number is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  qty: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  image: z.string().url("Must be a valid URL"),
  description: z.string().min(10, "Description should be at least 10 characters."),
});

type FabricFormProps = {
  fabric?: Fabric | null;
};

export function FabricForm({ fabric }: FabricFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAiPending, startAiTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fabric ? {
      name: fabric.name,
      articleNo: fabric.articleNo,
      price: fabric.price,
      qty: fabric.qty,
      image: fabric.image,
      description: fabric.description,
    } : {
      name: "",
      articleNo: "",
      price: 0,
      qty: 0,
      image: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      const action = fabric
        ? updateProductAction.bind(null, fabric.id)
        : addProductAction;

      const result = await action(formData);
      
      if (result.success) {
        toast({
          title: `Fabric ${fabric ? "Updated" : "Created"}`,
          description: `The fabric "${values.name}" has been successfully saved.`,
        });
        router.push("/admin/fabrics");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  const handleGenerateDescription = () => {
    const { name, articleNo, image } = form.getValues();
    if (!name || !articleNo) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please enter a Fabric Name and Article No. before generating a description.",
        });
        return;
    }
    startAiTransition(async () => {
        const result = await generateDescriptionAction(name, articleNo, image);
        if (result.success && result.description) {
            form.setValue("description", result.description, { shouldValidate: true });
            toast({
                title: "Description Generated",
                description: "The AI-powered description has been added.",
            });
        } else {
             toast({
                variant: "destructive",
                title: "AI Generation Failed",
                description: result.error,
            });
        }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">
            {fabric ? "Edit Fabric" : "Add New Fabric"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fabric Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lakeside Linen Blend" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="articleNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., F101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity in Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Description</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isAiPending}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {isAiPending ? "Generating..." : "Generate with AI"}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the fabric..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be shown on the fabric detail page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Fabric"}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
