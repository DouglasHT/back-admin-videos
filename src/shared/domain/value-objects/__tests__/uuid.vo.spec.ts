import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("Uuid Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");
  test("should throw when uuid is invalid", () => {
    expect(() => {
      new Uuid("invalid-uuid");
    }).toThrowError(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should accept a valid uuid", () => {
    const uuid = new Uuid("c5c4a5c0-4e3d-4e3c-8f2b-3e4f2e1d2c1b");
    expect(uuid.id).toBe("c5c4a5c0-4e3d-4e3c-8f2b-3e4f2e1d2c1b");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
