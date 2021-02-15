type PaletteItem = {
  main: string,
};

type CommonPalette = {
  primary: PaletteItem,
  secondary: PaletteItem,
};

type ColorPalette = {
  paper: PaletteItem,
  text: {
    primary: string,
  }
};

type Palette = CommonPalette & ColorPalette;

type Schema = { palette: Palette };

const common: CommonPalette = {
  primary: {
    main: '#4C92FF',
  },
  secondary: {
    main: '#F57C00',
  },
};


const darkPalette: ColorPalette = {
  paper: {
    main: '#282a36',
  },
  text: {
    primary: '#fff',
  },
};

const lightPalette: ColorPalette = {
  paper: {
    main: '#fff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
  },
};

export const dark: Schema = {
  palette: {
    ...common,
    ...darkPalette,
  },
};

export const light: Schema = {
  palette: {
    ...common,
    ...lightPalette,
  },
};
