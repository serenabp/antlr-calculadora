grammar Calculator;

// Reglas del Analizador Sintáctico (Parser)

prog
    : stat+
    ;

stat
    : decl
    | assign
    | expr ';'
    ;

decl
    : ('let' | 'var') ID ('=' expr)? ';'
    ;

assign
    : ID '=' expr ';'
    ;


expr
    : expr ('*' | '/') expr
    | expr ('+' | '-') expr
    | '(' expr ')'
    | ID
    | NUMBER
    ;

// Lexer

ID
    : [a-zA-Z_] [a-zA-Z]*
    ;

NUMBER
    : [0-9]+
    ;

// Ignorar espacios en blanco
WS
    : [ \t\r\n]+ -> skip
    ;