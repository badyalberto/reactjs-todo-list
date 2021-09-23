export { };

declare global {
  interface Array<T> {
    move(from: T, to: T): void;
  }
}
