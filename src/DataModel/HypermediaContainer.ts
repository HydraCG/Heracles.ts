import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IHypermediaContainer } from "./IHypermediaContainer";
import { IResource } from "./IResource";

/**
 * Provides a default implementation of the {@link IHypermediaContainer} interface.
 * @class
 */
export default class HypermediaContainer extends ResourceFilterableCollection<IResource>
  implements IHypermediaContainer {
  public readonly members?: ResourceFilterableCollection<IResource>;

  public readonly operations: OperationsCollection;

  public readonly links: LinksCollection;

  /**
   * Initializes a new instance of the {@link HypermediaContainer} class.
   * @param items {Iterable<IResource>} Hypermedia controls to be stored within this container.
   * @param operations {OperationsCollection} Operations available on the container.
   * @param links {LinksCollection} Links available on the container.
   * @param members {Iterable<IResource>} Optional Hydra collection members in case container is a collection.
   */
  public constructor(
    items: Iterable<IResource>,
    operations: OperationsCollection,
    links: LinksCollection,
    members?: ResourceFilterableCollection<IResource>
  ) {
    super(items);
    this.operations = operations;
    this.links = links;
    this.members =
      members instanceof ResourceFilterableCollection ? members : new ResourceFilterableCollection<IResource>(members);
  }
}
