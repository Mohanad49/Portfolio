interface InspectionState { scroll: number; spread: number; invalidate: (() => void) | null; }
export const inspectionState: InspectionState = {
  scroll: 0,
  spread: 0.22,
  invalidate: null,
};

export function setInspectionProgress(progress: number) {
  inspectionState.scroll = progress;
  inspectionState.invalidate?.();
}
