interface ApiOk<T> {
  data: T;
  error: null;
}
interface ApiError<E> {
  data: null;
  error: E;
}
export type ApiResponse<T, E> = ApiOk<T> | ApiError<E>;
