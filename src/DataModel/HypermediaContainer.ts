import OperationsCollection from "./Collections/OperationsCollection";
import TypedResourceFilterableCollection from "./Collections/TypedResourceFilterableCollection";
import { IHypermediaContainer } from "./IHypermediaContainer";
import { ITypedResource } from "./ITypedResource";

/**
 * Provides a default implementation of the {@link IHypermediaContainer} interface.
 * @class
 */
export default class HypermediaContainer extends TypedResourceFilterableCollection<ITypedResource>
  implements IHypermediaContainer {
  public readonly members?: TypedResourceFilterableCollection<ITypedResource>;

  public readonly operations: OperationsCollection;

  /**
   * Initializes a new instance of the {@link HypermediaContainer} class.
   * @param items {Iterable<ITypedResource>} Hypermedia controls to be stored within this container.
   * @param operations {OperationsCollection} Operations available on the container.
   * @param members {Iterable<ITypedResource>} Optional Hydra collection members in case container is a collection.
   */
  public constructor(
    items: Iterable<ITypedResource>,
    operations: OperationsCollection,
    members?: TypedResourceFilterableCollection<ITypedResource>
  ) {
    super(items);
    this.operations = operations;
    this.members =
      members instanceof TypedResourceFilterableCollection
        ? members
        : new TypedResourceFilterableCollection<ITypedResource>(members);
  }
}
