import { defineConfig } from "@pandacss/dev";
import { minshumiTheme } from "./src/style/theme";

const mColors = minshumiTheme.colors
const mColorToPandaColor = (color: readonly string[]) => ({
  0: { value: color[0] },
  1: { value: color[1] },
  2: { value: color[2] },
}) as const

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: mColorToPandaColor(mColors.primary),
          primaryText: mColorToPandaColor(mColors.primaryText),
          error: mColorToPandaColor(mColors.error),
          errorText: mColorToPandaColor(mColors.errorText),
          warn: mColorToPandaColor(mColors.warn),
          warnText: mColorToPandaColor(mColors.warnText),
          success: mColorToPandaColor(mColors.success),
          successText: mColorToPandaColor(mColors.successText),
          info: mColorToPandaColor(mColors.info),
          infoText: mColorToPandaColor(mColors.infoText),
          background: mColorToPandaColor(mColors.background),
          backgroundText: mColorToPandaColor(mColors.backgroundText),
        },
        spacing: {
          xs: { value: "0.625rem" },
          sm: { value: "0.75rem" },
          md: { value: "1.00rem" },
          lg: { value: "1.25rem" },
          xl: { value: "2.00rem" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

});
