import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategorySequelizeRepository } from "../category-sequelize.repository";
import { Category } from "../../../../domain/category.entity";
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";

describe("CategorySequelizeRepository Integration Test", () => {
  let sequelize;
  let repository: CategorySequelizeRepository;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
    });
    await sequelize.sync({ force: true });
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it("should insert a new category", async () => {
    let category = Category.fake().aCategory().build();
    await repository.insert(category);
    let entity = await repository.findById(category.category_id);
    expect(entity.toJSON()).toStrictEqual(category.toJSON());
  });

  it("should finds a entity by id", async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = Category.fake().aCategory().build();
    await repository.insert(entity);
    entityFound = await repository.findById(entity.category_id);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
  });

  it("should throw error on update when a entity not found", async () => {
    const entity = Category.fake().aCategory().build();

    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.category_id.id, Category)
    );
  });

  it("should update entity", async () => {
    const entity = Category.fake().aCategory().build();
    await repository.insert(entity);

    entity.changeName("Movie updated");
    await repository.update(entity);

    const entityFound = await repository.findById(entity.category_id);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
  });
});
