type AnyObject = Record<string, unknown>;

export function equals (obj1?: AnyObject, obj2?: AnyObject) {
  if (!obj1 && !obj2) return true;

  try {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  } catch {
    return false;
  }
}
