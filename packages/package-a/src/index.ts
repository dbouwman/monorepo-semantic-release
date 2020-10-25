/**
 * Display Greeting for Common
 * @param name Name to greet
 */
export function greet(name: string): string {
  return `Hello ${name}, this is package-a`;
}

export function greetFromDave(name: string): string {
  return `Hello ${name}, this is Dave`;
}

export function greetFromTom(name: string): string {
  return `Hello ${name}, this is Tom, and I welcome our robot overlords`;
}
