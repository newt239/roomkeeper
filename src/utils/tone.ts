import { Synth } from "tone";

export const successBeep = () => {
  if (typeof window === "undefined") return;
  const synth = new Synth().toDestination();
  synth.triggerAttackRelease("C4", "8n");
  setTimeout(() => {
    synth.triggerAttackRelease("G4", "8n");
  }, 100);
};

export const errorBeep = () => {
  if (typeof window === "undefined") return;
  const synth = new Synth().toDestination();
  synth.triggerAttackRelease("E4", "8n");
  setTimeout(() => {
    synth.triggerAttackRelease("E4", "8n");
  }, 100);
};
