/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EPIC_NFTS_SMART_CONTRACT_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
