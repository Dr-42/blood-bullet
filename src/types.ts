export class Palette {
  name: string
  accent: string
  accentHover: string
  accent2: string
  bg: string
  bgDark: string
  disabledColor: string

  constructor(
    name: string,
    accent: string,
    accentHover: string,
    accent2: string,
    bg: string,
    bgDark: string,
    disabledColor: string,
  ) {
    this.name = name
    this.accent = accent
    this.accentHover = accentHover
    this.accent2 = accent2
    this.bg = bg
    this.bgDark = bgDark
    this.disabledColor = disabledColor
  }

  static fromObject(obj: any): Palette {
    return new Palette(
      obj.name,
      obj.accent,
      obj.accentHover,
      obj.accent2,
      obj.bg,
      obj.bgDark,
      obj.disabledColor,
    )
  }

  static fromJson(json: any): Palette {
    return new Palette(
      json.name,
      json.accent,
      json.accent_hover,
      json.accent2,
      json.bg,
      json.bg_dark,
      json.disabled_color,
    )
  }

  public toJson(): any {
    return {
      name: this.name,
      accent: this.accent,
      accent_hover: this.accentHover,
      accent2: this.accent2,
      bg: this.bg,
      bg_dark: this.bgDark,
      disabled_color: this.disabledColor,
    }
  }
}

export class PaletteData {
  idx: number
  palette: Palette

  constructor(idx: number, palette: Palette) {
    this.idx = idx
    this.palette = palette
  }

  static fromJson(json: any): PaletteData {
    return new PaletteData(json.idx, Palette.fromJson(json.palette))
  }

  public toJson(): any {
    return {
      idx: this.idx,
      palette: this.palette.toJson(),
    }
  }
}

export interface CellType {
  name: string
  atlas_key: string
  granulocyte: boolean
  vibrate_pattern: Array<number>
}

export interface PatientDetails {
  name: string
  age: number | null
  gender: 'male' | 'female'
  crNo: string
  contactNo: string
  testsRequested: string[]
}

export interface PreviousInvestigation {
  date: string
  hb: string
  tlc: string
  plt: string
  rbc: string
  mcv: string
  mch: string
  mchc: string
  urea: string
  creat: string
  na: string
  k: string
  sgot: string
  sgpt: string
  alp: string
  dBil: string
  tBil: string
}
