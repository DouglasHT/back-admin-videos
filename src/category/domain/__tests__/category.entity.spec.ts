import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  describe("constructor", () => {
    test("should create a category with default values", () => {
      const category = new Category({
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  test("should create a category with all values", () => {
    const created_at = new Date();
    const category = new Category({
      name: "Movie",
      description: "Movie category",
      is_active: false,
      created_at,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie category");
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toEqual(created_at);
  });

  test("should create a category with name and description", () => {
    const created_at = new Date();
    const category = new Category({
      name: "Movie",
      description: "Movie category",
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie category");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toEqual(created_at);
  });
});

describe("Create Command", () => {
  test("should create a category", () => {
    const category = new Category({
      name: "Movie",
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("should create a category with description", () => {
    const category = new Category({
      name: "Movie",
      description: "Movie category",
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie category");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("should create a category with is_active", () => {
    const category = new Category({
      name: "Movie",
      description: "Movie category",
      is_active: false,
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie category");
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBeInstanceOf(Date);
  });
});

describe("category_id field", () => {
  const arrange = [
    {
      category_id: null,
    },
    {
      category_id: undefined,
    },
    {
      category_id: new Uuid(),
    },
  ];

  test.each(arrange)("id = %j", ({ category_id }) => {
    const category = new Category({
      name: "Movie",
      category_id,
    });

    expect(category.category_id).toBeInstanceOf(Uuid);

    if (category_id instanceof Uuid) {
      expect(category.category_id).toBe(category_id);
    }
  });
});

test("should change name", () => {
  const category = new Category({
    name: "Movie",
  });

  category.changeName("Other Movie");
  expect(category.name).toBe("Other Movie");
});

test("should change description", () => {
  const category = new Category({
    name: "Movie",
    description: "Movie Description",
  });

  category.changeDescription("Other Description");
  expect(category.description).toBe("Other Description");
});

test("should activate category", () => {
  const category = new Category({
    name: "Movie",
    is_active: false,
  });

  category.activate();
  expect(category.is_active).toBeTruthy();
});

test("should deactivate category", () => {
  const category = new Category({
    name: "Movie",
  });

  category.deactivate();
  expect(category.is_active).toBeFalsy();
});
