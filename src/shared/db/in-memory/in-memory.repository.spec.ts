import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { Uuid } from "../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRepository", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toEqual(entity);
  });

  it("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({ name: "Test 1", price: 100 }),
      new StubEntity({ name: "Test 2", price: 200 }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items.length).toBe(2);
    expect(repo.items).toEqual(entities);
    expect(repo.items[0]).toEqual(entities[0]);
    expect(repo.items[1]).toEqual(entities[1]);
  });

  it("should returns all entities", async () => {
    const entities = [
      new StubEntity({ name: "Test 1", price: 100 }),
      new StubEntity({ name: "Test 2", price: 200 }),
    ];
    await repo.bulkInsert(entities);

    const result = await repo.findAll();

    expect(result).toEqual(entities);
  });

  it("should throws error on update when entity not found", async () => {
    const entity = new StubEntity({
      name: "Test",
      price: 100,
    });

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);

    const entityUpdated = new StubEntity({
      entity_id: entity.entity_id,
      name: "Test Updated",
      price: 100,
    });

    await repo.update(entityUpdated);

    expect(entityUpdated.toJSON()).toEqual(repo.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", async () => {
    const entity_id = new Uuid();

    await expect(repo.delete(entity_id)).rejects.toThrow(
      new NotFoundError(entity_id, StubEntity)
    );

    await expect(
      repo.delete(new Uuid("956b7404-4fea-463f-9eb6-73719f8b1476"))
    ).rejects.toThrow(
      new NotFoundError("956b7404-4fea-463f-9eb6-73719f8b1476", StubEntity)
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);

    await repo.delete(entity.entity_id);

    expect(repo.items).toHaveLength(0);
  });
});
