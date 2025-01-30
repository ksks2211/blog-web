import { camelCase, kebabCase, snakeCase } from "lodash-es";

export function validateUserId(userId: string) {
  // 아이디 길이 검사
  if (userId.length < 4 || userId.length > 16) {
    return false;
  }

  // 아이디는 숫자로 시작할 수 없음
  if (/^\d/.test(userId)) {
    return false;
  }

  // 허용된 문자 (영문 소문자, 숫자, '_', '.')
  if (!/^[a-z0-9._]+$/.test(userId)) {
    return false;
  }

  // 연속된 특수문자 불허 (_나 .이 연속될 수 없음)
  if (/[_.]{2,}/.test(userId)) {
    return false;
  }

  // 특수문자가 아이디 끝에 올 수 없음
  if (/[_.]$/.test(userId)) {
    return false;
  }

  return true; // 모든 조건을 통과하면
}

// letter casing
export function toSnakeCase(input: string) {
  return snakeCase(input);
}

export function toKebabCase(input: string) {
  return kebabCase(input);
}

export function toCamelCase(input: string) {
  return camelCase(input);
}

export function toPascalCase(input: string) {
  const camelCase = toCamelCase(input);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

export function toTitleCase(input: string) {
  const snakeCase = toSnakeCase(input);

  return snakeCase
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
