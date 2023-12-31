import {q} from 'groqd';

import {FOOTERS_FRAGMENT} from './footers';
import {
  COLOR_SCHEME_FRAGMENT,
  FONT_FRAGMENT,
  MENU_FRAGMENT,
  SETTINGS_FRAGMENT,
} from './fragments';
import {PRODUCT_SECTIONS_FRAGMENT, SECTIONS_FRAGMENT} from './sections';
import {getIntValue} from './utils';

/*
|--------------------------------------------------------------------------
| Page Query
|--------------------------------------------------------------------------
*/
export const PAGE_QUERY = q('*')
  .filter(
    `(
      _type == "page" &&
        ($handle != "home" && slug.current == $handle)
      ) || (
        _type == "home" &&
        $handle == "home"
      )
    `,
  )
  .grab({
    _type: q.literal('page'),
    sections: SECTIONS_FRAGMENT,
  })
  .slice(0)
  .nullable();

/*
|--------------------------------------------------------------------------
| Product Query
|--------------------------------------------------------------------------
*/
export const PRODUCT_QUERY = q('*')
  .filter(`_type == "product" && store.slug.current == $productHandle`)
  .grab({
    _type: q.literal('product'),
    sections: PRODUCT_SECTIONS_FRAGMENT,
    store: q('store').grab({
      gid: q.string(),
    }),
  })
  .slice(0)
  .nullable();

/*
|--------------------------------------------------------------------------
| CMS Settings Queries
|--------------------------------------------------------------------------
*/
export const FONTS_QUERY = q('*')
  .filter("_type == 'typography'")
  .grab({
    body: q('body').grab(FONT_FRAGMENT),
    extra: q('extra').grab(FONT_FRAGMENT),
    heading: q('heading').grab(FONT_FRAGMENT),
  })
  .order('_createdAt asc')
  .slice(0)
  .nullable();

export const DEFAULT_COLOR_SCHEME_QUERY = q('*')
  .filter("_type == 'colorScheme'")
  .grab(COLOR_SCHEME_FRAGMENT)
  .order('_createdAt asc')
  .slice(0);

export const SETTINGS_QUERY = q('*')
  .filter("_type == 'settings'")
  .grab(SETTINGS_FRAGMENT)
  .slice(0)
  .nullable();

export const HEADER_QUERY = q('*')
  .filter("_type == 'header'")
  .grab({
    colorScheme: q('colorScheme').deref().grab(COLOR_SCHEME_FRAGMENT),
    desktopLogoWidth: q.number().nullable(),
    menu: MENU_FRAGMENT,
    padding: q
      .object({
        bottom: q.number().nullable(),
        top: q.number().nullable(),
      })
      .nullable(),
    showSeparatorLine: q.boolean().nullable(),
  })
  .slice(0)
  .nullable();

export const FOOTER_QUERY = q('*')
  .filter("_type == 'footer'")
  .grab({
    footer: FOOTERS_FRAGMENT,
    sections: SECTIONS_FRAGMENT,
  })
  .slice(0)
  .nullable();

export const THEME_CONTENT_QUERY = q('*')
  .filter("_type == 'themeContent'")
  .grab({
    product: q('product')
      .grab({
        addToCart: [getIntValue('addToCart'), q.string().nullable()],
        quantitySelector: [
          getIntValue('quantitySelector'),
          q.boolean().nullable(),
        ],
        soldOut: [getIntValue('soldOut'), q.string().nullable()],
      })
      .nullable(),
  })
  .slice(0)
  .nullable();

export const ROOT_QUERY = q('')
  .grab({
    defaultColorScheme: DEFAULT_COLOR_SCHEME_QUERY,
    fonts: FONTS_QUERY,
    footer: FOOTER_QUERY,
    header: HEADER_QUERY,
    settings: SETTINGS_QUERY,
    themeContent: THEME_CONTENT_QUERY,
  })
  .nullable();
