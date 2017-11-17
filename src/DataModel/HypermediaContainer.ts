import { IOperationsCollection } from "./Collections/IOperationsCollection";
import { ITypedResourceFilteredCollection } from "./Collections/ITypedResourceFilteredCollection";
import TypedResourceFilteredCollection from "./Collections/TypedResourceFilteredCollection";
import { IHypermediaContainer } from "./IHypermediaContainer";
import { ITypedResource } from "./ITypedResource";

/**
 * Provides a default implementation of the {@link IHypermediaContainer} interface.
 * @class
 */
export default class HypermediaContainer extends TypedResourceFilteredCollection<ITypedResource>
  implements IHypermediaContainer {
  public readonly members?: ITypedResourceFilteredCollection<ITypedResource>;

  public readonly operations: IOperationsCollection;

  /**
   * Initializes a new instance of the {@link HypermediaContainer} class.
   * @param items {Iterable<ITypedResource>} Hypermedia controls to be stored within this container.
   * @param operations {IOperationsCollection} Operations available on the container.
   * @param members {Iterable<ITypedResource>} Optional Hydra collection members in case container is a collection.
   */
  public constructor(
    items: Iterable<ITypedResource>,
    operations: IOperationsCollection,
    members?: ITypedResourceFilteredCollection<ITypedResource>
  ) {
    super(items);
    this.operations = operations;
    this.members =
      members instanceof TypedResourceFilteredCollection
        ? members
        : new TypedResourceFilteredCollection<ITypedResource>(members);
  }
}
