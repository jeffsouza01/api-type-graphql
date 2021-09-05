import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../../database/entities/User";


@ValidatorConstraint({async: true})
export class IsEmailAlreadyExistsConstraint implements ValidatorConstraintInterface {
  validate(email: string): boolean | Promise<boolean> {
    return User.findOne({ email }).then(user => {
      if (user) return false;
      return true;
    });
  }
}

export function IsEmailAlreadyExists(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistsConstraint
    });
  };
}