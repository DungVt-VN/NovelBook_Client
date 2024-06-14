import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
import postcssPresetEnv from 'postcss-preset-env';
import stylelint from 'stylelint';
import postcssReporter from 'postcss-reporter';
import cssnano from 'cssnano';

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    postcssNested,
    postcssMixins,
    postcssPresetEnv,
    stylelint,
    postcssReporter({ clearReportedMessages: true }),
    cssnano,
  ],
};
