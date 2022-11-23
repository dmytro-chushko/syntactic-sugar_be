import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import countries from 'country-state-picker/lib/data/countries';

@ValidatorConstraint({ name: 'isCountry' })
export class IsCountry implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const arr = countries.filter((country) => {
      return country.name == value;
    });

    return arr.length == 1;
  }
}
