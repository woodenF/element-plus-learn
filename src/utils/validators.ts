export const isValidWidthUnit = (val: string) => {
  ['px', 'rem', 'em', 'vw', '%', 'vmin', 'vamx'].some(unit => 
    val.endsWith(unit)
  )
}
export const isValidComponentSize = (val: string) => 
  ['', 'large', 'medium', 'small', 'mini'].includes(val)