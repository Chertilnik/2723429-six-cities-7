export async function retryOrConnect<T>(
  operation: () => Promise<T>,
  retryCount: number,
  timeout: number,
  onError: (error: Error, attempt: number) => void
): Promise<T> {
  let attempt = 0;

  while (attempt < retryCount) {
    try {
      return await operation();
    } catch (e) {
      attempt++;

      if (onError) {
        onError(e as Error, attempt);
      }
      if (attempt >= retryCount) {
        throw e;
      }

      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  }

  throw new Error('Не удалось выполнить операцию после всех попыток');
}
