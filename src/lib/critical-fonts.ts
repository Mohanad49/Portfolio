let preparation: Promise<FontFace[][]> | undefined;

export function prepareTypography() {
  preparation ??= Promise.all([
    document.fonts.load('700 1em "Alexandria Variable"'),
    document.fonts.load('400 1em "Manrope Variable"'),
    // The serif voice in headings. Pages that do not declare it resolve at once.
    document.fonts.load('italic 500 1em "Bodoni Moda Variable"'),
  ]);
  return preparation;
}
