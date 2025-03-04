import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export interface LineNotifyOptions {
  message: string;
  area?: string;
  userId?: string;
  userArea?: string;
  divName?: string;
  depName?: string;
  includeAreaDetails?: boolean;
}

export const lineNotify = async (options: LineNotifyOptions): Promise<boolean> => {
  try {
    const { message, area, userId, userArea, divName, depName, includeAreaDetails } = options;
    
    const response = await axios.post('/api/notify', {
      message,
      area,
      userId,
      userArea,
      divName,
      depName,
      includeAreaDetails,
    });

    // We'll handle toast in the component
    return true;
  } catch (error) {
    console.error('Line Notify Error:', error);
    // We'll handle toast in the component
    return false;
  }
};
