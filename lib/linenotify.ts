export const lineNotifyHandler = async (message: string): Promise<void> => {
  try {
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Line notification');
    }

    const data = await response.json();
    console.log('Line Notify response:', data);
  } catch (error) {
    console.error('Error sending Line notification:', error);
    throw error;
  }
};
