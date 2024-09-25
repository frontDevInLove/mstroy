export type Id = string | number;

export interface Item {
  id: Id;
  parent: Id;
  // Потенциальный рудимент(не влияет на логику, просто дополнительная полезная информация)
  type?: unknown;
}
