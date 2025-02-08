import { combine, ignores } from "@aolyang/eslint-config"
import importExport from "@aolyang/eslint-config/import-export"
import stylistic    from "@aolyang/eslint-config/stylistic"
import typescript   from "@aolyang/eslint-config/typescript"
import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

export default combine(
    compat.extends("next/core-web-vitals", "next/typescript"),
    stylistic(),
    typescript(),
    importExport(),
    {
        ignores: ignores.concat([
            ".next",
            ".open-next",
            ".wrangler"
        ])
    }
)
