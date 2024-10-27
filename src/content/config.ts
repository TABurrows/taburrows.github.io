// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';


// 2. Define your collection(s)
const notesCollection = defineCollection({ /* ... */
    type: 'content',
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        // date: z.date()
    })
});

const postsCollection = defineCollection({ /* ... */
    type: 'content',
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
    })
});

const solutionsCollection = defineCollection({ /* ... */
    type: 'content',
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
    })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    'notes': notesCollection,
    'posts': postsCollection,
    'solutions': solutionsCollection
};