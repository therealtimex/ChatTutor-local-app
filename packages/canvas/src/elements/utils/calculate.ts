export const calculate = <T = unknown>(src: string, o?: object) => {
  return new Function(`return (function($__ctx){with($__ctx){return (${src});}});`)()(o ?? {}) as T
}