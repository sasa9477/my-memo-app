export {};

declare global {
  interface String {
    /** 連続した改行を削除します。 */
    removeConsecutiveNewlines(): string
  }
}

String.prototype.removeConsecutiveNewlines = function () {
  const value = this as string
  return value.replace(/\n\n+/g, '\n\n')
}