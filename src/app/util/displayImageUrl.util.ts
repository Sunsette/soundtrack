export function displayImageUrl(
  display:
    | { image?: { placeholder?: string | null } | null }
    | null
    | undefined,
  width: number,
  height = width
) {
  return display?.image?.placeholder
    ?.replace("%w", width.toString())
    .replace("%h", height.toString());
}
