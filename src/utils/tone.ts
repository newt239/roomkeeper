import { Synth } from "tone";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const successBeep = async () => {
  if (typeof window === "undefined") return;
  const synth = new Synth().toDestination();
  synth.triggerAttackRelease("C4", "8n");
  await sleep(100);
  synth.triggerAttackRelease("E4", "8n");
  await sleep(100);
  synth.triggerAttackRelease("G4", "8n");
};

export const errorBeep = async () => {
  if (typeof window === "undefined") return;
  const synth = new Synth().toDestination();
  try {
    synth.triggerAttackRelease("B4", "8n");
    await sleep(100);
    synth.triggerAttackRelease("B4", "8n");
    await sleep(100);
    synth.triggerAttackRelease("B4", "8n");
  } catch (e) {
    console.log(e);
  }
};
