import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  test("should be equal", () => {
    const value1 = new StringValueObject("test");
    const value2 = new StringValueObject("test");

    expect(value1.equals(value2)).toBeTruthy();

    const complexValue1 = new ComplexValueObject("test", 1);
    const complexValue2 = new ComplexValueObject("test", 1);

    expect(complexValue1.equals(complexValue2)).toBeTruthy();
  });

  test("should not be equal", () => {
    const value1 = new StringValueObject("test");
    const value2 = new StringValueObject("test2");

    expect(value1.equals(value2)).toBeFalsy();
    expect(value1.equals(null)).toBeFalsy();
    expect(value2.equals(undefined)).toBeFalsy();

    const complexValue1 = new ComplexValueObject("test", 1);
    const complexValue2 = new ComplexValueObject("test", 2);

    expect(complexValue1.equals(complexValue2)).toBeFalsy();
    expect(complexValue1.equals(null)).toBeFalsy();
    expect(complexValue2.equals(undefined)).toBeFalsy();
  });
});
