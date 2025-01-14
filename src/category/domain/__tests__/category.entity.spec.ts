import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  describe("constructor", () => {
    test("should create a category with default values", () => {
      const category = new Category({
        name: "Movie",
      });
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  test("should create a category with custom values", () => {
    const created_at = new Date();
    const category = new Category({
      name: "Movie",
      description: "Movie category",
      is_active: false,
      created_at,
    });
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie category");
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toEqual(created_at);
  });
});
