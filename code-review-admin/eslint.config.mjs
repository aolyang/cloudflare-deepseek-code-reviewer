import { builtinModules } from "node:module"
import { dirname }        from "node:path"
import { fileURLToPath }  from "node:url"

import { FlatCompat }       from "@eslint/eslintrc"
import { combine, ignores } from "@aolyang/eslint-config"
import importExport         from "@aolyang/eslint-config/import-export"
import stylistic            from "@aolyang/eslint-config/stylistic"
import { typescriptRules }  from "@aolyang/eslint-config/typescript"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

export default combine(
    compat.extends("next/core-web-vitals", "next/typescript"),
    stylistic(),
    typescriptRules(),
    importExport(),
    importExport({
        files: ["eslint.config.mjs"],
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["globals", "module", "node:", `^(${builtinModules.join("|")})(/|$)`],
                        ["^@eslint", "^eslint-*", "^@?\\w"],
                        ["^"]
                    ]
                }
            ]
        }
    }),
    {
        ignores: ignores.concat([
            ".next"
        ])
    }
)
