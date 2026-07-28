const TAG_STYLES = {
  keynote: {
    badge: 'bg-yellow-500',
    pill: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  },
  plenary: {
    badge: 'bg-amber-500',
    pill: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  },
  logistics: {
    badge: 'bg-violet-600',
    pill: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
  },
  break: {
    badge: 'bg-slate-400',
    pill: 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300',
  },
  fun: {
    badge: 'bg-orange-500',
    pill: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
  },
  workshop: {
    badge: 'bg-teal-500',
    pill: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300',
  },
  talk: {
    badge: 'bg-blue-500',
    pill: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  },
}

const DEFAULT_STYLE = {
  badge: 'bg-gray-500',
  pill: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300',
}

export function getTagStyle(tag) {
  if (!tag) return DEFAULT_STYLE
  return TAG_STYLES[tag.toLowerCase()] || DEFAULT_STYLE
}
