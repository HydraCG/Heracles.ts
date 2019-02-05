import ProcessingState from "./ProcessingState";

type Literal = string | boolean | number;
type MappingsProcessor = (items: any[], processingState: ProcessingState, propertyName: string) => any;

/**
 * Describes a simple RDF mapping in Heracles' data model.
 * @interface
 */
export interface IPropertyMapping {
  /**
   * Gets the property name.
   * @readonly
   * @returns {string}
   */
  propertyName: string;

  /**
   * Gets the type of the resource that this property is valid for.
   * @readonly
   * @returns {string[]}
   */
  type?: string[];

  /**
   * Gets a value indicating whether the property is required and needs to be created anyway.
   * @readonly
   * @returns {boolean}
   */
  required?: boolean;

  /**
   * Gets the either default literal value or a factory method to be used for this property.
   * @readonly
   * @returns {Function | string | number | boolean}
   */
  default?: Literal | MappingsProcessor;
}
