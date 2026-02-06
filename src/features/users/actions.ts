"use server"
import { revalidatePath } from "next/cache"
import { deleteUserDb } from "./db"

export async function deleteUser(id: string) {
    try {

        const res = await deleteUserDb({ id })
        revalidatePath("/admin/users")
        return {
            success: false,
            message: "Successfully user deleted"
        }
    } catch (e) {
        return {
            success: false,
            message: e instanceof Error ? e.message : "Error deleting user"
        }
    }
}