import { merge } from 'lodash'
import { Apply } from '../../../cast'

interface PageBlockStyleVariants {
  [_: string]: string;
}

interface PageBlockStyleWrap {
  kind: string;
}

interface PageBlockStyle {
  variants: PageBlockStyleVariants;
  wrap?: PageBlockStyleWrap;
}

export type PageBlockInput = PageBlock | Partial<PageBlock>

const defaultXYWH = [0, 0, 3, 3]

export class PageBlock {
  public title = '';
  public description = '';

  xywh: number[] = defaultXYWH
  kind = ''

  public options = {}
  public style: PageBlockStyle = {
    variants: {
      headerText: 'primary',
    },
    wrap: {
      kind: 'card',
    },
  }

  constructor (i?: PageBlockInput) {
    this.apply(i)
  }

  apply (i?: PageBlockInput): void {
    if (!i) return

    Apply(this, i, String, 'title', 'description')

    if (i.xywh) {
      if (!Array.isArray(i.xywh)) {
        throw new Error('xywh must be an array')
      }

      if (i.xywh.length !== 4) {
        throw new Error('xywh must have 4 elements')
      }

      // by default, park 3x3 block in upper left corner
      this.xywh = i.xywh || defaultXYWH
    }

    if (i.options) {
      this.options = merge({}, this.options, i.options)
    }

    if (i.style) {
      this.style = merge({}, this.style, i.style)
    }
  }

  // Returns Page Block configuration errors
  validate (): Array<string> {
    return []
  }
}

export const Registry = new Map<string, typeof PageBlock>()
