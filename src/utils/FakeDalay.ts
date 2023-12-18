export const fakeDelay = (delay:number) => {
  return new Promise<any>((res) => {
    setTimeout(res, delay)
  })
}