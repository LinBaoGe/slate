export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    // 为了处理 Supabase 的 PostgrestError 等自定义错误对象
    message = String((error as { message: unknown }).message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = '发生未知错误。';
  }

  return message;
};
