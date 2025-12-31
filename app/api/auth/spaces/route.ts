'use server'
import prisma from "@/lib/prisma"

export async function createSpace(prevState: any, formData: FormData) {
    try {
        const name = formData.get('spaceName') as string
        const email = formData.get('userEmail') as string
        
        const user = await prisma.user.findUnique({
            where: { email }
        })
        
        if (!user) {
            return { success: false, error: "User not found" }
        }
        
        const new_space = await prisma.space.create({
            data: {
                userId: user.id,
                name
            }
        })
        
        return { success: true, space: new_space }
    } catch (error) {
        return { success: false, error: "Failed to create space" }
    }
}
