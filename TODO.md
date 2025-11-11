# TODO: Make Starting Page Multilingual

## Tasks
- [x] Update `src/components/Hero.tsx` to use translations from LanguageContext
  - Import `useLanguage` hook
  - Replace hardcoded strings with `t(key)` calls for:
    - Main headline (combine heroTitle, heroTitleHighlight, heroTitleEnd)
    - Description (heroDescription)
    - CTA buttons (findLegalHelp, browseLawyers)
    - Trust indicators (lawyersCount, verifiedProfessionals, legalAreas, expertCoverage, successRate, clientSatisfaction)
- [x] Test the multilingual functionality by running the app and switching languages
- [x] Verify translations display correctly in Hero section

## Completed
- [x] Analyze existing LanguageContext and Hero component
- [x] Create plan for multilingual starting page
