import { combine, combineGlobals,ignores } from "@aolyang/eslint-config"
import importExport from "@aolyang/eslint-config/import-export"
import react        from "@aolyang/eslint-config/react"
import stylistic    from "@aolyang/eslint-config/stylistic"
import typescript   from "@aolyang/eslint-config/typescript"
import globals from "globals"

export default combine(
    combineGlobals(globals.node),
    react(),
    stylistic(),
    typescript(),
    importExport(),
    { ignores }
)

