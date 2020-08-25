import { MikroORM } from "@mikro-orm/core";

export interface Context {
  em: MikroORM['em'];
}
