import { defineCollection, z } from 'astro:content';

const menuCollection = defineCollection({
    type: 'data',
    schema: z.object({
        platos: z.object({
            title: z.string(),
            sections: z.array(z.object({
                title: z.string(),
                items: z.array(z.object({
                    name: z.string(),
                    price: z.string(),
                })),
            })),
        }),
        bebidas: z.object({
            title: z.string(),
            sections: z.array(z.object({
                title: z.string(),
                items: z.array(z.object({
                    name: z.string(),
                    price: z.string(),
                })),
            })),
        }),
    }),
});

const eventsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        date: z.date(),
        artist: z.string(),
        time: z.string(),
        description: z.string(),
    }),
});

export const collections = {
    'menu': menuCollection,
    'events': eventsCollection,
};
