let preparation: Promise<FontFace[][]> | undefined;

export function prepareTypography() {
  preparation ??= Promise.all([
    document.fonts.load('700 1em "Alexandria Variable"'),
    document.fonts.load('400 1em "Manrope Variable"'),
  ]);
  return preparation;
}
