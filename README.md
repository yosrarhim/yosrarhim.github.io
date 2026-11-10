# yosrarhim.github.io

Portfolio de Yosra Rhim, ingénieure systèmes embarqués et IA. React 19, Vite et TypeScript strict, publié sur GitHub Pages.

## Développement

```bash
npm install
npm run dev        # serveur local
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + build + pré-rendu HTML dans dist/
npm run preview    # sert dist/ en local
```

## Modifier le contenu

Tout le texte du site se trouve dans `src/data/`, fichiers TypeScript typés :

| Fichier | Contenu |
| --- | --- |
| `profile.ts` | identité, liens, navigation, hero, profil, trajectoire, contact |
| `edgeSense.ts` | étude de cas Edge Sense AI (diagramme, round fédéré, résultats) |
| `projects.ts` | projets (§03) |
| `experience.ts` | expériences (§04) |
| `expertise.ts` | compétences (§05) |
| `research.ts` | intérêts de recherche (§06) |
| `education.ts` | diplômes, certificats, langues (§07) |

Mise en forme dans les textes : `**gras**`, `*italique*`, `_{indice}`, `` `code` ``, et `\n` pour un retour à la ligne.

Les fichiers statiques (polices, images, CV, certificats) se trouvent dans `public/`.

## Déploiement

Un push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit `dist/` et le publie sur GitHub Pages. Il faut d'abord régler une fois **Settings → Pages → Source : GitHub Actions**.
