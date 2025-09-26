"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const URI = process.env.NEXT_PUBLIC_URI;

export async function revalidate<T>(to: string, data: T) {
  try {
    await axios.post(`${URI}/api/v1/address`, data);
    revalidatePath(to);
    return {
      success: true
    }
  } catch (e) {
    return {
      success: false
    }
  }
}