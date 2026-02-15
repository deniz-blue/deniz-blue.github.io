import React, { memo } from 'react'
import twemoji from 'twemoji'

export const Twemoji = memo(({ emoji }: { emoji: string }) => (
  <span
    // style={{ height: "1rem", width: "auto" }}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
      })
    }}
  />
))

