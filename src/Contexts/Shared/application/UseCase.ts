export interface UseCase {
  run(...parameters: unknown[]): unknown
}
