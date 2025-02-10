import { builtinModules } from "node:module"

import { combine, ignores } from "@aolyang/eslint-config"
import importExport         from "@aolyang/eslint-config/import-export"
import stylistic            from "@aolyang/eslint-config/stylistic"
import typescript           from "@aolyang/eslint-config/typescript"

export default combine(
    stylistic(),
    typescript(),
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
