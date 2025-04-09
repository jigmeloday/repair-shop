import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  }, 
  handleServerError(e, untils) {
    const { clientInput, metadata } = untils;
    console.error('Server error:', e.message);
    console.error('Client input:', clientInput);
    console.error('Metadata:', metadata); 
    if (e.constructor.name === 'NeonDbError') {
      return "Db error"
    }
    return e.message
  }
});