import NextI18Next from 'next-i18next'

const I18NService = new NextI18Next({
  defaultLanguage: 'ko',
  otherLanguages: ['en']
})

export default I18NService