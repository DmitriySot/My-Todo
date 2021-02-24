export const breakpoints = { xxl: 1920, xl: 1200, l: 750, m: 550, sm: 450, s: 360 };

export const getMQ = (breakpoint: number | string, isMax?: boolean) => {
  return `@media (${isMax ? 'max' : 'min'}-width: ${breakpoint}px)`;
};
