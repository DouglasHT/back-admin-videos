import { ValidationError } from "./validation.error";

export class ValidationRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidationRules(value, property);
  }

  required(): Omit<this, "required"> {
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new ValidationError(`The ${this.property} is required`);
    }
    return this;
  }
}
