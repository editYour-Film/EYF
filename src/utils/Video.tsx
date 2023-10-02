export type VideoDuration = {
  min: number,
  sec: number,
  mmss: string
}

export const getDuration = (videoEl: HTMLVideoElement) => {
  const duration = videoEl.duration

  const mzminutes = Math.floor(duration / 60);
  const mzseconds = Math.floor(duration - mzminutes * 60);
  const mmss = mzminutes + ":" + (mzseconds < 10 ? "0" + mzseconds : mzseconds);

  const obj:VideoDuration = {
    min: mzminutes,
    sec: mzseconds,
    mmss
  } 

  return obj;
}