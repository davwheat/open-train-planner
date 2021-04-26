export interface INRCCMessage {
  /**
   * HTML message string.
   *
   * - `<p>` used to force a new line
   * - `<a>` should be stripped and replaced with text inside on platforms without link support.
   */
  value: string
}
