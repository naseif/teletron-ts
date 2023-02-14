import FormData from "form-data";

export function prepareFormDataPayLoad(options: object) {
  const form = new FormData();
  for (const option in options) {
    //@ts-expect-error
    form.append(option, options[option]);
  }
  const formHeaders = form.getHeaders();

  return {
    form,
    formHeaders,
  };
}

export function isSerialized(object: string): boolean {
  try {
    JSON.parse(object);
    return true;
  } catch (error) {
    return false;
  }
}

export function serializeJSON<T>(obj: T): string {
  try {
    const serialized = JSON.stringify(obj);
    return serialized;
  } catch (error) {
    throw error;
  }
}

export function serializeObjectProperties<T>(obj: Record<string, any>): T {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object") {
        result[key] = JSON.stringify(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result as T;
}
