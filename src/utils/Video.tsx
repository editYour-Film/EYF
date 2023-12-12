export type VideoDuration = {
  min: number,
  sec: number,
  mmss: string
}

export const getDurationFromTime = (time: number) => {
  const mzminutes = Math.floor(time / 60);
  const mzseconds = Math.floor(time - mzminutes * 60);
  const mmss = mzminutes + ":" + (mzseconds < 10 ? "0" + mzseconds : mzseconds);
  
  const obj:VideoDuration = {
    min: mzminutes,
    sec: mzseconds,
    mmss
  } 

  return obj;
}

export const getDuration = (videoEl: HTMLVideoElement) => {
  const duration = videoEl.duration

  return getDurationFromTime(duration)
}