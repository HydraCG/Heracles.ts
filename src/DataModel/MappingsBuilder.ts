import MappingsCollection from "./Collections/MappingsCollection";
import PropertyMapping from "./PropertyMapping";

/**
 * Provides a builder for {@link IIriTemplate} variable mapping values.
 */
export default class MappingsBuilder {
  private readonly mappings: MappingsCollection;
  private readonly result: { [name: string]: string };

  /**
   * Gets variable mappings in form of variable name - property IRI pairs.
   * @returns {{[variableName: string]: string}}
   */
  public get variableMappings(): { [variableName: string]: string } {
    const result = {};
    for (const mapping of this.mappings) {
      result[mapping.variable] = mapping.property.iri;
    }

    return result;
  }

  /**
   * Initializes a new instance of the {@link MappingBuilder} class.
   * @param {MappingsCollection} mappings IRI template variable mappings collection.
   */
  public constructor(mappings: MappingsCollection) {
    this.mappings = mappings;
    this.result = {};
  }

  /**
   * Allows to add an IRI property value.
   * @param {string} property IRI of the property to be filled with value.
   * @returns {PropertyMapping}
   */
  public withProperty(property: string): PropertyMapping {
    const mapping = this.mappings.ofProperty(property).first();
    if (!mapping) {
      throw new Error(`Invalid mapping of property '${property}.`);
    }

    return new PropertyMapping(this, this.result, mapping);
  }

  /**
   * Allows to add a direct variable value.
   * @param {string} property IRI of the property to be filled with value.
   * @returns {PropertyMapping}
   */
  public withVariable(variableName: string): PropertyMapping {
    const mapping = this.mappings.ofVariableName(variableName).first();
    if (!mapping) {
      throw new Error(`Invalid mapping of variable name mapping '${variableName}.`);
    }

    return new PropertyMapping(this, this.result, mapping);
  }

  /**
   * Completes the variable values mappings in form of variable name - serialized value pairs.
   * @returns {{[variable: string]: string}}
   */
  public complete(): { [name: string]: string } {
    return this.result;
  }
}
