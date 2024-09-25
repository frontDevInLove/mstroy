import { TreeStore } from "./tree-store.ts";
import { items } from "./const.ts";

const treeStore = new TreeStore(items);

console.log(treeStore.getAll()); // Полный список элементов
console.log(treeStore.getItem(7)); // Элемент с id 7
console.log(treeStore.getChildren(4)); // Прямые потомки элемента с id 4
console.log(treeStore.getAllChildren(2)); // Все потомки элемента с id 2
console.log(treeStore.getAllParents(7)); // Все родители элемента с id 7
