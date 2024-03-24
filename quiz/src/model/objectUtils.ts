import { ICampusDTO } from './CampusDTO';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectContainsAllAttributes(object: any, attributes: string[]): boolean {
    for(const attribute of attributes){
        if(!(attribute in object)) return false;
    }

    return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function containsNull(data: any): boolean {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && data[key as keyof ICampusDTO] === null) {
        return true;
      }
    }
    return false;
}