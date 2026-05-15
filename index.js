import CalculatorLexer from "./generated/CalculatorLexer.js";
import CalculatorParser from "./generated/CalculatorParser.js";
import {CustomCalculatorVisitor} from "./CustomCalculatorVisitor.js";
import { CharStreams, CommonTokenStream } from "antlr4";
import fs from 'fs';

async function main() {
    const fileName = 'input.txt';
    let input;

    try {
        input = fs.readFileSync(fileName, 'utf8');
        console.log(`--- CÓDIGO FUENTE (${fileName}) ---\n${input}\n`);
    } catch (err) {
        console.error("Error: No se encontró input.txt");
        return;
    }

    const inputStream = CharStreams.fromString(input);
    const lexer = new CalculatorLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);

    // REQUERIMIENTO: TABLA DE LEXEMAS-TOKENS
    console.log("TABLA DE LEXEMAS-TOKENS");
    console.log("-------------------------------------------");
    tokenStream.fill();
    tokenStream.tokens.forEach(t => {
        const symName = CalculatorLexer.symbolicNames[t.type] || "EOF";
        if (symName !== 'WS' && t.type !== -1) {
            console.log(`${t.text.padEnd(15)} | ${symName}`);
        }
    });
    console.log("-------------------------------------------\n");

    const parser = new CalculatorParser(tokenStream);
    const tree = parser.prog(); // Cambio de programa() a prog() según tu .g4

    // REQUERIMIENTO: INFORMAR ERRORES (Línea y Causa)
    if (parser.syntaxErrorsCount > 0) {
        console.error("\nERROR: La entrada contiene errores sintácticos.");
    } else {
        console.log("Sintaxis válida.");
        // REQUERIMIENTO: ÁRBOL SINTÁCTICO (Formato texto)
        console.log("\nÁRBOL DE ANÁLISIS SINTÁCTICO:");
        console.log(tree.toStringTree(parser.ruleNames));

        // REQUERIMIENTO: INTERPRETACIÓN
        console.log("\n--- EJECUCIÓN DEL INTÉRPRETE ---");
        const visitor = new CustomCalculatorVisitor();
        visitor.visit(tree);
    }
}

main();