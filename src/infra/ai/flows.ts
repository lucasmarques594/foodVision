import { z } from 'zod';

const ImageInputSchema = z.object({
  images: z.array(z.object({
    base64: z.string(),
    mimeType: z.string(),
  })),
});
