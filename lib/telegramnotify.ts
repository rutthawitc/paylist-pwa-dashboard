import { sendTelegramNotification } from '@/actions/telegram';

/**
 * Client-side function to trigger Telegram notification
 * @param options - Options for Telegram notification
 */
export interface TelegramNotifyOptions {
  message: string;
  userId?: string;
  area?: string;
  userArea?: string;
  divName?: string;
  depName?: string;
  includeAreaDetails?: boolean;
}

export const telegramNotify = async (options: TelegramNotifyOptions): Promise<boolean> => {
  try {
    const { message, userId, area, userArea, divName, depName, includeAreaDetails } = options;
    
    console.log(`[TelegramNotify] Preparing to send: userArea=${userArea}, divName=${divName}, depName=${depName}, includeAreaDetails=${includeAreaDetails}`);
    const result = await sendTelegramNotification({
      message,
      userId,
      area,
      userArea,
      divName,
      depName,
      includeAreaDetails,
    });

    if (!result.success) {
      console.error('[TelegramNotify] Failed to send notification:', result.message);
      // We'll handle toast in the component
      return false;
    }

    console.log('[TelegramNotify] Successfully sent notification');
    // We'll handle toast in the component
    return true;
  } catch (error) {
    console.error('Telegram Notify Error:', error);
    // We'll handle toast in the component
    return false;
  }
};
