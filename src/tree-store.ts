import { Id, Item } from "./typing.ts";

export class TreeStore {
  /**
   * Массив всех элементов
   */
  private readonly items: Item[];

  /**
   * Map для быстрого доступа к элементам по их идентификатору
   */
  private itemMap: Map<Id, Item>;

  /**
   * Map для хранения детей каждого элемента
   */
  private childrenMap: Map<Id, Item[]>;

  /**
   * Map для хранения родителя каждого элемента
   */
  private parentMap: Map<Id, Id>;

  /**
   * Конструктор, который инициализирует классы и карты
   * @param {Item[]} items - массив элементов для инициализации
   */
  constructor(items: Item[]) {
    this.items = items;
    this.itemMap = new Map();
    this.childrenMap = new Map();
    this.parentMap = new Map();

    this.initializeMaps(items);
  }

  /**
   * Метод для инициализации карт из переданных элементов
   * @param {Item[]} items - массив элементов для инициализации карт
   */
  private initializeMaps(items: Item[]): void {
    for (const item of items) {
      const { id, parent } = item;
      this.itemMap.set(id, item);

      if (!this.childrenMap.has(parent)) {
        this.childrenMap.set(parent, []);
      }
      this.childrenMap.get(parent)?.push(item);
      this.parentMap.set(id, parent);
    }
  }

  /**
   * Метод для получения всех элементов
   * @returns {Item[]} массив всех элементов
   */
  public getAll(): Item[] {
    return this.items;
  }

  /**
   * Метод для получения элемента по его id
   * @param {Id} id - идентификатор элемента
   * @returns {Item | null} элемент или null, если не найден
   */
  public getItem(id: Id): Item | null {
    return this.itemMap.get(id) || null;
  }

  /**
   * Метод для получения прямых детей элемента по его id
   * @param {Id} id - идентификатор элемента
   * @returns {Item[]} массив детей или пустой массив
   */
  public getChildren(id: Id): Item[] {
    return this.childrenMap.get(id) || [];
  }

  /**
   * Метод для получения всех потомков элемента по его id
   * @param {Id} id - идентификатор элемента
   * @returns {Item[]} отсортированный массив всех потомков элемента
   */
  public getAllChildren(id: Id): Item[] {
    const result: Item[] = [];

    const collectChildren = (parentId: number | string): void => {
      const children = this.getChildren(parentId);
      for (const child of children) {
        result.push(child);
        collectChildren(child.id);
      }
    };

    collectChildren(id);

    return result.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  /**
   * Метод для получения всех родителей элемента до корня
   * @param {Id} id - идентификатор элемента
   * @returns {Item[]} массив всех родителей элемента
   */
  public getAllParents(id: Id): Item[] {
    const result: Item[] = [];
    let currentId: Id | undefined = id;

    while (currentId !== "root" && currentId !== undefined) {
      const currentItem = this.getItem(currentId);
      if (currentItem) {
        result.push(currentItem);
        currentId = this.parentMap.get(currentId);
      } else {
        break;
      }
    }

    return result;
  }
}
