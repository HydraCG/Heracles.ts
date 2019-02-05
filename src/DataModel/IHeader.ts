/**
 * Describes an abstract header.
 * @interface
 */
export interface IHeader {
  /**
   * Gets a name of the header.
   * @readonly
   */
  readonly name: string;

  /**
   * Gets a value of the header.
   * @readonly
   */
  readonly value: string;
}
