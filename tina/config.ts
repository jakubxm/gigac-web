import { defineConfig } from "tinacms";

// Vetva, ktorú TinaCMS upravuje (na GitHube). Pri deployi sa doplní automaticky.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Client ID nie je tajný (je verejný v admin appke). Token ide cez GitHub Secrets.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "9ffb0e74-fe05-4eb6-ae93-a82ff25f5ad7",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "src",
    },
  },

  schema: {
    collections: [
      {
        name: "site",
        label: "Obsah webu",
        path: "src/_data",
        format: "json",
        match: { include: "site" },
        ui: {
          // jeden súbor, klient ho nemaže ani nevytvára nový
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "meta",
            label: "Základné údaje (SEO)",
            fields: [
              { type: "string", name: "title", label: "Titulok stránky" },
              { type: "string", name: "description", label: "Popis pre Google", ui: { component: "textarea" } },
              { type: "string", name: "lang", label: "Jazyk (kód)" },
            ],
          },
          {
            type: "object",
            name: "nav",
            label: "Navigácia (horné menu)",
            fields: [
              {
                type: "object",
                name: "links",
                label: "Odkazy v menu",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Text" },
                  { type: "string", name: "href", label: "Cieľ (napr. #plan)" },
                ],
              },
              { type: "string", name: "ctaLabel", label: "Tlačidlo vpravo — text" },
              { type: "string", name: "ctaHref", label: "Tlačidlo vpravo — cieľ" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hlavička (hero)",
            fields: [
              { type: "string", name: "tag", label: "Štítok nad nadpisom" },
              { type: "string", name: "titleLine1", label: "Nadpis — 1. riadok" },
              { type: "string", name: "titleLine2Prefix", label: "Nadpis — 2. riadok (pred zvýraznením)" },
              { type: "string", name: "titleHighlight", label: "Nadpis — zvýraznené slovo (červené)" },
              { type: "string", name: "claim", label: "Podnadpis / claim" },
              { type: "string", name: "btnPrimaryLabel", label: "Tlačidlo 1 — text" },
              { type: "string", name: "btnPrimaryHref", label: "Tlačidlo 1 — cieľ" },
              { type: "string", name: "btnSecondaryLabel", label: "Tlačidlo 2 — text" },
              { type: "string", name: "btnSecondaryHref", label: "Tlačidlo 2 — cieľ" },
              { type: "image", name: "poster", label: "Náhradný obrázok videa" },
              { type: "image", name: "video", label: "Hero video (mp4)" },
            ],
          },
          {
            type: "object",
            name: "intro",
            label: "Úvod",
            fields: [
              { type: "string", name: "lead", label: "Výrazný úvodný odsek", ui: { component: "textarea" } },
              { type: "string", name: "paragraphs", label: "Odseky", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Čísla / štatistiky",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.value }) },
            fields: [
              { type: "string", name: "value", label: "Číslo" },
              { type: "string", name: "label", label: "Popis", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "Príbeh",
            fields: [
              { type: "string", name: "kicker", label: "Nadnadpis" },
              { type: "string", name: "title", label: "Nadpis" },
              { type: "image", name: "photo", label: "Fotka" },
              { type: "string", name: "photoAlt", label: "Popis fotky (alt)" },
              { type: "string", name: "chip", label: "Menovka na fotke" },
              { type: "string", name: "paragraphs", label: "Odseky", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "plan",
            label: "Plán",
            fields: [
              { type: "string", name: "kicker", label: "Nadnadpis" },
              { type: "string", name: "title", label: "Nadpis" },
              { type: "string", name: "intro", label: "Úvodné odseky", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "cards",
                label: "Body plánu",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.title }) },
                fields: [
                  { type: "string", name: "n", label: "Číslo (napr. 01)" },
                  { type: "string", name: "title", label: "Nadpis bodu" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBar",
            label: "Výzva (žltý pruh)",
            fields: [
              { type: "string", name: "eyebrow", label: "Nadnadpis" },
              { type: "string", name: "titleHtml", label: "Nadpis (zvýraznenie cez <em>…</em>)", ui: { component: "textarea" } },
              { type: "string", name: "btnLabel", label: "Tlačidlo — text" },
              { type: "string", name: "btnHref", label: "Tlačidlo — cieľ" },
              { type: "string", name: "linkLabel", label: "Odkaz pod tlačidlom — text" },
              { type: "string", name: "linkHref", label: "Odkaz pod tlačidlom — cieľ" },
            ],
          },
          {
            type: "object",
            name: "team",
            label: "Tím a kandidáti",
            fields: [
              { type: "string", name: "kicker", label: "Nadnadpis" },
              { type: "string", name: "title", label: "Nadpis" },
              { type: "string", name: "lead", label: "Úvodný odsek", ui: { component: "textarea" } },
              { type: "string", name: "paragraphs", label: "Odseky", list: true, ui: { component: "textarea" } },
              { type: "string", name: "quote", label: "Citát", ui: { component: "textarea" } },
              { type: "string", name: "quoteSource", label: "Autor citátu" },
              { type: "string", name: "districtsTitle", label: "Mestskí kandidáti — nadpis" },
              { type: "string", name: "districtsCount", label: "Mestskí kandidáti — počet" },
              {
                type: "object",
                name: "districts",
                label: "Volebné obvody",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "num", label: "Číslo (I.–V.)" },
                  { type: "string", name: "label", label: "Názov obvodu" },
                  { type: "string", name: "text", label: "Mestské časti", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "krajTitle", label: "Krajskí kandidáti — nadpis" },
              { type: "string", name: "krajCount", label: "Krajskí kandidáti — počet" },
              { type: "string", name: "krajText", label: "Krajskí kandidáti — text", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "support",
            label: "Podpora / financovanie",
            fields: [
              { type: "string", name: "kicker", label: "Nadnadpis" },
              { type: "string", name: "title", label: "Nadpis" },
              { type: "string", name: "body", label: "Hlavný text", ui: { component: "textarea" } },
              {
                type: "object",
                name: "options",
                label: "Možnosti daru",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Nadpis" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "closing", label: "Záverečná veta" },
              { type: "string", name: "cardTitle", label: "Platobná karta — nadpis" },
              {
                type: "object",
                name: "pay",
                label: "Údaje pre platbu",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Názov údaja" },
                  { type: "string", name: "value", label: "Hodnota" },
                ],
              },
              { type: "string", name: "cardBtnLabel", label: "Tlačidlo na karte — text" },
              { type: "string", name: "cardBtnHref", label: "Tlačidlo na karte — cieľ" },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Kontakt",
            fields: [
              { type: "string", name: "kicker", label: "Nadnadpis" },
              { type: "string", name: "title", label: "Nadpis" },
              { type: "string", name: "body", label: "Text", ui: { component: "textarea" } },
              {
                type: "object",
                name: "socials",
                label: "Sociálne siete a kontakt",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Text" },
                  { type: "string", name: "href", label: "Odkaz (URL)" },
                ],
              },
              { type: "string", name: "formNamePlaceholder", label: "Formulár — placeholder mena" },
              { type: "string", name: "formEmailPlaceholder", label: "Formulár — placeholder e-mailu" },
              { type: "string", name: "formMsgPlaceholder", label: "Formulár — placeholder správy" },
              { type: "string", name: "formSubmitLabel", label: "Formulár — text tlačidla" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Pätička",
            fields: [
              { type: "string", name: "bigHtml", label: "Veľký slogan (zvýraznenie cez <span>…</span>)", ui: { component: "textarea" } },
              { type: "string", name: "logoAlt", label: "Popis loga (alt)" },
              { type: "string", name: "copyright", label: "Copyright riadok" },
              { type: "string", name: "note", label: "Poznámka vpravo" },
            ],
          },
        ],
      },
    ],
  },
});
