
import {greetFromTom} from 'msr-test-package-a';

/**
 * Display Greeting for Processors
 * @param name Name to greet
 */
export function greetProcessors(name: string): string {
  return `Hello ${name}, this is package-b`;
  //add comment
}

export function helloify(name:string): string {
  return greetFromTom(name);
}
