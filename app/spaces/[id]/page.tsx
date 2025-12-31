import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function SpacePage({ params }: { params: { id: string } }) {
    const space = await prisma.space.findUnique({
        where: { id: params.id },
        include: { user: true }
    })
    
    if (!space) notFound()
    
    return (
        <div>
            <h1>{space.name}</h1>
            {/* Space content */}
        </div>
    )
}
