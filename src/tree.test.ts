import { items } from "./const.ts";
import { TreeStore } from "./tree-store";

let treeStore: TreeStore;

beforeEach(() => {
  treeStore = new TreeStore(items);
});

describe("Тесты класса TreeStore", () => {
  test("getAll() должен возвращать все элементы", () => {
    expect(treeStore.getAll()).toEqual(items);
  });

  test("getItem() должен возвращать правильный элемент по id", () => {
    expect(treeStore.getItem(1)).toEqual({ id: 1, parent: "root" });
    expect(treeStore.getItem(4)).toEqual({ id: 4, parent: 2, type: "test" });
  });

  test("getItem() должен возвращать null для несуществующего id", () => {
    expect(treeStore.getItem(999)).toBeNull();
  });

  test("getChildren() должен возвращать прямых детей элемента", () => {
    expect(treeStore.getChildren(1)).toEqual([
      { id: 2, parent: 1, type: "test" },
      { id: 3, parent: 1, type: "test" },
    ]);
    expect(treeStore.getChildren(2)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
    ]);
  });

  test("getChildren() должен возвращать пустой массив, если детей нет", () => {
    expect(treeStore.getChildren(8)).toEqual([]);
  });

  test("getAllChildren() должен возвращать всех потомков элемента", () => {
    expect(treeStore.getAllChildren(2)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ]);
  });

  test("getAllChildren() должен возвращать пустой массив, если потомков нет", () => {
    expect(treeStore.getAllChildren(6)).toEqual([]);
  });

  test("getAllParents() должен возвращать всех родителей до корня", () => {
    expect(treeStore.getAllParents(7)).toEqual([
      { id: 7, parent: 4, type: null },
      { id: 4, parent: 2, type: "test" },
      { id: 2, parent: 1, type: "test" },
      { id: 1, parent: "root" },
    ]);
  });

  test("getAllParents() должен возвращать только элемент, если у него нет родителя", () => {
    expect(treeStore.getAllParents(1)).toEqual([{ id: 1, parent: "root" }]);
  });

  test("getAllParents() должен возвращать пустой массив, если id некорректен", () => {
    expect(treeStore.getAllParents(999)).toEqual([]);
  });
});
