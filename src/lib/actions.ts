"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addProduct, deleteProduct, getProductById, updateProduct } from "./data";
import { generateProductDescription } from "@/ai/flows/generate-product-description";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  articleNo: z.string().min(1, "Article Number is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  qty: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  image: z.string().url("Must be a valid URL"),
  description: z.string().min(1, "Description is required"),
  qrCode: z.string().url("Must be a valid URL for QR code").or(z.literal('')),
});

export async function addProductAction(data: FormData) {
  const validatedFields = productSchema.safeParse(Object.fromEntries(data.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields. Please check your input.",
    };
  }

  try {
    await addProduct(validatedFields.data);
    revalidatePath("/admin/products");
    revalidatePath("/admin/fabrics");
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: "Failed to create product.",
    };
  }
}

export async function updateProductAction(id: string, data: FormData) {
  const validatedFields = productSchema.safeParse(Object.fromEntries(data.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields. Please check your input.",
    };
  }
  
  try {
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
        return { success: false, error: "Product not found." };
    }
    await updateProduct(id, validatedFields.data);
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/edit/${id}`);
    revalidatePath(`/products/${existingProduct.articleNo}`);
    revalidatePath("/admin/fabrics");
    revalidatePath(`/admin/fabrics/edit/${id}`);
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: "Failed to update product.",
    };
  }
}


export async function deleteProductAction(id: string) {
  try {
    const success = await deleteProduct(id);
    if (!success) {
      return { success: false, error: "Product not found." };
    }
    revalidatePath("/admin/products");
    revalidatePath("/admin/fabrics");
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: "Failed to delete product.",
    };
  }
}

export async function generateDescriptionAction(name: string, articleNo: string, imageUrl?: string) {
    if (!name || !articleNo) {
        return { success: false, error: "Product Name and Article No. are required to generate a description." };
    }
    try {
        const result = await generateProductDescription({ name, articleNo, imageUrl });
        return { success: true, description: result.description };
    } catch (e) {
        console.error(e);
        return { success: false, error: "Failed to generate AI description." };
    }
}
